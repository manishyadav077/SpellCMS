import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      toast.success("Sucessfully logged in!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Login to SpellCMS</h2>
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        {...register("password")}
        placeholder="Password"
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
      >
        Login
      </button>

      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
