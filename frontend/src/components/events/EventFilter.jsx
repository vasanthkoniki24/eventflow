import Input from "../ui/Input";
import Button from "../ui/Button";

const categories = [
  "All",
  "Concert",
  "Conference",
  "Workshop",
  "Tech",
  "Nightlife",
  "Festival",
  "Art",
  "Sports",
];

export default function EventFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-bgSurface p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Input
          label="Search"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <p className="mb-1 text-xs uppercase text-textSecondary font-ui">
            Category
          </p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-white/10 bg-bgSurface px-4 py-2.5 text-textPrimary outline-none focus:border-accentPrimary"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? "primary" : "ghost"}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}