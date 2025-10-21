"use client";
import ActionSection from "./_components/action-section";
import OverviewSection from "./_components/overview-section";
import GeneralDetails from "./_components/general-details";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { USER_DATA_T } from "@/types/user-types";
import { useRouter, useParams } from "next/navigation";
import { useIndexedDBUsers } from "@/hooks/useUserDB";
import { notifications } from "@mantine/notifications";
import { USER_STATUS_E } from "@/types/extra-enums";
import { Box, LoadingOverlay } from "@mantine/core";

const UserDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const { ready, getUserById, patchUser } = useIndexedDBUsers();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<USER_DATA_T>();
  useEffect(() => {
    if (!ready || user) return;
    (async () => {
      try {
        const user = await getUserById(id as string);
        if (user) {
          setUser(user);
        } else {
          notifications.show({
            title: "User not found",
            message: "Please check the user id",
            color: "red",
          });
          router.push("/dashboard/users");
        }
      } catch (error) {
        notifications.show({
          title: "User not found",
          message: error?.toString(),
          color: "red",
        });
        router.push("/dashboard/users");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getUserById, router, ready, id, user]);

  function handleBlacklist() {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: USER_STATUS_E.BLACKLISTED,
      };
    });
    patchUser(id as string, { status: USER_STATUS_E.BLACKLISTED });
  }
  function handleActivate() {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: USER_STATUS_E.ACTIVE,
      };
    });
    patchUser(id as string, { status: USER_STATUS_E.ACTIVE });
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Box pos="relative" className={styles.loader}>
          <LoadingOverlay
            visible={true}
            zIndex={1}
            overlayProps={{ blur: 60 }}
            loaderProps={{ type: "bars" }}
          />
        </Box>
      ) : (
        <>
          <section>
            <ActionSection
              status={user?.status}
              onBlacklist={() => handleBlacklist()}
              onActivate={() => handleActivate()}
            />
          </section>
          <section>
            <OverviewSection
              userName={user?.personal_information?.full_name}
              userCode={user?.user_code}
              tierStars={user?.tier_stars}
              accountBalance={user?.account_balance}
              bankAccount={user?.bank_account}
            />
          </section>
          <section>
            <GeneralDetails
              personal_information={user?.personal_information}
              education_and_employment={user?.education_and_employment}
              socials={user?.socials}
              guarantors={user?.guarantors}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
