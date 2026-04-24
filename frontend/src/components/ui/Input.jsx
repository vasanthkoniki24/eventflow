export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-textSecondary font-ui uppercase">
          {label}
        </label>
      )}
      <input
        {...props}
        className="bg-bgSurface border border-border-subtle rounded-lg px-3 py-2 text-textPrimary outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition"
      />
    </div>
  );
}