import React, { useState, useEffect } from 'react';
import {
  BarChart3, Users, Eye, Clock, Download, RefreshCw, Trash2
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { analytics } from '../utils/analytics';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ef4444'];

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const processAnalyticsData = () => {
    const storedData = analytics.getStoredAnalytics();
    if (storedData.length === 0) return null;

    const uniqueUsers = new Set(storedData.map(e => e.userId)).size;
    const pageViews = storedData.filter(e => e.type === 'page_view').length;

    const sessions = new Map();
    storedData.forEach(e => {
      const s = sessions.get(e.sessionId) || { start: e.timestamp, end: e.timestamp };
      s.end = Math.max(s.end, e.timestamp);
      sessions.set(e.sessionId, s);
    });
    const avgSession = [...sessions.values()].reduce((sum, s) => sum + (s.end - s.start), 0) / sessions.size;

    const sectionMap = new Map();
    storedData.filter(e => e.type === 'section_view').forEach(e => {
      const id = e.data.sectionId;
      sectionMap.set(id, (sectionMap.get(id) || 0) + 1);
    });
    const topSections = [...sectionMap.entries()]
      .map(([section, views]) => ({ section, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const deviceMap = new Map();
    storedData.filter(e => e.type === 'page_view').forEach(e => {
      const ua = e.data.userAgent || '';
      let type = /Mobile|Android|iPhone/.test(ua) ? 'Mobile' : /iPad|Tablet/.test(ua) ? 'Tablet' : 'Desktop';
      deviceMap.set(type, (deviceMap.get(type) || 0) + 1);
    });
    const deviceTypes = [...deviceMap.entries()].map(([type, count]) => ({ type, count }));

    const hourlyActivity = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
    storedData.forEach(e => {
      const hour = new Date(e.timestamp).getHours();
      hourlyActivity[hour].count++;
    });

    const perf = storedData.filter(e => e.type === 'performance');
    const avgLoadTime = perf.reduce((sum, e) => sum + (e.data.loadTime || 0), 0) / perf.length || 0;
    const avgFirstPaint = perf.reduce((sum, e) => sum + (e.data.firstPaint || 0), 0) / perf.length || 0;

    const errors = storedData.filter(e => e.type === 'error').length;
    const errorRate = storedData.length ? (errors / storedData.length) * 100 : 0;

    return {
      totalEvents: storedData.length,
      uniqueUsers,
      pageViews,
      avgSessionDuration: avgSession / 1000,
      topSections,
      deviceTypes,
      hourlyActivity,
      performanceMetrics: { avgLoadTime, avgFirstPaint, errorRate }
    };
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const result = processAnalyticsData();
      setAnalyticsData(result);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  };

  const clearData = () => {
    analytics.clearStoredAnalytics();
    setAnalyticsData(null);
    setLastUpdated(new Date());
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(analytics.getStoredAnalytics(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated.toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={refreshData} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
              <RefreshCw size={16} /> Refresh
            </button>
            <button onClick={exportData} className="bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700 flex items-center gap-2">
              <Download size={16} /> Export
            </button>
            <button onClick={clearData} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
              <Trash2 size={16} /> Clear Data
            </button>
          </div>
        </div>

        {!analyticsData ? (
          <div className="text-center text-gray-400 text-lg py-20">No analytics data found.</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card label="Total Events" value={analyticsData.totalEvents} icon={<BarChart3 />} color="text-blue-400" />
              <Card label="Unique Users" value={analyticsData.uniqueUsers} icon={<Users />} color="text-emerald-400" />
              <Card label="Page Views" value={analyticsData.pageViews} icon={<Eye />} color="text-purple-400" />
              <Card label="Avg. Session" value={`${Math.round(analyticsData.avgSessionDuration)}s`} icon={<Clock />} color="text-orange-400" />
            </div>

            {/* Top Sections */}
            <ChartBlock title="Top Sections">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.topSections}>
                  <XAxis dataKey="section" tick={{ fill: '#ccc', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
                  <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="views" position="top" fill="#fff" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartBlock>

            {/* Device Types */}
            <ChartBlock title="Device Types">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={analyticsData.deviceTypes}
                    dataKey="count"
                    nameKey="type"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {analyticsData.deviceTypes.map((_: any, index: number) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartBlock>

            {/* Hourly Activity */}
            <ChartBlock title="Hourly Activity">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analyticsData.hourlyActivity}>
                  <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fill: '#ccc', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={false}
                  >
                    <LabelList dataKey="count" position="top" fill="#fff" fontSize={10} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </ChartBlock>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <Metric title="Avg Load Time" value={`${Math.round(analyticsData.performanceMetrics.avgLoadTime)}ms`} color="text-blue-400" />
              <Metric title="First Paint" value={`${Math.round(analyticsData.performanceMetrics.avgFirstPaint)}ms`} color="text-emerald-400" />
              <Metric title="Error Rate" value={`${analyticsData.performanceMetrics.errorRate.toFixed(2)}%`} color="text-red-400" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// UI helpers
const Card = ({ label, value, icon, color }: any) => (
  <div className="bg-gray-800 p-5 rounded-lg flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className={`text-2xl ${color}`}>{icon}</div>
  </div>
);

const Metric = ({ title, value, color }: any) => (
  <div className="bg-gray-800 py-6 rounded-lg">
    <p className="text-sm text-gray-400">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const ChartBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default AnalyticsDashboard;
