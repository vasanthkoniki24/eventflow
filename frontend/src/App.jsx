import { useEffect } from "react";
import AppRouter from "./router";
import useAuthStore from "./store/authStore";

export default function App() {
  const restore = useAuthStore((state) => state.restore);

  useEffect(() => {
    restore();
  }, [restore]);

  return <AppRouter />;
}