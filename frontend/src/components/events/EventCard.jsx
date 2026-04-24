import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function EventCard({ event }) {
  const sold = event.total_tickets - event.available_tickets;
  const percentage = event.total_tickets
    ? Math.round((sold / event.total_tickets) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative h-56 overflow-hidden rounded-t-xl bg-bgElevated">
        {event.banner_image ? (
          <img
            src={event.banner_image}
            alt={event.title}
            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-hero text-6xl">
            🎟️
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bgBase via-transparent to-transparent" />

        <div className="absolute left-4 top-4">
          <Badge>{event.category || "Event"}</Badge>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="heading-card text-textPrimary">{event.title}</h3>

          <div className="mt-3 space-y-2 text-sm text-textSecondary">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-accentPrimary" />
              {event.location}
            </p>

            <p className="flex items-center gap-2">
              <Calendar size={16} className="text-accentPrimary" />
              {formatDate(event.event_date)}
            </p>

            <p className="flex items-center gap-2">
              <Ticket size={16} className="text-accentPrimary" />
              {event.available_tickets} seats left
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-xs text-textSecondary">
            <span>Capacity</span>
            <span>{percentage}% sold</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-bgOverlay">
            <div
              className="h-full rounded-full bg-accentPrimary transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-price text-accentPrimary">
            {formatCurrency(event.price)}
          </p>

          <Link to={`/events/${event.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}