import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotifBell({ count = 0 }) {
  return (
    <Link to="/notifications" className="relative">
      <Bell className={count > 0 ? "animate-pulse text-accentPrimary" : ""} />

      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}