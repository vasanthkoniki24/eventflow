import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#161820",
          color: "#F0EDE6",
          border: "1px solid rgba(201,168,76,0.35)",
        },
      }}
    />
  );
}