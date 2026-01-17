import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';
import QRCode from 'qrcode';

export const DAILY_LIMIT = 10;

const generateShortCode = () => Math.random().toString(36).substring(2, 8);

export const useUrlManager = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    const usageData = JSON.parse(localStorage.getItem('atomzr-usage') || '{}');
    const today = new Date().toISOString().split('T')[0];
    if (usageData.date === today) {
      setDailyCount(usageData.count);
    } else {
      setDailyCount(0);
    }
  }, []);

  const getUniqueShortCode = async (alias = '') => {
    let shortCode = alias.trim().replace(/\s+/g, '-');
    if (shortCode) {
      const { data, error } = await supabase.from('urls').select('id').eq('short_code', shortCode).maybeSingle();
      if (error) {
        toast({ title: "Error checking alias", description: error.message, variant: "destructive" });
        return null;
      }
      if (data) {
        toast({ title: "Alias already exists", description: "Please choose a different custom alias.", variant: "destructive" });
        return null;
      }
      return shortCode;
    }

    let attempts = 0;
    while (attempts < 5) {
      shortCode = generateShortCode();
      const { data, error } = await supabase.from('urls').select('id').eq('short_code', shortCode).maybeSingle();
      if (error) {
        toast({ title: "Error checking alias", description: error.message, variant: "destructive" });
        return null;
      }
      if (!data) return shortCode;
      attempts++;
    }
    
    toast({ title: "Error", description: "Could not generate a unique link. Please try again.", variant: "destructive" });
    return null;
  };

  const createShortUrl = useCallback(async (originalUrl, customAlias) => {
    setLoading(true);
    try {
      const shortCode = await getUniqueShortCode(customAlias);
      if (!shortCode) return null;

      const fullShortUrl = `${window.location.protocol}//${window.location.host}/${shortCode}`;
      const qrCodeDataUrl = await QRCode.toDataURL(fullShortUrl);
      
      const payload = {
        original_url: originalUrl,
        short_code: shortCode,
        user_id: user?.id,
        metadata: { qrCode: qrCodeDataUrl }
      };

      const { data, error } = await supabase.from('urls').insert(payload).select().single();
      if (error) throw error;

      const newCount = dailyCount + 1;
      setDailyCount(newCount);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('atomzr-usage', JSON.stringify({ date: today, count: newCount }));

      return data;
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to shorten URL.", variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, dailyCount]);

  const expandShortUrl = useCallback(async (shortCode) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('urls').select('*').eq('short_code', shortCode).single();
      if (error || !data) {
        toast({ title: "Link not found", description: "This Atomzr link could not be found.", variant: "destructive" });
        return null;
      }
      if (!data.metadata?.qrCode) {
        const fullShortUrl = `${window.location.protocol}//${window.location.host}/${data.short_code}`;
        data.metadata.qrCode = await QRCode.toDataURL(fullShortUrl);
      }
      return data;
    } catch (error) {
      toast({ title: "Error", description: "Failed to expand link.", variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createShortUrl, expandShortUrl, loading, dailyCount, DAILY_LIMIT };
};