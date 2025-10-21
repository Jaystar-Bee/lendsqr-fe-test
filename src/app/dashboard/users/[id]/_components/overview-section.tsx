"use client";
import React, { useState } from "react";
import styles from "./overview-section.module.scss";
import Iconify from "@/components/element/icons/iconify";
import { Rating, Tabs } from "@mantine/core";

const tabList = [
  {
    label: "General Details",
    value: "general_details",
  },
  {
    label: "Documents",
    value: "documents",
  },
  {
    label: "Band Details",
    value: "band_details",
  },
  {
    label: "Loans",
    value: "loans",
  },
  {
    label: "Savings",
    value: "savings",
  },
  {
    label: "App and System",
    value: "app_and_system",
  },
];

const OverviewSection = () => {
  const [activeTab, setActiveTab] = useState<string | null>("general_details");
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles["details-profile"]}>
          <div className={styles["details-profile--image"]}>
            <Iconify icon="uil:user" />
          </div>
          <div className={styles["details-profile--info"]}>
            <h1>Grace Effiom</h1>
            <p>LSQFf587g90</p>
          </div>
        </div>
        <div className={styles["details-divide"]}></div>

        <div className={styles["details-rating"]}>
          <h2>User&apos;s Tier</h2>
          <Rating value={3} readOnly count={3} />
        </div>
        <div className={styles["details-divide"]}></div>
        <div className={styles["details-balance"]}>
          <h2>₦200,000.00</h2>
          <p>9912345678/Providus Bank</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          classNames={{
            root: styles["tabs-root"],
            list: styles["tabs-list"],
            tab: styles["tabs-tab"],
          }}
        >
          <Tabs.List grow>
            {tabList.map((item) => (
              <Tabs.Tab value={item.value} key={item.value}>
                {item.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>
    </div>
  );
};

export default OverviewSection;
