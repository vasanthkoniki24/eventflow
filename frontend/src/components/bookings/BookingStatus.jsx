import Badge from "../ui/Badge";

export default function BookingStatus({ status }) {
  const type =
    status === "paid" || status === "confirmed"
      ? "success"
      : status === "cancelled" || status === "refunded"
      ? "danger"
      : "warning";

  return <Badge type={type}>{status}</Badge>;
}