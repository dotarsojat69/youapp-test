"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginType } from "@/lib/validation/auth";
import { ChevronLeft } from "lucide-react";
import { loginUser } from "@/lib/api/auth";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { CustomFormField } from "@/components/custom-formfield";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginIdentifier: "",
      password: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const isComplete = value.loginIdentifier && value.password;
      setIsFormComplete(!!isComplete);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleLogin = async (data: LoginType) => {
    try {
      setIsLoading(true);
      const result = await loginUser(data);

      // Simpan token di localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);

        // Set cookie untuk middleware
        document.cookie = `next-auth.token=${result.token}; path=/; SameSite=Strict`;
      }

      toast({
        description: result.message,
      });

      // Redirect ke profile
      router.push("/profile");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <CustomFormField control={form.control} name="loginIdentifier">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Enter Username/Email"
                  id="input-email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>

            <CustomFormField control={form.control} name="password">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Enter Password"
                  type="password"
                  id="input-password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>

            <Button
              variant="gradient"
              isComplete={isFormComplete}
              isLoading={isLoading}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>

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
