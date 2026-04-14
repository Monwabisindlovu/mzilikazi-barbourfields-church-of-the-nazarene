import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Login from '@/pages/Login';
import Layout from './Layout';

// Public Pages
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import Leadership from '@/pages/Leadership';
import Media from '@/pages/Media';
import Mission from '@/pages/Mission';
import Vision from '@/pages/Vision';
import Partnership from '@/pages/Partnership';
import UpcomingEvents from '@/pages/UpcomingEvents';

// Admin Pages
import Admin from '@/pages/admin/Admin';

// Layout wrapper component
const WithLayout = ({ children }) => <Layout>{children}</Layout>;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route - redirects to admin if already logged in as admin
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  // If admin is logged in and tries to access login page, redirect to admin
  if ((isAuthenticated && user?.role === 'admin') || user?.role === 'super_admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Route - No Layout, full screen */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Home Page */}
      <Route
        path="/"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />

      {/* Public Pages with Layout */}
      <Route
        path="/about"
        element={
          <WithLayout>
            <AboutUs />
          </WithLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <WithLayout>
            <ContactUs />
          </WithLayout>
        }
      />
      <Route
        path="/leadership"
        element={
          <WithLayout>
            <Leadership />
          </WithLayout>
        }
      />
      <Route
        path="/media"
        element={
          <WithLayout>
            <Media />
          </WithLayout>
        }
      />
      <Route
        path="/mission"
        element={
          <WithLayout>
            <Mission />
          </WithLayout>
        }
      />
      <Route
        path="/vision"
        element={
          <WithLayout>
            <Vision />
          </WithLayout>
        }
      />
      <Route
        path="/partnership"
        element={
          <WithLayout>
            <Partnership />
          </WithLayout>
        }
      />
      <Route
        path="/events"
        element={
          <WithLayout>
            <UpcomingEvents />
          </WithLayout>
        }
      />

      {/* Protected Admin Route - No Layout (Admin has its own layout) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <WithLayout>
            <PageNotFound />
          </WithLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <AppRoutes />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
