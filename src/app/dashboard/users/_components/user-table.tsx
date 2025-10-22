"use client";
import Iconify from "@/components/element/icons/iconify";
import { Table, Menu, Popover } from "@mantine/core";
import ConfirmModal from "@/components/ui/confirm-modal";
import moment from "moment";
import styles from "./user-table.module.scss";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UserFilter from "./user-filter";
import { USER_STATUS_E } from "@/types/extra-enums";
import { USER_DATA_T } from "@/types/user-types";
import { useSearchParams } from "next/navigation";
import TableEmptyState from "@/components/ui/table-empty-state";

interface SelectedElementProps {
  id: string;
  organisation: string;
  type: USER_STATUS_E;
  modal: {
    title: string;
    description: string;
    color?: string;
    close: () => void;
    confirm: () => void;
  };
}
const UserTable = ({
  users,
  isLoading,
  onUpdateStatus,
}: {
  users: USER_DATA_T[];
  isLoading?: boolean;
  onUpdateStatus: (id: string, user: Partial<USER_DATA_T>) => void;
}) => {
  const searchParams = useSearchParams();

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedActionElement, setSelectedActionElement] =
    useState<SelectedElementProps | null>(null);
  const router = useRouter();

  function handleConfirm() {
    if (onUpdateStatus) {
      setIsUpdatingStatus(true);
      onUpdateStatus(selectedActionElement?.id || "", {
        status: selectedActionElement?.type,
      });
    }

    setTimeout(() => {
      setIsUpdatingStatus(false);
    }, 1000);
    setOpenConfirmModal(false);
  }

  const Filter = () => {
    const [opened, setOpened] = useState(false);
    return (
      <Popover width={270} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <div onClick={() => setOpened(!opened)}>
            <Iconify icon="bx:filter" />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <UserFilter />
        </Popover.Dropdown>
      </Popover>
    );
  };

  const moreActions = (element: USER_DATA_T) => {
    return [
      {
        label: "View Details",
        icon: (
          <Iconify
            icon="formkit:eye"
            className={styles.more}
            style={{ fontSize: "17px" }}
          />
        ),
        onClick: () => {
          router.push(`/dashboard/users/${element?.id}`);
        },
      },
      element?.status !== USER_STATUS_E.BLACKLISTED && {
        label: "Blacklist User",
        icon: (
          <Iconify
            icon="eva:person-delete-outline"
            className={styles.more}
            style={{ fontSize: "17px" }}
          />
        ),
        onClick: () => {
          setSelectedActionElement({
            id: element?.id,
            organisation: element?.organization,
            type: USER_STATUS_E.BLACKLISTED,
            modal: {
              title: "Are you sure?",
              description: "Are you sure you want to blacklist this user?",
              color: "red",
              close: () => setOpenConfirmModal(false),
              confirm: () => setOpenConfirmModal(false),
            },
          });
          setOpenConfirmModal(true);
        },
      },
      element?.status !== USER_STATUS_E.ACTIVE && {
        label: "Activate User",
        icon: (
          <Iconify
            icon="akar-icons:person-check"
            className={styles.more}
            style={{ fontSize: "17px" }}
          />
        ),
        onClick: () => {
          setSelectedActionElement({
            id: element?.id,
            organisation: element?.organization,
            type: USER_STATUS_E.ACTIVE,
            modal: {
              title: "Are you sure?",
              description: "Are you sure you want to activate this user?",
              close: () => setOpenConfirmModal(false),
              confirm: () => setOpenConfirmModal(false),
            },
          });
          setOpenConfirmModal(true);
        },
      },
    ];
  };

  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (!isUpdatingStatus) {
      if (tableRef.current) {
        tableRef.current.scroll({ top: 0, behavior: "smooth" });
      }

      const main = document.getElementById("dashboard-main");
      if (main && main.scrollTop > 500) {
        // for mobile
        if (window.innerWidth < 420) {
          main.scroll({ top: 500, behavior: "smooth" });
        } else {
          main.scroll({ top: 300, behavior: "smooth" });
        }
      }
    }
  }, [searchParams, isUpdatingStatus, users]);

  const rows = users?.map((user) => (
    <Table.Tr
      key={user?.id}
      onClick={() => router.push(`/dashboard/users/${user?.id}`)}
    >
      <Table.Td className={styles["body-td"]}>{user?.organization}</Table.Td>
      <Table.Td className={styles["body-td"]}>
        {user?.personal_information?.full_name}
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
        {user?.personal_information?.email}
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
        {user?.personal_information?.phone_number}
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
        {moment(user?.created_at).format("MMM DD, YYYY hh:mm A")}
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
        <div
          className={styles.status}
          style={{
            backgroundColor:
              user?.status === USER_STATUS_E.ACTIVE
                ? "rgba(57, 205, 98, 0.06)"
                : user?.status === USER_STATUS_E.BLACKLISTED
                ? "rgba(228, 3, 59, 0.1)"
                : user?.status === USER_STATUS_E.INACTIVE
                ? "rgba(84, 95, 125, 0.06)"
                : "rgba(233, 178, 0, 0.1)",
            color:
              user?.status === USER_STATUS_E.ACTIVE
                ? "rgb(57, 205, 98)"
                : user?.status === USER_STATUS_E.BLACKLISTED
                ? "rgb(228, 3, 59)"
                : user?.status === USER_STATUS_E.INACTIVE
                ? "rgb(84, 95, 125)"
                : "rgb(233, 178, 0)",
          }}
        >
          {user?.status}
        </div>
      </Table.Td>
      <Table.Td
        className={styles["body-td"]}
        onClick={(e) => e.stopPropagation()}
      >
        <Menu
          shadow="md"
          position="bottom-end"
          transitionProps={{ transition: "rotate-right", duration: 150 }}
          width={180}
        >
          <Menu.Target>
            <div>
              <Iconify
                icon="nrk:more"
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            {moreActions(user)
              ?.filter((item) => typeof item === "object")
              ?.map((action) => (
                <Menu.Item
                  key={action?.label}
                  leftSection={action?.icon}
                  onClick={action.onClick}
                >
                  <span className={styles.more}>{action?.label}</span>
                </Menu.Item>
              ))}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div ref={tableRef} className={styles.table}>
      <Table verticalSpacing="lg" stickyHeader highlightOnHover stickyHeaderOffset={0}>
        <Table.Thead>
          <Table.Tr
            className={styles.head}
            style={{
              borderBottom: "none",
            }}
          >
            <Table.Th className={styles["head-th"]}>
              <span>Organization</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Username</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Email</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Phone Number</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Date Joined</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Status</span>
              <Filter />
            </Table.Th>
            <Table.Th className={styles["head-th"]}></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {!isLoading && (!users || users?.length === 0) && <TableEmptyState />}
      <ConfirmModal
        opened={openConfirmModal}
        title={selectedActionElement?.modal?.title}
        description={selectedActionElement?.modal?.description}
        color={selectedActionElement?.modal?.color}
        close={() => setOpenConfirmModal(false)}
        confirm={() => handleConfirm()}
      />
    </div>
  );
};

export default UserTable;
