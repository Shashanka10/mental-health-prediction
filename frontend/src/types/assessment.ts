// types/assessment.ts
import type { AssessmentFormData } from "@/schemas/assessment";

export type StudentData = AssessmentFormData;

export type Gender = AssessmentFormData["gender"];
export type AcademicLevel = AssessmentFormData["academic_level"];
export type Platform = AssessmentFormData["most_used_platform"];
export type Purpose = AssessmentFormData["purpose_of_use"];
export type StressLevel = AssessmentFormData["stress_level"];

export interface PredictionResponse {
  predicted_mental_health_score: number;
}
