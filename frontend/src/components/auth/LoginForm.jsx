import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      toast.success("Login successful");

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/events");
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-label text-accentPrimary mb-2">Welcome Back</p>
        <h1 className="heading-section">Login to SPEKTR</h1>
        <p className="text-textSecondary mt-3">
          Access your bookings, events, and admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input label="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input label="Password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-textSecondary text-sm mt-6 text-center">
        New to SPEKTR?{" "}
        <Link to="/register" className="text-accentPrimary">
          Create account
        </Link>
      </p>
    </Card>
  );
}