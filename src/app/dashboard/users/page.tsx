"use client";
import { Pagination } from "@mantine/core";
import CardSection from "./_components/card-section";
import UserTable from "./_components/user-table";
import styles from "./page.module.scss";
import { useState } from "react";
import { NativeSelect } from "@mantine/core";
import Iconify from "@/components/element/icons/iconify";

const UserPage = () => {
  const [activePage, setPage] = useState(1);
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <section>
        <CardSection />
      </section>

      <section className={styles.table}>
        <UserTable />
      </section>

      <section className={styles.pagination}>
        <div className={styles["pagination-info"]}>
          <span>Showing</span>
          <NativeSelect variant="filled" data={["10", "20", "50", "100"]} classNames={{
            input: styles["pagination-info--select"],
          }} 
          rightSection={
            <Iconify icon="ep:arrow-down-bold" />
          }
          />
          <span>out of 100</span>
        </div>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={10}
          boundaries={1}
          siblings={1}
          classNames={{
            control: styles["pagination-control"],
            dots: styles["pagination-dots"],
          }}
        ></Pagination>
      </section>
    </div>
  );
};

export default UserPage;
