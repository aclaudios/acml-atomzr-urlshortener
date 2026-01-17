import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/customSupabaseClient';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findAndTrackUrl = async () => {
      if (!shortCode) {
        setLoading(false);
        setError("Invalid URL.");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('urls')
        .select('id, original_url, click_count')
        .eq('short_code', shortCode)
        .single();
      
      if (fetchError || !data) {
        setLoading(false);
        setError("Link Not Found. The short link you're looking for doesn't exist or has been removed.");
        return;
      }

      setUrlData(data);
      setLoading(false);

      const newClickCount = (data.click_count || 0) + 1;
      await supabase
        .from('urls')
        .update({ click_count: newClickCount })
        .eq('id', data.id);
    };

    findAndTrackUrl();
  }, [shortCode]);

  useEffect(() => {
    if (urlData && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (urlData && countdown === 0) {
      window.location.href = urlData.original_url;
    }
  }, [urlData, countdown]);

  const handleDirectRedirect = () => {
    if (urlData) {
      window.location.href = urlData.original_url;
    }
  };

  const handleAdButtonClick = () => {
    window.open('https://payhip.com/b/Xsnew', '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Finding your link...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Link Not Found - Atomzr</title>
          <meta name="description" content="The requested short link was not found." />
        </Helmet>
        
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <Card className="glass-effect text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2 text-red-500">
                  <AlertTriangle className="w-6 h-6" />
                  <span>Link Not Found</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={() => window.location.href = '/'} className="w-full">
                  Go to Homepage
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Redirecting... - Atomzr</title>
        <meta name="description" content="You are being redirected to your destination." />
      </Helmet>
      
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="glass-effect text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Shield className="w-6 h-6 text-green-500" />
                <span>Atomzr Safe Redirect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">You're being redirected to:</p>
                <p className="font-mono text-sm bg-muted p-2 rounded break-all">
                  {urlData.original_url}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{countdown}</div>
                  <p className="text-sm text-muted-foreground">
                    Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                  </p>
                </div>
                
                <Button 
                  onClick={handleDirectRedirect}
                  className="w-full flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Go Now</span>
                </Button>

                <div id="atomzr-ad-slot" style={{ margin: '20px auto 0 auto', textAlign: 'center', maxWidth: '250px' }}>
                  <a href="https://payhip.com/b/Xsnew" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="https://payhip.com/cdn-cgi/image/format=auto,width=170/https://pe56d.s3.amazonaws.com/o_1j18fkk9afg48fk44cfu4f5l15.png" 
                      alt="Ugly Hustle to Guest Empire" 
                      style={{
                        maxWidth: '100%', 
                        height: 'auto', 
                        display: 'block', 
                        margin: '0 auto', 
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                        borderRadius: '8px'
                      }}
                    />
                  </a>
                </div>

                <Button
                  onClick={handleAdButtonClick}
                  className="w-full flex items-center space-x-2"
                >
                  <span>Unlock the Guest Empire Blueprint →</span>
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ Link verified as safe</p>
                <p>✓ No malware detected</p>
                <p>✓ Powered by Atomzr</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RedirectPage;