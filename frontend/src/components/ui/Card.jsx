export default function Card({ children, className }) {
  return (
    <div
      className={`bg-bgSurface border border-border-subtle rounded-xl p-5 transition-all duration-300 hover:shadow-gold hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}