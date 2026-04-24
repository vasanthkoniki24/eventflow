import { Calendar, MapPin, Ticket } from "lucide-react";
import Badge from "../ui/Badge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function EventHero({ event }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-bgElevated">
        {event.banner_image ? (
          <img
            src={event.banner_image}
            alt={event.title}
            className="h-full w-full object-cover opacity-80"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-hero text-7xl">
            🎫
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bgBase via-bgBase/20 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <Badge>{event.category || "Event"}</Badge>
          <h1 className="heading-display mt-4 max-w-3xl text-textPrimary">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-bgSurface p-6">
        <p className="text-label text-accentPrimary">Event Details</p>

        <div className="mt-6 space-y-5">
          <div className="flex gap-3">
            <Calendar className="text-accentPrimary" />
            <div>
              <p className="text-sm text-textSecondary">Date & Time</p>
              <p>{formatDate(event.event_date)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <MapPin className="text-accentPrimary" />
            <div>
              <p className="text-sm text-textSecondary">Venue</p>
              <p>{event.location}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Ticket className="text-accentPrimary" />
            <div>
              <p className="text-sm text-textSecondary">Available Tickets</p>
              <p>{event.available_tickets} / {event.total_tickets}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-textSecondary">Starting from</p>
          <p className="text-price text-accentPrimary">
            {formatCurrency(event.price)}
          </p>
        </div>
      </div>
    </div>
  );
}