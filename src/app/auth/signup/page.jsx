"use client";

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { useState } from "react";

function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async data => {

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const responseData = await response.json();

    if (response.ok) {
      router.push("/api/auth/signin");
    } else {
      setError(responseData.error);
    }
  })

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form
        className="flex flex-col gap-5"
        onSubmit={onSubmit}
      >
        <h3 className="text-2xl font-semibold">Sign Up</h3>

        {error && (
          <span className="p-2 rounded-lg bg-red-500">{error}</span>
        )}

        <input
          className="p-2 bg-transparent border-b border-slate-500 focus:border-white outline-none"
          type="text"
          placeholder="username"
          required
          {...register("username", {
            required: {
              value: true,
              message: "Username is required"
            }
          })}
        />

        <input
          className="p-2 bg-transparent border-b border-slate-500 focus:border-white outline-none"
          type="email"
          placeholder="email"
          required
          {...register("email", {
            required: {
              value: true,
              message: "Email is required"
            }
          })}
        />

        <input
          className="p-2 bg-transparent border-b border-slate-500 focus:border-white outline-none"
          type="password"
          placeholder="password"
          required
          {...register("password", {
            required: {
              value: true,
              message: "Password is required"
            }
          })}
        />

        <button
          className="p-2 border rounded-lg hover:bg-[#2C2C2F]"
          type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default SignUp