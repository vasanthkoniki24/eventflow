import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getNotifications, markAsRead } from "../api/notifications.api";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { formatDate } from "../utils/formatDate";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to load notifications"
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to update");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-label text-accentPrimary">Alerts</p>
        <h1 className="heading-section mt-2">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.length ? (
          notifications.map((item) => (
            <Card key={item.id} className={!item.is_read ? "border-accentPrimary" : ""}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2">
                    {!item.is_read ? (
                      <Badge type="warning">Unread</Badge>
                    ) : (
                      <Badge>Read</Badge>
                    )}
                  </div>

                  <p>{item.message}</p>

                  <p className="mt-2 text-sm text-textSecondary">
                    {formatDate(item.created_at)}
                  </p>
                </div>

                {!item.is_read && (
                  <button
                    onClick={() => handleRead(item.id)}
                    className="text-sm text-accentPrimary"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-textSecondary">
            No notifications.
          </div>
        )}
      </div>
    </div>
  );
}