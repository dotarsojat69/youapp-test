"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full shadow-slate-950 shadow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          <h1 className="text-white ml-3">Home</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
