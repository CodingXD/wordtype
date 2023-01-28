type Props = {
  text: string;
};

export default function Badge({ text }: Props) {
  return <p className="text-sm px-2 py-1 bg-gray-200 rounded-md">{text}</p>;
}
