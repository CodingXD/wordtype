import Danger from "./variants/danger";
import Info from "./variants/info";

type Props = {
  text: string;
  closeFunc?: React.MouseEventHandler<SVGSVGElement>;
  variant: "info" | "danger";
};

export default function Alert(props: Props) {
  if (props.variant === "info") {
    return <Info {...props} />;
  } else if (props.variant === "danger") {
    return <Danger {...props} />;
  }

  return null;
}
