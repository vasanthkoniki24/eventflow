import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEvent } from "../api/events.api";
import BookingForm from "../components/bookings/BookingForm";
import EventHero from "../components/events/EventHero";
import Skeleton from "../components/ui/Skeleton";

export default function CheckoutPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res.data);
      } catch (error) {
        toast.error(error.response?.data?.detail || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) return <Skeleton className="h-[500px] rounded-2xl" />;

  if (!event) return <div>Event not found</div>;

  return (
    <div className="space-y-8">
      <EventHero event={event} />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-white/10 bg-bgSurface p-6">
          <p className="text-label text-accentPrimary">Secure Booking</p>
          <h2 className="heading-section mt-2">Confirm Your Tickets</h2>
          <p className="mt-4 text-textSecondary">
            Select ticket quantity and continue to Stripe Checkout.
          </p>
        </div>

        <BookingForm event={event} />
      </div>
    </div>
  );
}