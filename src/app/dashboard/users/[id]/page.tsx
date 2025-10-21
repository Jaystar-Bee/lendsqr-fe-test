"use client";
import ActionSection from "./_components/action-section";
import OverviewSection from "./_components/overview-section";
import GeneralDetails from "./_components/general-details";
import styles from "./page.module.scss";

const UserDetailPage = () => {
  function handleBlacklist() {
    console.log("blacklist");
  }
  function handleActivate() {
    console.log("activate");
  }
  return (
    <div className={styles.container}>
      <section>
        <ActionSection
          onBlacklist={() => handleBlacklist()}
          onActivate={() => handleActivate()}
        />
      </section>
      <section>
        <OverviewSection />
      </section>
      <section>
        <GeneralDetails />
      </section>
    </div>
  );
};

export default UserDetailPage;
