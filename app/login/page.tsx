"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [error, setError] = useState<string>("");

  const onSubmit = (data: LoginForm) => {
    // Mock authentication logic (replace with actual authentication logic)
    router.push("/imageEditor", { scroll: false }); // Redirect to dashboard on successful login
  };

  return (
    <section className="relative pt-6 px-4 lg:px-6 pb-20 md:pb-32 overflow-hidden bg-gradient-to-br from-white to-gray-500 h-screen">
      <div className="relative max-w-7xl pt-8 sm:pt-5 mx-auto">
        <img
          className="absolute top-0 left-0 object-contain"
          src="saturn-assets/images/sign-up/background-gradient-color.png"
          alt=""
        />
        <div className="relative container px-4 mx-auto">
          <div className="max-w-lg md:max-w-xl py-14 px-6 xs:px-12 lg:px-16 mx-auto bg-white rounded-4xl shadow-lg rounded-lg">
            <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
              Sign in to your account
            </h3>
            <p className="text-lg text-gray-500 mb-10">
              Greetings on your return! We kindly request you to enter your
              details.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  className="block mb-1.5 text-sm text-gray-900 font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                  type="email"
                  placeholder="pat@saturn.dev"
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-red-500">Invalid email format</span>
                )}
              </div>
              <div className="mb-7">
                <div className="flex mb-1.5 items-center justify-between">
                  <label
                    className="block text-sm text-gray-900 font-semibold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="text-red-500">This field is required</span>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be at least 8 characters long
                    </span>
                  )}
                </div>
              </div>

              <button
                className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-[#fe5829] rounded-full overflow-hidden"
                type="submit"
              >
                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                <span className="relative">Login</span>
              </button>
            </form>

            <div className="text-center">
              <span className="text-xs font-semibold text-gray-900">
                <span>Don’t have an account?</span>
                <a
                  className="inline-block ml-1 text-orange-900 hover:text-orange-700"
                  href="/register"
                >
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
