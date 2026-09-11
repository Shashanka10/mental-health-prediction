import { z } from "zod";

export const assessmentSchema = z.object({
  age: z
    .number({ error: "Age is required." })
    .min(10, "Age must be at least 10.")
    .max(100, "Age must be at most 100."),

  gender: z.enum(["Male", "Female"], { error: "Please select your gender." }),

  country: z.string().min(1, "Please select your country."),

  academic_level: z.enum(["Undergraduate", "Graduate", "High School"], {
    error: "Please select your academic level.",
  }),

  most_used_platform: z.enum(
    [
      "Instagram",
      "Facebook",
      "LinkedIn",
      "Twitter",
      "Snapchat",
      "TikTok",
      "Youtube",
      "LINE",
      "KakaoTalk",
      "VKontakte",
      "WhatsApp",
      "WeChat",
    ],
    { error: "Please select your most-used platform." },
  ),

  purpose_of_use: z.enum(["Networking", "Entertainment", "Education", "News"], {
    error: "Please select your purpose of use.",
  }),

  avg_daily_usage_hours: z
    .number()
    .min(0, "Usage cannot be negative.")
    .max(24, "Usage cannot exceed 24 hours."),

  daily_unlocks: z
    .number()
    .int("Unlocks must be a whole number.")
    .min(0, "Unlocks cannot be negative.")
    .max(300, "Unlocks cannot exceed 300."),

  study_hours: z
    .number()
    .min(0, "Study hours cannot be negative.")
    .max(24, "Study hours cannot exceed 24 hours."),

  physical_activity_hours: z
    .number()
    .min(0, "Activity hours cannot be negative.")
    .max(24, "Activity hours cannot exceed 24 hours."),

  sleep_hours_per_night: z
    .number()
    .min(0, "Sleep cannot be negative.")
    .max(24, "Sleep cannot exceed 24 hours."),

  stress_level: z.enum(["Low", "Medium", "High", "Very High"], {
    error: "Please select your stress level.",
  }),
});

export type AssessmentFormData = z.infer<typeof assessmentSchema>;
