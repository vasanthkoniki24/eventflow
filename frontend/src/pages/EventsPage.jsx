import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getEvents } from "../api/events.api";
import EventGrid from "../components/events/EventGrid";
import EventFilter from "../components/events/EventFilter";
import Skeleton from "../components/ui/Skeleton";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = search.toLowerCase();

      const matchesSearch =
        event.title?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q);

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  return (
    <div>
      <div className="mb-10">
        <p className="text-label text-accentPrimary">Curated Calendar</p>
        <h1 className="heading-section mt-2">Discover Events</h1>
        <p className="mt-3 max-w-2xl text-textSecondary">
          Browse premium events, check live ticket availability, and reserve
          your access through the booking flow.
        </p>
      </div>

      <EventFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} className="h-[420px] rounded-xl" />
          ))}
        </div>
      ) : (
        <EventGrid events={filteredEvents} />
      )}
    </div>
  );
}