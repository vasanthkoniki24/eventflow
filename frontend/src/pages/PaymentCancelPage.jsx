import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-xl text-center">
        <h1 className="heading-section">Payment Cancelled</h1>

        <p className="mt-4 text-textSecondary">
          Your payment was cancelled. You can retry from your bookings page.
        </p>

        <Link to="/events">
          <Button className="mt-8">Back to Events</Button>
        </Link>
      </Card>
    </div>
  );
}