import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import analyzeText from "../api/analyze-text";
import Alert from "../components/alert";
import FileUploader from "../components/file-uploader";
import Layout from "../components/layout";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState<FileList | null>(null);
  const { mutate, isError, isLoading } = useMutation(analyzeText, {
    onSuccess: () => navigate("/insights"),
  });
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file![0]);
    mutate(formData);
  };

  return (
    <Layout title="WordType">
      <div className="flex justify-center mt-8 md:space-x-4 sm:space-y-0 space-y-8">
        <FileUploader file={file} setFile={setFile} />
      </div>
      <button
        onClick={handleUpload}
        className="group lg:w-1/2 md:w-2/3 w-full mx-auto my-4 relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronRightIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        {isLoading ? "Analyzing text..." : "Get Insights"}
      </button>
      <div className="flex justify-center">
        {isError && <Alert variant="danger" text="Upload failed" />}
      </div>
    </Layout>
  );
}
