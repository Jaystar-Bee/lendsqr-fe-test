import Image from "next/image";
import styles from "./card-section.module.scss";
import { useEffect, useState } from "react";
import Iconify from "@/components/element/icons/iconify";

const cardList = [
  {
    title: "Users",
    count: 2453,
    icon: "/icons/users/users.svg",
    color: "rgba(223, 24, 255, 0.1)",
  },
  {
    title: "Active Users",
    count: 2453,
    icon: "/icons/users/active-users.svg",
    color: "rgba(87, 24, 255, 0.1)",
  },
  {
    title: "Users With Loans",
    count: 12453,
    icon: "/icons/users/users-with-loans.svg",
    color: "rgba(245, 95, 68, 0.1)",
  },
  {
    title: "Users With Savings",
    count: 102453,
    icon: "/icons/users/users-with-savings.svg",
    color: "rgba(255, 51, 102, 0.1)",
  },
];

interface PropsType {
  activeUsers: number;
  allUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
  loading?: boolean;
}

const CardSection = ({
  activeUsers,
  allUsers,
  usersWithLoans,
  usersWithSavings,
  loading,
}: PropsType) => {
  const [cardListUpdated, setCardListUpdated] = useState(cardList);

  useEffect(() => {
    const updatedCardList = cardList.map((item) => {
      if (item.title === "Active Users") {
        return { ...item, count: activeUsers };
      }
      if (item.title === "Users") {
        return { ...item, count: allUsers };
      }
      if (item.title === "Users With Loans") {
        return { ...item, count: usersWithLoans };
      }
      if (item.title === "Users With Savings") {
        return { ...item, count: usersWithSavings };
      }
      return item;
    });
    setCardListUpdated(updatedCardList);
  }, [activeUsers, allUsers, usersWithLoans, usersWithSavings]);
  return (
    <div>
      <ul className={styles.container}>
        {cardListUpdated.map((item, index) => (
          <li key={index}>
            <div className={styles.card}>
              <div
                className={styles["card-icon"]}
                style={{ backgroundColor: item.color }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={16}
                  height={22}
                />
              </div>
              <div className={styles["card-content"]}>
                <h3>{item.title}</h3>
                {loading ? (
                  <div className={styles.loading}>
                    <Iconify icon="eos-icons:bubble-loading" />
                  </div>
                ) : (
                  <h1>{item.count?.toLocaleString()}</h1>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardSection;
