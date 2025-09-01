import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { getApi, getApiBaseUrl } from '../api/client';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    const fetchSummary = async () => {
      setStatus('loading');
      const base = getApiBaseUrl();
      // Mock data if no base URL
      if (!base) {
        setSummary({ totalUsers: 1234, activeOrders: 56, revenue: 78910 });
        setStatus('ready');
        return;
      }
      try {
        const api = getApi();
        const res = await api.get('/admin/summary');
        setSummary(res?.data || { totalUsers: 0, activeOrders: 0, revenue: 0 });
        setStatus('ready');
      } catch (err) {
        // Fallback to mock if network error
        if (err.message && err.message.includes('Network')) {
          setSummary({ totalUsers: 1234, activeOrders: 56, revenue: 78910 });
          setStatus('ready');
          return;
        }
        setStatus('error');
      }
    };
    fetchSummary();
  }, []);

  const cardStyle = { border: '1px solid #ddd', padding: 16, borderRadius: 8, minWidth: 180 };

  return (
    <>
      <NavBar />
      <div style={{ padding: 16 }}>
        <h2>Admin Dashboard</h2>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'error' && <div style={{ color: 'red' }}>Failed to load data.</div>}
        {status === 'ready' && summary && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, color: '#666' }}>Total Users</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>{summary.totalUsers}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, color: '#666' }}>Active Orders</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>{summary.activeOrders}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, color: '#666' }}>Revenue</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>${summary.revenue}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
