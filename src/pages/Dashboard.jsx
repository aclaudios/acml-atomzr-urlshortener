import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Link, Copy, Trash2, QrCode, ExternalLink, Search, Calendar, Package, FileText } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BulkShortener from '@/components/BulkShortener';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    avgClicksPerUrl: 0
  });
  
  const loadUrls = useCallback(async () => {
    if (!user) {
      setUrls([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('urls')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: "Could not load links.", variant: "destructive" });
      setUrls([]);
    } else {
      setUrls(data);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  useEffect(() => {
    const filterUrls = () => {
      if (!searchTerm) {
        setFilteredUrls(urls);
        return;
      }
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = urls.filter(url =>
        (url.original_url && url.original_url.toLowerCase().includes(lowercasedTerm)) ||
        (url.short_code && url.short_code.toLowerCase().includes(lowercasedTerm)) ||
        (url.metadata?.caption && url.metadata.caption.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredUrls(filtered);
    };
    filterUrls();
  }, [urls, searchTerm]);

  useEffect(() => {
    if (urls.length > 0) {
      const totalClicks = urls.reduce((sum, url) => sum + (url.click_count || 0), 0);
      setStats({
        totalUrls: urls.length,
        totalClicks,
        avgClicksPerUrl: urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : 0
      });
    } else {
      setStats({ totalUrls: 0, totalClicks: 0, avgClicksPerUrl: 0 });
    }
  }, [urls]);

  const getFullShortUrl = (shortCode) => `${window.location.protocol}//${window.location.host}/${shortCode}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy URL to clipboard.",
        variant: "destructive",
      });
    }
  };

  const deleteUrl = async (urlId) => {
    const { error } = await supabase.from('urls').delete().eq('id', urlId);
    if(error){
      toast({ title: "Error", description: `Failed to delete URL: ${error.message}`, variant: "destructive" });
    } else {
      toast({
        title: "URL deleted",
        description: "The shortened URL has been deleted.",
      });
      loadUrls();
    }
  };

  const downloadQR = (qrCode, shortCode) => {
    if (!qrCode) {
      toast({ title: "QR Code not available", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    link.download = `qr-${shortCode}.png`;
    link.href = qrCode;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Atomzr</title>
        <meta name="description" content="Manage your shortened URLs and view analytics in your Atomzr dashboard." />
      </Helmet>
      
      <div className="min-h-screen gradient-bg">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's your link analytics and tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-effect">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
                  <Link className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUrls}</div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClicks}</div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Clicks/URL</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgClicksPerUrl}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="links" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="links">
                  <FileText className="w-4 h-4 mr-2" />
                  Your Links
                </TabsTrigger>
                <TabsTrigger value="bulk">
                  <Package className="w-4 h-4 mr-2" />
                  Bulk Caption Shortener
                </TabsTrigger>
              </TabsList>
              <TabsContent value="links">
                <Card className="glass-effect mt-4">
                  <CardHeader>
                    <CardTitle>Your URLs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by URL, alias, or caption..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                    </div>

                    {loading ? (
                      <div className="text-center py-8 text-muted-foreground">Loading your links...</div>
                    ) : !user ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Please sign in to manage your links.</p>
                      </div>
                    ) : filteredUrls.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {urls.length === 0 ? (
                          <div className="space-y-2">
                            <p>No URLs created yet.</p>
                            <Button onClick={() => navigate('/app')}>Create Your First URL</Button>
                          </div>
                        ) : (
                          <p>No URLs match your search.</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredUrls.map((url) => (
                          <motion.div
                            key={url.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border rounded-lg space-y-3"
                          >
                             <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-1 overflow-hidden">
                                {url.metadata?.caption && <p className="font-semibold text-sm">{url.metadata.caption}</p>}
                                <div className="flex items-center space-x-2">
                                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                    {getFullShortUrl(url.short_code)}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(getFullShortUrl(url.short_code))}
                                  >
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground break-all truncate">
                                  {url.original_url}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span className="flex items-center space-x-1">
                                    <BarChart3 className="w-3 h-3" />
                                    <span>{url.click_count || 0} clicks</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(url.created_at).toLocaleDateString()}</span>
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => downloadQR(url.metadata?.qrCode, url.short_code)}
                                  title="Download QR Code"
                                >
                                  <QrCode className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => window.open(getFullShortUrl(url.short_code), '_blank')}
                                  title="Open Link"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteUrl(url.id)}
                                  title="Delete URL"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="bulk">
                <BulkShortener />
              </TabsContent>
            </Tabs>
            
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;