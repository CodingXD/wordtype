import { TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  text: string;
  closeFunc?: React.MouseEventHandler<SVGSVGElement>;
};

export default function Info({ text, closeFunc }: Props) {
  return (
    <div className="bg-blue-400 flex justify-between items-center lg:w-1/2 md:w-2/3 w-full rounded py-2">
      <p className="pl-4">{text}</p>
      <TrashIcon
        onClick={closeFunc}
        className="w-8 h-8 pr-4 hover:fill-white fill-blue-800 cursor-pointer transition-colors duration-300 ease-in-out"
      />
    </div>
  );
}
