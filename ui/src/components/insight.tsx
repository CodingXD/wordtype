import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getInsight from "../api/get-insight";
import Badge from "./badge";

type Props = {
  id: string;
  totalItems: number;
};

export default function Insight({ id, totalItems }: Props) {
  const [limit, setLimit] = useState(4);
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["insight", id, limit],
    queryFn: () => getInsight(id, limit),
  });

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between">
        <small>{totalItems} sentences</small>
        <small>Showing {limit} sentences</small>
      </div>
      <div className="flex flex-col space-y-4">
        {data.map(({ text, nouns, pronouns, adjectives, adverbs }, i) => (
          <div key={i} className="border p-2">
            <p>
              <em>{text}</em>
            </p>
            <div className="flex items-center my-2">
              <p className="text-sm mr-2">
                <strong>Nouns</strong>
              </p>
              <div className="flex space-x-2">
                {nouns.map((str, j) => (
                  <Badge key={j} text={str} />
                ))}
              </div>
            </div>
            <div className="flex items-center my-2">
              <p className="text-sm mr-2">
                <strong>Pronouns</strong>
              </p>
              <div className="flex space-x-2">
                {pronouns.map((str, j) => (
                  <Badge key={j} text={str} />
                ))}
              </div>
            </div>
            <div className="flex items-center my-2">
              <p className="text-sm mr-2">
                <strong>Adjectives</strong>
              </p>
              <div className="flex space-x-2">
                {adjectives.map((str, j) => (
                  <Badge key={j} text={str} />
                ))}
              </div>
            </div>
            <div className="flex items-center my-2">
              <p className="text-sm mr-2">
                <strong>Adverbs</strong>
              </p>
              <div className="flex space-x-2">
                {adverbs.map((str, j) => (
                  <Badge key={j} text={str} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setLimit(limit + 4)} className="bg-transparent">
          See more
        </button>
      </div>
    </div>
  );
}
