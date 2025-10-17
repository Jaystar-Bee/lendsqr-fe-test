"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./imageSection.module.scss";

const ImageSection = () => {
  const [src, setSrc] = useState("/images/sign-in-banner.webp");

  return (
    <div className={styles.imageCover}>
      <Image
        src={src}
        alt="banner"
        fill={true}
        onError={() => setSrc("/images/sign-in-banner.png")}
      />
    </div>
  );
};

export default ImageSection;
