"use client";
import { Box, LoadingOverlay, Pagination } from "@mantine/core";
import CardSection from "./_components/card-section";
import UserTable from "./_components/user-table";
import styles from "./page.module.scss";
import { Suspense, useEffect, useState } from "react";
import { NativeSelect } from "@mantine/core";
import Iconify from "@/components/element/icons/iconify";
import { useMediaQuery } from "@mantine/hooks";
import { useIndexedDBUsers } from "@/hooks/useUserDB";
import { USER_DATA_T, USER_FILTER_T } from "@/types/user-types";
import { useSearchParams } from "next/navigation";
import moment from "moment";

const UserPageContent = () => {
  const searchParams = useSearchParams();

  const { ready, saveUsers, getAllUsers, patchUser } = useIndexedDBUsers();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<USER_DATA_T[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<USER_DATA_T[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState("100");
  const isSm = useMediaQuery("(max-width: 480px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [activePage, setPage] = useState(1);

  // METHODS
  function handleUpdateUserStatus(id: string, user: Partial<USER_DATA_T>) {
    setFilteredUsers((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...user };
        }
        return item;
      });
    });
    setUsers((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...user };
        }
        return item;
      });
    });
    patchUser(id, user);
  }

  useEffect(() => {
    const filters = {
      organization: searchParams.get("organization") || "",
      username: searchParams.get("username") || "",
      email: searchParams.get("email") || "",
      date: searchParams.get("date") || "",
      phoneNumber: searchParams.get("phoneNumber") || "",
      status:
        (searchParams.get("status") as USER_FILTER_T["status"]) || undefined,
    };
    setIsLoading(true);
    if (
      filters.status ||
      filters.date ||
      filters.email ||
      filters.phoneNumber ||
      filters.organization ||
      filters.username
    ) {
      const filtered = users.filter((user) => {
        return (
          (user.status
            ?.toLowerCase()
            ?.includes(filters.status?.toLowerCase()) ||
            !filters.status) &&
          (moment(user?.created_at).format("YYYY-MM-DD") ===
            moment(filters.date)?.format("YYYY-MM-DD") ||
            !filters.date) &&
          (user.personal_information?.email
            ?.toLowerCase()
            ?.includes(filters.email?.toLowerCase()) ||
            !filters.email) &&
          (user.personal_information?.phone_number
            ?.toLowerCase()
            ?.includes(filters.phoneNumber?.toLowerCase()) ||
            !filters.phoneNumber) &&
          (user.organization
            ?.toLowerCase()
            ?.includes(filters.organization?.toLowerCase()) ||
            !filters.organization) &&
          (user.personal_information?.full_name
            ?.toLowerCase()
            ?.includes(filters.username?.toLowerCase()) ||
            !filters.username)
        );
      });
      // sort by created_at
      setFilteredUsers(
        filtered?.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
      setPage(1);
    } else {
      setFilteredUsers(
        users?.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
      setPage(1);
    }
    setIsLoading(false);
  }, [searchParams, users]);

  // Init

  useEffect(() => {
    if (!ready) return;
    (async () => {
      try {
        const users = await getAllUsers();
        if (!users.length) {
          const response = await fetch("/jsons//users.json");
          const data = await response.json();
          await saveUsers(data);
          setUsers(data);
        } else {
          setUsers(users);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [ready, getAllUsers, saveUsers, setIsLoading]);

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <section>
        <CardSection />
      </section>

      <section className={styles.table}>
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ type: "bars" }}
          />
          <UserTable
            onUpdateStatus={handleUpdateUserStatus}
            users={filteredUsers?.slice(
              (activePage - 1) * Number(itemsPerPage),
              activePage * Number(itemsPerPage)
            )}
          />
        </Box>
      </section>

      <section className={styles.pagination}>
        <div className={styles["pagination-info"]}>
          <span>Showing</span>
          <NativeSelect
            variant="filled"
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(event.currentTarget.value)}
            data={["10", "20", "50", "100"]}
            classNames={{
              input: styles["pagination-info--select"],
            }}
            rightSection={<Iconify icon="ep:arrow-down-bold" />}
          />
          <span>out of {filteredUsers.length}</span>
        </div>
        <Pagination
          defaultValue={activePage}
          onChange={setPage}
          total={Math.ceil(filteredUsers.length / Number(itemsPerPage))}
          size={isSm ? "xs" : isLg ? "md" : "sm"}
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

const UserPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPageContent />
    </Suspense>
  );
};

export default UserPage;
