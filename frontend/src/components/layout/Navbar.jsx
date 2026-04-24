import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bgBase">
      <Link to="/" className="text-xl font-display text-accentPrimary">
        SPEKTR
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/events">Explore</Link>

        {user?.role === "user" && (
          <>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/notifications">Notifications</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/events">Manage Events</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/revenue">Revenue</Link>
            <Link to="/notifications">Notifications</Link>
          </>
        )}

        {user ? (
          <button onClick={logout} className="text-danger">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}