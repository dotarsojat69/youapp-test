"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/profile");
        setProfile(response.data);
      } catch (error: any) {
        // Tangani error autentikasi
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast({
            title: "Session Expired",
            description: "Please login again",
            variant: "destructive",
          });
          logout();
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch profile",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex gap-20 pb-6">
          <Link href="/" className="flex items-center mb-3">
            <span className="text-2xl">
              <ChevronLeft size={25} />
            </span>
            <span>Back</span>
          </Link>
          <div>
            <h1>@{profile?.username || "username"}</h1>
          </div>
        </div>

        <div className="p-3 mb-6 bg-[#162329] rounded-xl">
          <div className="rounded-xl h-40"></div>
          <span className="text-white">
            @{profile?.username || "username"},
          </span>
        </div>

        {/* About Section */}
        <div className="grid gap-5">
          <div className="p-4 bg-[#0E191F] space-y-6 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold">About</h2>
                <button>
                  <Edit3 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-[#FFFFFF85] text-sm">
                Add in your your to help others know you better
              </p>
            </div>
          </div>

          {/* Interest Section */}
          <div className="p-4 bg-[#0E191F] space-y-6 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold">Interest</h2>
                <button>
                  <Edit3 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-[#B8B8B8] text-sm">
                Add in your interest to find a better match
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProtectedProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
