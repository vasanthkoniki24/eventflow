import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";

export default function EventForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    category: initialData?.category || "Concert",
    banner_image: initialData?.banner_image || "",
    event_date: initialData?.event_date
      ? new Date(initialData.event_date).toISOString().slice(0, 16)
      : "",
    price: initialData?.price || "",
    total_tickets: initialData?.total_tickets || "",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      price: Number(form.price),
      total_tickets: Number(form.total_tickets),
      event_date: new Date(form.event_date).toISOString(),
    });
  };

  return (
    <Card>
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />

        <Input
          label="Category"
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          required
        />

        <Input
          label="Location"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          required
        />

        <Input
          label="Banner Image"
          value={form.banner_image}
          onChange={(e) => update("banner_image", e.target.value)}
        />

        <Input
          label="Event Date"
          type="datetime-local"
          value={form.event_date}
          onChange={(e) => update("event_date", e.target.value)}
          required
        />

        <Input
          label="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          required
        />

        <Input
          label="Total Tickets"
          type="number"
          value={form.total_tickets}
          onChange={(e) => update("total_tickets", e.target.value)}
          required
        />

        <div className="md:col-span-2">
          <textarea
            className="w-full rounded-lg border border-white/10 bg-bgSurface p-3 text-textPrimary"
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="flex gap-3 md:col-span-2">
          <Button type="submit">
            {initialData ? "Update Event" : "Create Event"}
          </Button>

          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}