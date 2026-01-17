import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useUrlManager } from '@/hooks/useUrlManager';
import URLResult from '@/components/URLResult';

const URLShortener = ({ onNewUrl }) => {
  const { 
    createShortUrl, 
    expandShortUrl, 
    loading, 
    dailyCount, 
    DAILY_LIMIT 
  } = useUrlManager();
  
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [result, setResult] = useState(null);
  const [actionMode, setActionMode] = useState('shorten');

  useEffect(() => {
    const usageData = JSON.parse(localStorage.getItem('atomzr-usage') || '{}');
    const today = new Date().toISOString().split('T')[0];
    if (usageData.date !== today) {
        localStorage.setItem('atomzr-usage', JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    const currentHost = window.location.host;
    const atomzrUrlPattern = new RegExp(`^(https?://)?(${currentHost}|uatomzr\\.com)/[a-zA-Z0-9-]{2,50}$`);

    if (atomzrUrlPattern.test(newUrl)) {
      setActionMode('expand');
    } else {
      setActionMode('shorten');
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (dailyCount >= DAILY_LIMIT) {
      toast({ title: "Daily limit reached", description: `You can create up to ${DAILY_LIMIT} links per day.`, variant: "destructive" });
      return;
    }
    if (!url || !validateUrl(url)) {
      toast({ title: "Invalid URL", description: "Please enter a valid URL.", variant: "destructive" });
      return;
    }

    const data = await createShortUrl(url, customAlias);
    if (data) {
      onNewUrl(data);
      setResult(data);
      toast({ title: "URL shortened successfully!", description: "Your short URL is ready to use." });
    }
  };

  const handleExpand = async () => {
    const urlParts = url.split('/');
    const shortCode = urlParts[urlParts.length - 1];
    const data = await expandShortUrl(shortCode);
    if(data) {
      setResult(data);
      toast({ title: "Link expanded!", description: "Showing details for your Atomzr link." });
    }
  };

  const handleSubmit = () => {
    if (actionMode === 'expand') handleExpand();
    else handleShorten();
  };

  const handleReset = () => {
    setUrl('');
    setCustomAlias('');
    setResult(null);
    setActionMode('shorten');
  };

  const linksLeft = DAILY_LIMIT - dailyCount;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900">Atomzr: Free, Fast, Reliable Link Shortening</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform long URLs into powerful, trackable short links with custom aliases and QR codes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-effect atom-glow">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Link className="w-5 h-5" />
                <span>URL Shortener & Expander</span>
              </CardTitle>
              <div className="text-sm font-medium text-muted-foreground">
                {linksLeft} links left today
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Enter a long URL to shorten or an Atomzr link to expand</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/very-long-url or https://uatomzr.com/xxxxx"
                  value={url}
                  onChange={handleUrlChange}
                  className="text-lg"
                />
              </div>

              {actionMode === 'shorten' && (
                <div className="space-y-2">
                  <Label htmlFor="alias">Custom Alias (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{window.location.host}/</span>
                    <Input
                      id="alias"
                      placeholder="my-link"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading || (actionMode === 'shorten' && linksLeft <= 0)}
                className="w-full text-lg py-6 bg-slate-900 text-white hover:bg-slate-800"
              >
                {loading ? 'Processing...' : actionMode === 'expand' ? (<><Search className="mr-2 h-5 w-5" /> Expand Atomzr Link</>) : 'Shorten URL'}
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-xs text-muted-foreground bg-yellow-50 border border-yellow-200 text-yellow-800 p-2 rounded-md">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span>This is an experimental project. Shortened links may expire after one year.</span>
            </div>

            {result && <URLResult result={result} onReset={handleReset} />}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default URLShortener;