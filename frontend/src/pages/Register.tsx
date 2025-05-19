import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormInputs  = z.infer<typeof registerSchema>;

const Register = () => {
  const registerUser = useAuthStore((state) => state.register);
  const { register, handleSubmit } = useForm<RegisterFormInputs>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormInputs) => {
    try {
      // console.log("data", data)
      await registerUser(data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error("Please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-md mx-auto mt-10 p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Create a New Account</h2>

      <input
        {...register("name")}
        placeholder="Full Name"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        {...register("email")}
        placeholder="Email Address"
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
        Register
      </button>

      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Register;
