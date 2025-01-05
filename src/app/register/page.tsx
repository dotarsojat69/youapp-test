"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/validation/auth";
import type { RegisterFormData } from "@/types/auth";
import { ChevronLeft } from "lucide-react";
import { registerUser } from "@/lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = registerSchema.parse(formData);
      setIsLoading(true);

      await registerUser(validatedData);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ email: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link href="/" className="flex items-center mb-12 -ml-2">
          <span className="text-2xl">
            <ChevronLeft size={25} />
          </span>
          <span>Back</span>
        </Link>

        <h1 className="text-2xl font-bold mb-8 ml-5">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />

          <Input
            type="text"
            placeholder="Create Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            error={errors.username}
          />

          <Input
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
          />

          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Have an account?{" "}
          <Link href="/login" className="text-orange-200 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
