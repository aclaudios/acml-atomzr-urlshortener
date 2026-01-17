import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import RedirectPage from '@/pages/RedirectPage';
import AdminDashboard from '@/pages/AdminDashboard';
import Dashboard from '@/pages/Dashboard';
import LandingPage from '@/pages/LandingPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookiePolicy from '@/pages/CookiePolicy';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import LegalNotice from '@/pages/LegalNotice';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const AppContent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin-Al3xxAcc3ss') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminHash();

    window.addEventListener('hashchange', checkAdminHash);
    return () => {
      window.removeEventListener('hashchange', checkAdminHash);
    };
  }, [location]);

  useEffect(() => {
    const migrateLocalStorageToSupabase = async () => {
      const migrationKey = 'atomzr-v2-migration-complete';
      if (localStorage.getItem(migrationKey)) {
        return;
      }

      const storedUrls = localStorage.getItem('urls');
      if (storedUrls) {
        try {
          const localUrls = JSON.parse(storedUrls);
          if (Array.isArray(localUrls) && localUrls.length > 0) {
            
            const { data: existingShortCodesData, error: fetchError } = await supabase
              .from('urls')
              .select('short_code');

            if (fetchError) {
              console.error('Error fetching existing Supabase URLs for migration check:', fetchError);
              return;
            }

            const existingShortCodes = new Set(existingShortCodesData.map(u => u.short_code));
            const uniqueLocalUrls = new Map();

            for (const url of localUrls) {
              if (url.shortCode && !uniqueLocalUrls.has(url.shortCode)) {
                uniqueLocalUrls.set(url.shortCode, url);
              }
            }
            
            const urlsToInsert = Array.from(uniqueLocalUrls.values())
              .filter(url => !existingShortCodes.has(url.shortCode))
              .map(url => ({
                original_url: url.originalUrl,
                short_code: url.shortCode,
                click_count: url.clicks || 0,
                created_at: url.createdAt || new Date().toISOString(),
                user_id: user?.id || null, 
                metadata: {
                  qrCode: url.qrCode,
                  caption: url.caption,
                  migratedFrom: 'localStorage-v1'
                }
            }));
            
            if (urlsToInsert.length > 0) {
                const { error } = await supabase.from('urls').insert(urlsToInsert, { returning: 'minimal' });

                if (error) {
                    console.error('Error migrating data to Supabase:', error);
                } else {
                    console.log('Successfully migrated local storage data to Supabase.');
                    localStorage.setItem(migrationKey, 'true');
                }
            } else {
               localStorage.setItem(migrationKey, 'true');
            }
          }
        } catch (e) {
          console.error('Failed to parse local storage URLs or migrate:', e);
        }
      } else {
        localStorage.setItem(migrationKey, 'true');
      }
    };

    migrateLocalStorageToSupabase();
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Atomzr: Free, Fast, Reliable Link Shortening</title>
        <meta name="description" content="Atomzr is a minimalist yet powerful URL shortener. Shorten, share, and track your links with ease." />
      </Helmet>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={isAdmin ? <AdminDashboard /> : <HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;