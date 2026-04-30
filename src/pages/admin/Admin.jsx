import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Image,
  Megaphone,
  Video,
  Users,
  MessageSquare,
  Shield,
  LogOut,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import EventsManager from '@/components/admin/EventsManager';
import MediaManager from '@/components/admin/MediaManager';
import AnnouncementsManager from '@/components/admin/AnnouncementsManager';
import LiveStreamManager from '@/components/admin/LiveStreamManager';
import LeadersManager from '@/components/admin/LeadersManager';
import InquiriesManager from '@/components/admin/InquiriesManager';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoadingAuth, logout } = useAuth();

  /* ================= LOADING ================= */
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  /* ================= AUTH GUARDS ================= */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate('/login', { replace: true });
  };

  /* ================= TABS ================= */
  const tabs = [
    { id: 'events', label: 'Events', icon: Calendar, component: EventsManager },
    { id: 'media', label: 'Media', icon: Image, component: MediaManager },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Megaphone,
      component: AnnouncementsManager,
    },
    { id: 'livestream', label: 'Live Stream', icon: Video, component: LiveStreamManager },
    { id: 'leaders', label: 'Leaders', icon: Users, component: LeadersManager },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, component: InquiriesManager },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Admin Dashboard</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Church Management</h1>

            <p className="text-slate-600 mt-1">Welcome back, {user?.name || user?.email}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            {/* VIEW SITE */}
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>

            {/* LOGOUT */}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList
            className="
            bg-white p-1 rounded-xl shadow-sm
            flex gap-1 overflow-x-auto whitespace-nowrap
            scrollbar-hide
          "
          >
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="
                  flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap
                  data-[state=active]:bg-amber-500
                  data-[state=active]:text-slate-900
                "
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="text-sm">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id}>
              <tab.component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
