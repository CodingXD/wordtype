import fetcher from "./instance";

export default async function analyzeText(formData: FormData) {
  const { status } = await fetcher.post("/analyze-text", formData);
  return status;
}
