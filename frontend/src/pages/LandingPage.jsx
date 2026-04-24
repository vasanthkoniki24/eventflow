import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { getEvents } from "../api/events.api";
import EventGrid from "../components/events/EventGrid";
import Button from "../components/ui/Button";

export default function LandingPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data.slice(0, 3));
      } catch {
        toast.error("Failed to load featured events");
      }
    };

    loadFeatured();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-hero px-8 py-20 md:px-14">
        <div className="max-w-4xl">
          <p className="text-label text-accentPrimary">Dark Luxury Event OS</p>

          <h1 className="heading-display mt-5">
            Every Moment, Curated
          </h1>

          <p className="mt-6 max-w-2xl text-body text-textSecondary">
            A premium event booking and ticketing platform for concerts,
            conferences, nightlife, and exclusive experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/events">
              <Button>
                Explore Events <ArrowRight size={16} className="inline ml-2" />
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="ghost">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-label text-accentPrimary">Featured Drops</p>
            <h2 className="heading-section mt-2">Upcoming Events</h2>
          </div>

          <Link to="/events" className="text-accentPrimary">
            View all
          </Link>
        </div>

        <EventGrid events={events} />
      </section>
    </div>
  );
}