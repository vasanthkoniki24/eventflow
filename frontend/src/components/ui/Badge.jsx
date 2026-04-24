export default function Badge({ children, type = "default" }) {
  const styles = {
    default: "bg-bgOverlay text-textSecondary",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    danger: "bg-danger/20 text-danger",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-ui uppercase ${styles[type]}`}
    >
      {children}
    </span>
  );
}