import FormSection from "@/components/ui/login/form-section";
import styles from "./page.module.scss";
import ImageSection from "@/components/ui/login/image-section";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles["logo-cover"]}>
          <div className={styles["logo-cover--image"]}>
            <Image src="/icons/logo.svg" alt="logo" width={173} height={36} />
          </div>
        </div>
        <div className={styles.imageSection + " screen-height"}>
          <ImageSection />
        </div>

        <div className={styles.form + " screen-height"}>
          <FormSection />
        </div>
      </div>
    </main>
  );
}
