import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-xl text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-3xl text-success">
          ✓
        </div>

        <h1 className="heading-section">Payment Successful</h1>

        <p className="mt-4 text-textSecondary">
          Your payment has been completed. Please check your booking status.
        </p>

        {sessionId && (
          <p className="mt-4 break-all text-xs text-textSecondary">
            Session ID: {sessionId}
          </p>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/my-bookings">
            <Button>My Bookings</Button>
          </Link>

          <Link to="/events">
            <Button variant="ghost">Explore Events</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}