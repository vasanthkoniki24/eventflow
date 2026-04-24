import Card from "../ui/Card";

export default function StatCard({ label, value }) {
  return (
    <Card>
      <p className="text-label text-textSecondary">{label}</p>
      <h2 className="mt-3 font-display text-4xl text-accentPrimary">
        {value}
      </h2>
    </Card>
  );
}