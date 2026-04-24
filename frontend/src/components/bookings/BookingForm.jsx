import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/formatCurrency";
import { createBooking } from "../../api/bookings.api";
import { createPaymentSession } from "../../api/payments.api";

export default function BookingForm({ event }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxQty = Math.min(10, event.available_tickets);
  const total = Number(event.price) * quantity;

  const handleBooking = async () => {
    try {
      setLoading(true);

      const bookingRes = await createBooking({
        event_id: event.id,
        quantity,
      });

      const paymentRes = await createPaymentSession({
        booking_id: bookingRes.data.id,
      });

      window.location.href = paymentRes.data.checkout_url;
    } catch (error) {
      toast.error(error.response?.data?.detail || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <p className="text-label text-accentPrimary">Checkout</p>
      <h3 className="heading-card mt-2">Reserve Tickets</h3>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-textSecondary">Available</span>
          <strong>{event.available_tickets}</strong>
        </div>

        <div>
          <p className="text-label text-textSecondary mb-2">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg bg-bgOverlay px-4 py-2"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>

            <span className="rounded-lg border border-white/10 px-6 py-2">
              {quantity}
            </span>

            <button
              className="rounded-lg bg-bgOverlay px-4 py-2"
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between">
            <span className="text-textSecondary">Total</span>
            <strong className="text-price text-accentPrimary">
              {formatCurrency(total)}
            </strong>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleBooking}
          disabled={loading || event.available_tickets <= 0}
        >
          {loading ? "Redirecting..." : "Book & Pay"}
        </Button>
      </div>
    </Card>
  );
}