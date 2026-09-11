import { StudentData, PredictionResponse } from "@/types/assessment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function predictMentalHealth(
  data: StudentData,
): Promise<PredictionResponse> {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const error = await response.json();

      if (error?.detail) {
        message =
          typeof error.detail === "string" ? error.detail : "Invalid input.";
      }
    } catch {}

    throw new Error(message);
  }

  return response.json();
}
