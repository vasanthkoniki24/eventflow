import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      toast.success("Account created successfully");

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/events");
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-label text-accentPrimary mb-2">Create Access</p>
        <h1 className="heading-section">Join SPEKTR</h1>
        <p className="text-textSecondary mt-3">
          Register as a user or admin for testing your full-stack workflow.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input label="Full Name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-danger text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <p className="text-label text-textSecondary mb-2">Role</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("role", "user")}
              className={`rounded-lg border px-4 py-3 font-ui text-sm transition ${
                selectedRole === "user"
                  ? "border-accentPrimary bg-accentPrimary text-black"
                  : "border-white/10 bg-bgSurface text-textPrimary"
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setValue("role", "admin")}
              className={`rounded-lg border px-4 py-3 font-ui text-sm transition ${
                selectedRole === "admin"
                  ? "border-accentPrimary bg-accentPrimary text-black"
                  : "border-white/10 bg-bgSurface text-textPrimary"
              }`}
            >
              Admin
            </button>
          </div>

          <input type="hidden" {...register("role")} />
          {errors.role && (
            <p className="text-danger text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="text-textSecondary text-sm mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-accentPrimary">
          Login
        </Link>
      </p>
    </Card>
  );
}