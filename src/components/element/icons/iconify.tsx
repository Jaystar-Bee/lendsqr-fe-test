import React from "react";
import { Icon } from "@iconify/react";

interface PropsType {
  icon: string;
  className?: string;
}
const Iconify = ({ icon, className }: PropsType) => {
  return <Icon icon={icon} className={className} />;
};

export default Iconify;
