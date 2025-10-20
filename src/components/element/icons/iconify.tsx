import { CSSProperties } from "react";
import { Icon } from "@iconify/react";

interface PropsType {
  icon: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;

}
const Iconify = ({ icon, className, style, onClick }: PropsType) => {
  return <Icon icon={icon} className={className} style={style} onClick={onClick} />;
};

export default Iconify;
