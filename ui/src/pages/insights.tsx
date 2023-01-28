import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import getInsights from "../api/get-insights";
import Alert from "../components/alert";
import FileUploader from "../components/file-uploader";
import Insight from "../components/insight";
import Layout from "../components/layout";

export default function Insights() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["insights"],
    queryFn: getInsights,
  });

  return (
    <Layout title="Insights">
      <div className="flex flex-col mt-8 space-y-4">
        {isLoading && <Alert variant="info" text="Fetching insights..." />}
        {error ? (
          <Alert variant="danger" text="Failed to get insights" />
        ) : null}
        {data?.map(
          (
            {
              _id,
              filename,
              nouns,
              wordcount,
              pronouns,
              adjectives,
              adverbs,
              sentences,
            },
            i
          ) => (
            <div
              key={i}
              className="flex flex-col mx-auto border lg:w-2/3 md:h-3/4 w-full rounded-t-md"
            >
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4">
                <p>{filename}</p>
                <small>
                  <strong>{wordcount} Words</strong>
                </small>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 p-4">
                <div className="flex flex-col space-y-3 items-center border hover:border-2 py-8">
                  <p className="mb-0 font-bold">NOUNS</p>
                  <p className="mb-0">
                    {nouns} ({Math.round((nouns / sentences) * 100)}%)
                  </p>
                </div>
                <div className="flex flex-col space-y-3 items-center border hover:border-2 py-8">
                  <p className="mb-0 font-bold">PRONOUNS</p>
                  <p className="mb-0">
                    {pronouns} ({Math.round((pronouns / sentences) * 100)}%)
                  </p>
                </div>
                <div className="flex flex-col space-y-3 items-center border hover:border-2 py-8">
                  <p className="mb-0 font-bold">ADJECTIVES</p>
                  <p className="mb-0">
                    {adjectives} ({Math.round((adjectives / sentences) * 100)}%)
                  </p>
                </div>
                <div className="flex flex-col space-y-3 items-center border hover:border-2 py-8">
                  <p className="mb-0 font-bold">ADVERBS</p>
                  <p className="mb-0">
                    {adverbs} ({Math.round((adverbs / sentences) * 100)}%)
                  </p>
                </div>
              </div>
              <Insight id={_id} totalItems={sentences} />
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
