import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import URLShortener from '@/components/URLShortener';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Copy, ExternalLink, QrCode, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const HomePage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error("Error fetching URLs:", error);
      toast({ title: "Error", description: "Could not load recent links.", variant: "destructive" });
    } else {
      setUrls(data);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  const handleNewUrl = (newUrl) => {
    setUrls(prevUrls => [newUrl, ...prevUrls]);
  };

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
    
    if(error) {
      toast({ title: "Error deleting URL", description: error.message, variant: "destructive" });
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
  
  const getFullShortUrl = (shortCode) => `${window.location.protocol}//${window.location.host}/${shortCode}`;

  return (
    <>
      <Helmet>
        <title>Atomzr: Free, Fast, Reliable Link Shortening</title>
        <meta name="description" content="Atomzr is a minimalist yet powerful URL shortener. Shorten, share, and track your links with ease." />
      </Helmet>
      
      <div className="min-h-screen gradient-bg">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <URLShortener onNewUrl={handleNewUrl} />
          
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Recent Links</h2>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading your links...</div>
            ) : !user ? (
              <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border">
                <p>Please sign in to see your links.</p>
              </div>
            ) : urls.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border">
                <p>You haven't created any links yet.</p>
                <p>Shorten a URL above to see it here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {urls.map((url) => (
                  <motion.div
                    key={url.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    className="p-4 border rounded-lg space-y-3 bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1 overflow-hidden">
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
                      
                      <div className="flex items-center space-x-1">
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
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default HomePage;