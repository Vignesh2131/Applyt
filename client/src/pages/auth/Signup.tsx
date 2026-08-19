import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupValidation } from "../../lib/authSchema";
import { Link, useNavigate } from 'react-router'
import {toast} from 'sonner'
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data: SignupValidation) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      );
      if (response.status === 200) { 
        console.log(response)
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1">
        <input
          {...register("name")}
          placeholder="John Doe"
          className="border-accent border-[0.5px] w-70 py-1 px-2 rounded-sm text-content-primary font-semibold"
        />
        <p>{errors.name?.message}</p>
        <input
          {...register("email")}
          placeholder="name@gmail.com"
          className="border-accent border-[0.5px] w-70 py-1 px-2 rounded-sm text-content-primary font-semibold"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("password")}
          placeholder="Password"
          className="border-accent border-[0.5px] w-70 py-1 px-2 rounded-sm text-content-primary font-semibold"
        />
        <p>{errors.password?.message}</p>
        <input
          type="submit"
          value="Create an account"
          className="border-accent bg-accent px-2 py-1 rounded-sm hover:bg-accent-hover font-semibold"
        />
      </form>
      <p className="text-sm text-content-secondary font-semibold">
        Already a user? <Link to="/login" className="text-accent">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
