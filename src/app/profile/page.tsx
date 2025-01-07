"use client";

import React from "react";
import { ChevronLeft, Edit3 } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
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
            <h1>@johndoe123</h1>
          </div>
        </div>

        <div className="p-3 mb-6 bg-[#162329] rounded-xl">
          <div className="rounded-xl h-40"></div>
          <span className="text-white">@johndoe123,</span>
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

export default ProfilePage;
