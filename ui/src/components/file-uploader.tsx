import { useRef, DragEvent, ChangeEvent, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Alert from "./alert";

type Props = {
  file: FileList | null;
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>;
};

export default function FileUploader({ file, setFile }: Props) {
  const fileInputRef = useRef<any>();

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };
  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setFile(ev.dataTransfer.files);
  };

  return (
    <div className="flex flex-col space-y-9 lg:w-1/2 md:w-2/3 w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center space-y-7 py-10 bg-gray-100 border border-gray-400 border-dashed rounded"
      >
        <button
          onClick={() => fileInputRef!.current!.click()}
          className="group w-1/4 mx-auto mt-4 relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <PlusIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          UPLOAD
        </button>
        <small className="text-gray-500">or</small>
        <p>Drag N Drop file here</p>
        <input
          type="file"
          name="file"
          id="file"
          hidden
          ref={fileInputRef}
          onChange={(ev) => setFile(ev.target.files)}
          accept="text/plain"
        />
      </div>
      {file && (
        <Alert
          variant="info"
          text={file[0].name}
          closeFunc={() => setFile(null)}
        />
      )}
    </div>
  );
}
