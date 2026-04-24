import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AppShell from "../components/layout/AppShell";
import PageWrapper from "../components/layout/PageWrapper";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/EventDetailPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentCancelPage from "../pages/PaymentCancelPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import NotificationsPage from "../pages/NotificationsPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEvents from "../pages/admin/AdminEvents";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminRevenue from "../pages/admin/AdminRevenue";

/* Temporary placeholder pages for Phase 2 */









function WithLayout({ children }) {
  return (
    <AppShell>
      <PageWrapper>{children}</PageWrapper>
    </AppShell>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WithLayout>
            <LandingPage />
          </WithLayout>
        }
      />

      <Route
        path="/login"
        element={
          <WithLayout>
            <LoginPage />
          </WithLayout>
        }
      />

      <Route
        path="/register"
        element={
          <WithLayout>
            <RegisterPage />
          </WithLayout>
        }
      />

      <Route
        path="/events"
        element={
          <WithLayout>
            <EventsPage />
          </WithLayout>
        }
      />

      <Route
        path="/events/:id"
        element={
          <WithLayout>
            <EventDetailPage />
          </WithLayout>
        }
      />

      <Route
        path="/checkout/:id"
        element={
          <ProtectedRoute>
            <WithLayout>
              <CheckoutPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-success"
        element={
          <WithLayout>
            <PaymentSuccessPage />
          </WithLayout>
        }
      />

      <Route
        path="/payment-cancel"
        element={
          <WithLayout>
            <PaymentCancelPage />
          </WithLayout>
        }
      />

      <Route
        path="/booking-success"
        element={
          <WithLayout>
            <PaymentSuccessPage />
          </WithLayout>
        }
      />

      <Route
        path="/booking-cancelled"
        element={
          <WithLayout>
            <PaymentCancelPage />
          </WithLayout>
        }
      />
      
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <WithLayout>
              <MyBookingsPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <WithLayout>
              <NotificationsPage />
            </WithLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <WithLayout>
              <AdminDashboard />
            </WithLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <AdminRoute>
            <WithLayout>
              <AdminEvents />
            </WithLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <WithLayout>
              <AdminBookings />
            </WithLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/revenue"
        element={
          <AdminRoute>
            <WithLayout>
              <AdminRevenue />
            </WithLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
}