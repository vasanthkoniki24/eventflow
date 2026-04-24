import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyBookings } from "../api/bookings.api";
import BookingCard from "../components/bookings/BookingCard";
import Skeleton from "../components/ui/Skeleton";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-label text-accentPrimary">Ticket Wallet</p>
        <h1 className="heading-section mt-2">My Bookings</h1>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : bookings.length ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-textSecondary">
          No bookings found.
        </div>
      )}
    </div>
  );
}