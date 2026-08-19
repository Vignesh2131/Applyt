import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginValidation } from "../../lib/authSchema";
import axios from "axios";
import {Link, useNavigate} from 'react-router' 
import { toast } from "sonner";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
    const onSubmit = async (data: LoginValidation) => {
        try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
              {
                email: data.email,
                password: data.password,
              },
          );
          if (response.status === 200) { 
            toast(response.data.message)
            navigate("/home")
          }
        } catch (error) {
            console.log(error)
        }
            
        
  };
  return (
    <div className="flex flex-col items-center gap-y-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-1"
      >
        <input
          {...register("email")}
          placeholder="name@gmail.com"
          className="border-accent border-[0.5px] w-70 py-1 px-2 rounded-sm text-content-primary font-semibold"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border-accent border-[0.5px] w-70 py-1 px-2 rounded-sm text-content-primary font-semibold"
        />
        <p>{errors.password?.message}</p>
        <input
          type="submit"
          value="Login"
          className="border-accent bg-accent px-2 py-1 rounded-sm hover:bg-accent-hover font-semibold"
        />
      </form>
      <p className="text-sm text-content-secondary font-semibold">
        Don't have an account? <Link to="/signup" className="text-accent">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
