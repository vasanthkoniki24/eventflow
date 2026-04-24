import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllBookings } from "../../api/bookings.api";
import { cancelBookingByAdmin } from "../../api/admin.api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
  try {
    toast.loading("Cancelling booking...");

    await cancelBookingByAdmin(id);

    toast.dismiss();
    toast.success("Booking cancelled");

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "cancelled", payment_status: "refunded" }
          : b
      )
    );
  } catch (error) {
    toast.dismiss();
    toast.error(error.response?.data?.detail || "Cancel failed");
  }
};

  return (
    <div>
      <div className="mb-8">
        <p className="text-label text-accentPrimary">Admin</p>
        <h1 className="heading-section mt-2">Bookings</h1>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-bgSurface p-8 text-textSecondary">
            No bookings found.
          </div>
        )}

        {bookings.map((booking) => (
          <Card key={booking.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="heading-card">
                  #{booking.id} — {booking.event?.title || booking.event_id}
                </h3>

                <p className="mt-2 text-sm text-textSecondary">
                  User: {booking.user?.email || booking.user_id}
                </p>

                <p className="mt-1 text-accentPrimary">
                  {formatCurrency(booking.total_amount)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  type={booking.status === "cancelled" ? "danger" : "success"}
                >
                  {booking.status}
                </Badge>

                <Badge
                  type={
                    booking.payment_status === "paid" ? "success" : "warning"
                  }
                >
                  {booking.payment_status}
                </Badge>

                {booking.status !== "cancelled" && (
                  <Button
                    variant="danger"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}