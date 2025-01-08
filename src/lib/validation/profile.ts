import * as z from "zod";

export const aboutEditSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  gender: z.string().min(1, "Gender is required"),
  birthday: z.union([z.string(), z.date()]).optional(),
  horoscope: z.string().optional(),
  zodiac: z.string().optional(),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  profilePicture: z.string().optional(),
});

export type AboutEditType = z.infer<typeof aboutEditSchema>;
