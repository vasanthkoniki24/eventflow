import Card from "../ui/Card";
import BookingStatus from "./BookingStatus";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function BookingCard({ booking }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-accentPrimary" />

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-label text-accentPrimary">
            Ticket #{booking.id}
          </p>

          <h3 className="heading-card mt-2">
            {booking.event?.title || `Event ${booking.event_id}`}
          </h3>

          <p className="mt-2 text-sm text-textSecondary">
            {booking.event?.location || "Venue"} •{" "}
            {booking.event?.event_date
              ? formatDate(booking.event.event_date)
              : formatDate(booking.created_at)}
          </p>
        </div>

        <div className="grid gap-3 text-sm md:text-right">
          <p>
            Quantity: <strong>{booking.quantity}</strong>
          </p>

          <p>
            Total:{" "}
            <strong className="text-accentPrimary">
              {formatCurrency(booking.total_amount)}
            </strong>
          </p>

          <div className="flex gap-2 md:justify-end">
            <BookingStatus status={booking.status} />
            <BookingStatus status={booking.payment_status} />
          </div>
        </div>
      </div>
    </Card>
  );
}