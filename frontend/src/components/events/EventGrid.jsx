import EventCard from "./EventCard";

export default function EventGrid({ events }) {
  if (!events?.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 bg-bgSurface p-10 text-center text-textSecondary">
        No events found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}