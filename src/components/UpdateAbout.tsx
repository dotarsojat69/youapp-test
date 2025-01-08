"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { CustomFormField } from "./custom-formfield";
import { aboutEditSchema, AboutEditType } from "@/lib/validation/profile";
import { Plus } from "lucide-react";
import api from "@/lib/axios";

interface UpdateAboutProps {
  initialData: Partial<AboutEditType>;
  onUpdate: (data: AboutEditType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function UpdateAbout({
  initialData,
  onUpdate,
  isOpen,
}: UpdateAboutProps) {
  const form = useForm<AboutEditType>({
    resolver: zodResolver(aboutEditSchema),
    defaultValues: {
      displayName: "",
      gender: "",
      birthday: "",
      horoscope: "",
      zodiac: "",
      height: "",
      weight: "",
      ...initialData,
    },
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const calculateHoroscope = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const horoscopeSigns = [
      { name: "Capricorn", start: [12, 22], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    return (
      horoscopeSigns.find((sign) => {
        const startDate = new Date(
          date.getFullYear(),
          sign.start[0] - 1,
          sign.start[1]
        );
        const endDate = new Date(
          date.getFullYear(),
          sign.end[0] - 1,
          sign.end[1]
        );
        return date >= startDate && date <= endDate;
      })?.name || "Unknown"
    );
  };

  const calculateZodiac = (date: Date) => {
    const zodiacs = [
      "Rat",
      "Ox",
      "Tiger",
      "Rabbit",
      "Dragon",
      "Snake",
      "Horse",
      "Goat",
      "Monkey",
      "Rooster",
      "Dog",
      "Pig",
    ];
    return zodiacs[(date.getFullYear() - 1900) % 12];
  };

  const onSubmit = async (values: AboutEditType) => {
    const formData = new FormData();
    formData.append("displayName", values.displayName);
    formData.append("gender", values.gender);
    formData.append("birthday", values.birthday);
    formData.append("height", values.height);
    formData.append("weight", values.weight);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await api.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(response.data.profile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <Accordion type="single" value={isOpen ? "about" : ""} className="w-full">
      <AccordionItem value="about" className="border-0">
        <AccordionContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  variant="ghost"
                  className="text-gold hover:bg-transparent px-0"
                >
                  Save & Update
                </Button>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#162329] rounded-3xl flex items-center justify-center">
                  {profilePicture ? (
                    <Image
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-xl object-cover"
                    />
                  ) : (
                    <div className="text-[#FFFFFF14] flex items-center justify-center">
                      <Plus size={30} color="gold" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profilePictureInput"
                />
                <label
                  htmlFor="profilePictureInput"
                  className="cursor-pointer text-sm text-[#B8B8B8]"
                >
                  Add image
                </label>
              </div>

              <div className="space-y-4 p-1">
                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">
                    Display name:
                  </span>
                  <CustomFormField control={form.control} name="displayName">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        className="bg-[#162329] border-none text-right text-[#FFFFFF4D] rounded-xl"
                        placeholder="Enter name"
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Gender:</span>
                  <CustomFormField control={form.control} name="gender">
                    {(field) => (
                      <Select
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-[#162329] border-none text-[#FFFFFF4D] rounded-xl">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162329] border-[#1A2629]">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Birthday:</span>
                  <CustomFormField control={form.control} name="birthday">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        type="date"
                        className="bg-[#162329] border-none text-right text-[#FFFFFF4D] rounded-xl"
                        placeholder="DD MM YYYY"
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Horoscope:</span>
                  <CustomFormField control={form.control} name="horoscope">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        className="bg-[#162329] text-right border-none text-[#FFFFFF4D] rounded-xl"
                        placeholder="--"
                        disabled
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Zodiac:</span>
                  <CustomFormField control={form.control} name="zodiac">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        className="bg-[#162329] text-right border-none text-[#FFFFFF4D] rounded-xl"
                        placeholder="--"
                        disabled
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Height:</span>
                  <CustomFormField control={form.control} name="height">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        type="number"
                        className="bg-[#162329] border-none text-right text-[#FFFFFF4D] rounded-xl"
                        placeholder="Add height"
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                  <span className="text-sm text-[#FFFFFF54]">Weight:</span>
                  <CustomFormField control={form.control} name="weight">
                    {(field) => (
                      <Input
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString()
                            : field.value
                        }
                        type="number"
                        className="bg-[#162329] border-none text-right text-[#FFFFFF4D] rounded-xl"
                        placeholder="Add weight"
                      />
                    )}
                  </CustomFormField>
                </div>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
