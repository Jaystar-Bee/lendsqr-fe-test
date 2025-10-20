"use client";
import Iconify from "@/components/element/icons/iconify";
import { USER_STATUS_E } from "@/types/extra-enums";
import { Table, Menu } from "@mantine/core";
import ConfirmModal from "@/components/ui/confirm-modal";
import moment from "moment";
import styles from "./user-table.module.scss";
import { useState } from "react";
import UserFilter from "./user-filter";

const elements = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "01/01/2023",
    status: USER_STATUS_E.ACTIVE,
  },
  {
    id: "2",
    organization: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phoneNumber: "07060780922",
    dateJoined: "04/01/2024",
    status: USER_STATUS_E.INACTIVE,
  },
  {
    id: "3",
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07003309226",
    dateJoined: "04/04/2024",
    status: USER_STATUS_E.PENDING,
  },
  {
    id: "4",
    organization: "Lendsqr",
    username: "Grace Effiom",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "01/01/2023",
    status: USER_STATUS_E.BLACKLISTED,
  },
];

interface SelectedElementProps {
  id: string;
  organisation: string;
  type: string;
  modal: {
    title: string;
    description: string;
    color?: string;
    close: () => void;
    confirm: () => void;
  };
}
const UserTable = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedActionElement, setSelectedActionElement] =
    useState<SelectedElementProps | null>(null);

  function handleConfirm() {
    setOpenConfirmModal(false);
  }

  const moreActions = (element: (typeof elements)[0]) => {
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
          console.log("View User");
          console.log(element);
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
            id: "1",
            organisation: "Lendsqr",
            type: "blacklist",
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
          console.log("Activate User");
          setSelectedActionElement({
            id: "1",
            organisation: "Lendsqr",
            type: "activate",
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

  const rows = elements.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td className={styles["body-td"]}>{element?.organization}</Table.Td>
      <Table.Td className={styles["body-td"]}>{element?.username}</Table.Td>
      <Table.Td className={styles["body-td"]}>{element?.email}</Table.Td>
      <Table.Td className={styles["body-td"]}>{element?.phoneNumber}</Table.Td>
      <Table.Td className={styles["body-td"]}>
        {moment(element?.dateJoined).format("MMM DD, YYYY hh:mm A")}
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
        <div
          className={styles.status}
          style={{
            backgroundColor:
              element?.status === USER_STATUS_E.ACTIVE
                ? "rgba(57, 205, 98, 0.06)"
                : element?.status === USER_STATUS_E.BLACKLISTED
                ? "rgba(228, 3, 59, 0.1)"
                : element?.status === USER_STATUS_E.INACTIVE
                ? "rgba(84, 95, 125, 0.06)"
                : "rgba(233, 178, 0, 0.1)",
            color:
              element?.status === USER_STATUS_E.ACTIVE
                ? "rgb(57, 205, 98)"
                : element?.status === USER_STATUS_E.BLACKLISTED
                ? "rgb(228, 3, 59)"
                : element?.status === USER_STATUS_E.INACTIVE
                ? "rgb(84, 95, 125)"
                : "rgb(233, 178, 0)",
          }}
        >
          {element?.status}
        </div>
      </Table.Td>
      <Table.Td className={styles["body-td"]}>
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
            {moreActions(element)
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
    <div>
      <Table verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr
            className={styles.head}
            style={{
              borderBottom: "none",
            }}
          >
            <Table.Th className={styles["head-th"]}>
              <span>Organization</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Username</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Email</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Phone Number</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Date Joined</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <span>Status</span>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <UserFilter />
      <ConfirmModal
        opened={openConfirmModal}
        title={selectedActionElement?.modal?.title}
        description={selectedActionElement?.modal?.description}
        color={selectedActionElement?.modal?.color}
        close={() => setOpenConfirmModal(false)}
        confirm={handleConfirm}
      />
    </div>
  );
};

export default UserTable;
