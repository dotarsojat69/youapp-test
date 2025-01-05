"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validation/auth";
import type { LoginFormData } from "@/types/auth";
import { ChevronLeft } from "lucide-react";
import { loginUser } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      setIsLoading(true);

      await loginUser(validatedData);
      router.push("/profile");
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

        <h1 className="text-2xl font-bold mb-8 ml-5">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Enter Username/Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />

          <Input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
          />

          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          No account?{" "}
          <Link href="/register" className="text-orange-200 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
