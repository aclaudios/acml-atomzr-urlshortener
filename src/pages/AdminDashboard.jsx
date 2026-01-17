import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Server, Clock, Link, Globe, User } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const [urlLogs, setUrlLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = () => {
      setLoading(true);
      const logs = JSON.parse(localStorage.getItem('urlLogs') || '[]');
      setUrlLogs(logs);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Atomzr</title>
        <meta name="description" content="Administrator dashboard for Atomzr URL shortener." />
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
              <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center space-x-3">
                <Shield className="w-10 h-10" />
                <span>Admin Dashboard</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Viewing all URL creation logs.
              </p>
            </div>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5" />
                  <span>URL Creation Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading logs...</div>
                ) : urlLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No logs found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Original URL</th>
                          <th scope="col" className="px-6 py-3">Shortened URL</th>
                          <th scope="col" className="px-6 py-3">Timestamp</th>
                          <th scope="col" className="px-6 py-3">Source Page</th>
                          <th scope="col" className="px-6 py-3">Session ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {urlLogs.map((log) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white border-b hover:bg-slate-50"
                          >
                            <td className="px-6 py-4 font-medium text-slate-900 break-all max-w-xs truncate" title={log.originalUrl}>
                              <Link className="w-4 h-4 inline-block mr-2" />{log.originalUrl}
                            </td>
                            <td className="px-6 py-4 font-mono">{log.shortUrl}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(log.createdAt).toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>{log.sourcePage}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs" title={log.sessionId}>
                               <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{log.sessionId.split('_')[1]}</span>
                               </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;