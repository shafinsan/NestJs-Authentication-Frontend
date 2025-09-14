"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/forgot-password", data);

      if (response.data.status) {
        setSuccess("Password reset instructions have been sent to your email.");
        setTimeout(() => {
          router.push(
            "/reset-password?email=" + encodeURIComponent(data?.email)
          );
        }, 2000);
      } else {
        setError(response.data.error || "Failed to send reset instructions");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
