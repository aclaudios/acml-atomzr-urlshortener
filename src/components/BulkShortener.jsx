import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Download, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';


const DAILY_LIMIT = 50; 

const BulkShortener = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const { user } = useAuth();


  React.useEffect(() => {
    const usageData = JSON.parse(localStorage.getItem('atomzr-bulk-usage') || '{}');
    const today = new Date().toISOString().split('T')[0];
    if (usageData.date === today) {
      setDailyCount(usageData.count);
    } else {
      localStorage.setItem('atomzr-bulk-usage', JSON.stringify({ date: today, count: 0 }));
      setDailyCount(0);
    }
  }, []);

  const generateAlias = (caption) => {
    return caption
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleGenerateLinks = async () => {
    setLoading(true);
    setResults([]);
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const newResults = [];
    let processedCount = 0;
    
    const usageData = JSON.parse(localStorage.getItem('atomzr-bulk-usage') || '{}');
    const today = new Date().toISOString().split('T')[0];
    let currentCount = usageData.date === today ? usageData.count : 0;
    
    const aliases = lines.map(line => {
        const parts = line.split(';');
        if (parts.length !== 2) return null;
        const [caption] = parts.map(p => p.trim());
        return generateAlias(caption);
    }).filter(alias => alias !== null);

    const { data: existingUrls, error: fetchError } = await supabase
        .from('urls')
        .select('short_code')
        .in('short_code', aliases);

    if (fetchError) {
        toast({ title: 'Error checking aliases', description: fetchError.message, variant: 'destructive' });
        setLoading(false);
        return;
    }

    const existingAliases = new Set(existingUrls.map(u => u.short_code));
    const urlsToInsert = [];

    for (const line of lines) {
      if (currentCount + processedCount >= DAILY_LIMIT) {
        toast({
          title: 'Daily limit reached',
          description: `You can process up to ${DAILY_LIMIT} links per day in bulk.`,
          variant: 'destructive',
        });
        break;
      }

      const parts = line.split(';');
      if (parts.length !== 2) {
        newResults.push({ status: 'error', reason: 'Invalid format', originalLine: line });
        continue;
      }
      
      const [caption, originalUrl] = parts.map(p => p.trim());
      
      if (!validateUrl(originalUrl)) {
        newResults.push({ status: 'error', reason: 'Invalid URL', originalLine: line });
        continue;
      }
      
      const alias = generateAlias(caption);
      
      if (existingAliases.has(alias)) {
        newResults.push({ status: 'error', reason: 'Alias already exists', originalLine: line });
        continue;
      }
      
      const domain = window.location.host;
      const shortUrl = `${window.location.protocol}//${domain}/${alias}`;
      
      try {
        const qrCode = await QRCode.toDataURL(shortUrl);
        urlsToInsert.push({
            original_url: originalUrl,
            short_code: alias,
            user_id: user?.id,
            metadata: { caption, qrCode }
        });

        newResults.push({ 
            status: 'pending', 
            shortUrl, 
            qrCode,
            caption,
            originalUrl
        });

        processedCount++;
      } catch (err) {
        newResults.push({ status: 'error', reason: 'QR generation failed', originalLine: line });
      }
    }

    if (urlsToInsert.length > 0) {
        const { data: insertedData, error: insertError } = await supabase.from('urls').insert(urlsToInsert).select();
        if(insertError) {
            toast({ title: 'Error saving links', description: insertError.message, variant: 'destructive'});
            setLoading(false);
            return;
        }

        const finalResults = newResults.map(res => {
            if (res.status === 'pending') {
                const inserted = insertedData.find(d => d.short_code === generateAlias(res.caption));
                return inserted ? { status: 'success', ...res } : { status: 'error', reason: 'Failed to save', originalLine: `${res.caption};${res.originalUrl}` };
            }
            return res;
        });

        setResults(finalResults);
        setDailyCount(currentCount + processedCount);
        localStorage.setItem('atomzr-bulk-usage', JSON.stringify({ date: today, count: currentCount + processedCount }));
        localStorage.setItem('atomzr-bulk-recent-job', JSON.stringify(finalResults));

        toast({
          title: 'Bulk processing complete!',
          description: `${insertedData.length} links created successfully.`,
        });

    } else {
        setResults(newResults);
    }
    setLoading(false);
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Short URL copied." });
  };
  
  const downloadCSV = () => {
    const successfulResults = results.filter(r => r.status === 'success');
    if (successfulResults.length === 0) {
      toast({ title: "No data to download", variant: "destructive" });
      return;
    }
    
    const headers = ["Caption", "Original URL", "Alias", "Shortened URL"];
    const csvContent = [
      headers.join(','),
      ...successfulResults.map(r => `"${r.caption}","${r.originalUrl}","${generateAlias(r.caption)}","${r.shortUrl}"`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'atomzr-bulk-links.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const linksLeft = DAILY_LIMIT - dailyCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="glass-effect">
        <CardHeader>
           <div className="flex justify-between items-center">
            <CardTitle>Bulk Caption Shortener</CardTitle>
            <div className="text-sm font-medium text-muted-foreground">
              {linksLeft} links left today
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter one entry per line in the format: <strong>Caption;URL</strong>
          </p>
          <Textarea
            placeholder="Minimalist Workout Plan;https://example.com/plan&#10;Compound Exercise Benefits;https://example.com/benefits"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
          <Button onClick={handleGenerateLinks} disabled={loading || linksLeft <= 0} className="w-full">
            {loading ? 'Generating...' : 'Generate Links'}
          </Button>
        </CardContent>
      </Card>
      
      {results.length > 0 && (
        <Card className="glass-effect">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Results</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowQr(!showQr)}>
                  <QrCode className="mr-2 h-4 w-4"/>
                  {showQr ? 'Hide' : 'Show'} QR
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCSV}>
                  <Download className="mr-2 h-4 w-4"/>
                  Download CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                  <TableRow>
                    <TableHead>Caption</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>Shortened URL</TableHead>
                    {showQr && <TableHead>QR Code</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index} className={result.status === 'error' ? 'bg-destructive/10' : ''}>
                      {result.status === 'success' ? (
                        <>
                          <TableCell className="font-medium">{result.caption}</TableCell>
                          <TableCell className="text-muted-foreground text-xs truncate max-w-xs">{result.originalUrl}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm">{result.shortUrl}</span>
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.shortUrl)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          {showQr && (
                            <TableCell>
                              <img src={result.qrCode} alt="QR Code" className="w-16 h-16"/>
                            </TableCell>
                          )}
                        </>
                      ) : (
                        <TableCell colSpan={showQr ? 4 : 3}>
                          <p className="text-destructive font-medium">Error: {result.reason}</p>
                          <p className="text-muted-foreground text-xs truncate">{result.originalLine}</p>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default BulkShortener;