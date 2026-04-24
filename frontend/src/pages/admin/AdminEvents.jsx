import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../api/events.api";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EventForm from "../../components/events/EventForm";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (data) => {
  try {
    toast.loading("Saving...");

    if (editing) {
      const res = await updateEvent(editing.id, data);

      setEvents((prev) =>
        prev.map((e) => (e.id === editing.id ? res.data : e))
      );

      toast.dismiss();
      toast.success("Event updated");
    } else {
      const res = await createEvent(data);

      setEvents((prev) => [res.data, ...prev]);

      toast.dismiss();
      toast.success("Event created");
    }

    setShowForm(false);
    setEditing(null);
  } catch (error) {
    toast.dismiss();
    toast.error(error.response?.data?.detail || "Save failed");
  }
};

  const handleDelete = async (id) => {
  try {
    toast.loading("Deleting event...");

    await deleteEvent(id);

    toast.dismiss();
    toast.success("Event deleted");

    setEvents((prev) => prev.filter((e) => e.id !== id));
  } catch (error) {
    toast.dismiss();
    toast.error(error.response?.data?.detail || "Delete failed");
  }
};

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-label text-accentPrimary">Admin</p>
          <h1 className="heading-section mt-2">Manage Events</h1>
        </div>

        <Button onClick={() => setShowForm(true)}>Create Event</Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <EventForm
            initialData={editing}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="heading-card">{event.title}</h3>
                <p className="mt-2 text-sm text-textSecondary">
                  {event.location} • {formatDate(event.event_date)}
                </p>
                <p className="mt-1 text-accentPrimary">
                  {formatCurrency(event.price)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditing(event);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>

                <Button variant="danger" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}