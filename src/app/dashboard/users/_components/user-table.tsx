"use client";
import Iconify from "@/components/element/icons/iconify";
import { USER_STATUS_E } from "@/types/extra-enums";
import { Table } from "@mantine/core";
import moment from "moment";
import styles from "./user-table.module.scss";

const elements = [
  {
    key: "1",
    organization: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "01/01/2023",
    status: USER_STATUS_E.ACTIVE,
  },
  {
    key: "2",
    organization: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phoneNumber: "07060780922",
    dateJoined: "04/01/2024",
    status: USER_STATUS_E.INACTIVE,
  },
  {
    key: "3",
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07003309226",
    dateJoined: "04/04/2024",
    status: USER_STATUS_E.PENDING,
  },
  {
    key: "4",
    organization: "Lendsqr",
    username: "Grace Effiom",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "01/01/2023",
    status: USER_STATUS_E.BLACKLISTED,
  },
];
const UserTable = () => {
  const tdStyle = {
    color: "var(--subtitle-color)",
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element?.key}>
      <Table.Td style={tdStyle}>{element?.organization}</Table.Td>
      <Table.Td style={tdStyle}>{element?.username}</Table.Td>
      <Table.Td style={tdStyle}>{element?.email}</Table.Td>
      <Table.Td style={tdStyle}>{element?.phoneNumber}</Table.Td>
      <Table.Td style={tdStyle}>
        {moment(element?.dateJoined).format("MMM DD, YYYY hh:mm A")}
      </Table.Td>
      <Table.Td style={tdStyle}>
        <div>{element?.status}</div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr className={styles.head}>
            <Table.Th className={styles["head-th"]}>
              <p>Organization</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <p>Username</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <p>Email</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <p>Phone Number</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <p>Date Joined</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
            <Table.Th className={styles["head-th"]}>
              <p>Status</p>
              <Iconify icon="fluent:filter-24-filled" />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default UserTable;
