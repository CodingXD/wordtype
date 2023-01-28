import fetcher from "./instance";

type Insight = {
  _id: string;
  filename: string;
  wordcount: number;
  nouns: number;
  pronouns: number;
  adjectives: number;
  adverbs: number;
  sentences: number;
};

export default async function getInsights() {
  const { data } = await fetcher.get("/get-insights");
  return data as Insight[];
}
