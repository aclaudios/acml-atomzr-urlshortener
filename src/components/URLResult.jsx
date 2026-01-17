import React from 'react';
import { motion } from 'framer-motion';
import { Copy, QrCode, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const URLResult = ({ result, onReset }) => {
  const getFullShortUrl = (shortCode) => `${window.location.protocol}//${window.location.host}/${shortCode}`;
  const fullShortUrl = getFullShortUrl(result.short_code);

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4 p-4 bg-muted/50 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Your shortened URL:</p>
          <p className="text-lg font-mono break-all">{fullShortUrl}</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => copyToClipboard(fullShortUrl)}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {result.metadata?.qrCode && (
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium">QR Code</p>
            <img src={result.metadata.qrCode} alt="QR Code" className="w-32 h-32 border rounded" />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium">URL Preview</p>
          <div className="p-3 border rounded space-y-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Safe URL</span>
            </div>
            <p className="text-sm">
              <span className="font-medium">Destination:</span> {result.original_url}
            </p>
            <p className="text-sm">
              <span className="font-medium">Clicks:</span> {result.click_count || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={onReset} className="flex-1">
          Create Another
        </Button>
        <Button variant="outline" onClick={() => window.open(fullShortUrl, '_blank')} className="flex items-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>Test Link</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default URLResult;