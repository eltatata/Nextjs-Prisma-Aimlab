"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignIn() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (response.ok) {
      router.push("/practice")
      router.refresh();
    } else {
      setError(response.error);
    }
  })

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form
        className="flex flex-col gap-5"
        onSubmit={onSubmit}
      >
        <h3 className="text-2xl font-semibold">Sign In</h3>

        {error && (
          <span className="p-2 rounded-lg bg-red-500">{error}</span>
        )}

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

export default SignIn