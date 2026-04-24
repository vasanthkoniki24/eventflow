import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEvent } from "../api/events.api";
import EventHero from "../components/events/EventHero";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await getEvent(id);
      setEvent(res.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) {
    return <Skeleton className="h-[500px] rounded-2xl" />;
  }

  if (!event) {
    return (
      <div className="rounded-xl border border-white/10 bg-bgSurface p-10 text-center">
        Event not found.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <EventHero event={event} />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-white/10 bg-bgSurface p-6">
          <p className="text-label text-accentPrimary">About Event</p>
          <h2 className="heading-section mt-2">Experience Details</h2>
          <p className="mt-5 text-body text-textSecondary">
            {event.description || "No event description added yet."}
          </p>
        </div>

        <div className="sticky top-24 h-fit rounded-2xl border border-border-accent bg-bgSurface p-6 shadow-gold">
          <p className="text-label text-accentPrimary">Ready to Book?</p>
          <h3 className="heading-card mt-2">Reserve your tickets now</h3>
          <p className="mt-3 text-sm text-textSecondary">
            Continue to the checkout flow and complete your payment securely.
          </p>

          <Link to={`/checkout/${event.id}`}>
            <Button className="mt-6 w-full">Continue to Booking</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}