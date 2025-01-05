"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterType } from "@/lib/validation/auth";
import { ChevronLeft } from "lucide-react";
import { registerUser } from "@/lib/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/custom-formfield";

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterType) => {
    try {
      const result = await registerUser(data);
      toast({
        description: result.message,
      });
      router.push("/login");
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

        <h1 className="text-2xl font-bold mb-8 ml-5">Register</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomFormField control={form.control} name="email">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Enter Email"
                  id="input-email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="username">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Create Username"
                  id="input-username"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="password">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Create Password"
                  type="password"
                  id="input-password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="confirmPassword">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Confirm Password"
                  type="password"
                  id="input-confirmPassword"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <Button type="submit" isLoading={isLoading}>
              Register
            </Button>
          </form>
        </Form>

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
