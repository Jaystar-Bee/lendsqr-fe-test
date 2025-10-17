import styles from "./page.module.scss";
import ImageSection from "@/components/ui/login/image-section";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.imageSection + " screen-height"}>
          <ImageSection />
        </div>

        <div className={styles.form}>
          <h1>Log in</h1>
        </div>
      </div>
    </main>
  );
}
