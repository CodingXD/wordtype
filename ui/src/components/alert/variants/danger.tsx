import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  text: string;
};

export default function Danger({ text }: Props) {
  return (
    <div className="bg-red-400 flex justify-between items-center lg:w-1/2 md:w-2/3 w-full rounded py-2">
      <p className="pl-4">{text}</p>
      <ExclamationCircleIcon className="w-8 h-8 pr-4 fill-red-800" />
    </div>
  );
}
