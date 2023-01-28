import fetcher from "./instance";

type Sentence = {
  text: string;
  nouns: string[];
  pronouns: string[];
  adjectives: string[];
  adverbs: string[];
};

export default async function getInsight(id: string, limit: number) {
  const { data } = await fetcher.get(`/insights/${id}`, {
    params: { limit },
  });
  return data as Sentence[];
}
