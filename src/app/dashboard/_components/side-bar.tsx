"use client";
import Link from "next/link";
import styles from "./side-bar.module.scss";
import Image from "next/image";
import Iconify from "@/components/element/icons/iconify";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sidebarList = [
  {
    links: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: "lets-icons:home-duotone",
      },
    ],
  },
  {
    title: "Customers",
    links: [
      {
        name: "Users",
        link: "/dashboard/users",
        icon: "/icons/sidebar/users.svg",
      },
      {
        name: "Guarantors",
        link: "/dashboard/guarantors",
        icon: "/icons/sidebar/guarantors.svg",
      },
      {
        name: "Loans",
        link: "/dashboard/loans",
        icon: "/icons/sidebar/loan.svg",
      },
      {
        name: "Decision Models",
        link: "/dashboard/decision-models",
        icon: "/icons/sidebar/models.svg",
      },
      {
        name: "Savings",
        link: "/dashboard/savings",
        icon: "/icons/sidebar/savings.svg",
      },
      {
        name: "Loan Requests",
        link: "/dashboard/loan-requests",
        icon: "/icons/sidebar/loan-requests.svg",
      },
      {
        name: "Whitelist",
        link: "/dashboard/whitelist",
        icon: "/icons/sidebar/whitelist.svg",
      },
      {
        name: "Karma",
        link: "/dashboard/karma",
        icon: "/icons/sidebar/karma.svg",
      },
    ],
  },
  {
    title: "Businesses",
    links: [
      {
        name: "Organization",
        link: "/dashboard/organization",
        icon: "/icons/sidebar/organization.svg",
      },
      {
        name: "Loan Products",
        link: "/dashboard/loan-products",
        icon: "/icons/sidebar/loan-requests.svg",
      },
      {
        name: "Savings Products",
        link: "/dashboard/savings-products",
        icon: "/icons/sidebar/savings-products.svg",
      },
      {
        name: "Fees and Charges",
        link: "/dashboard/fees-and-charges",
        icon: "/icons/sidebar/fees-and-charges.svg",
      },
      {
        name: "Transactions",
        link: "/dashboard/transactions",
        icon: "/icons/sidebar/transactions.svg",
      },
      {
        name: "Services",
        link: "/dashboard/services",
        icon: "/icons/sidebar/services.svg",
      },
      {
        name: "Service Account",
        link: "/dashboard/service-account",
        icon: "/icons/sidebar/service-account.svg",
      },
      {
        name: "Settlements",
        link: "/dashboard/settlements",
        icon: "/icons/sidebar/settlements.svg",
      },
      {
        name: "Reports",
        link: "/dashboard/reports",
        icon: "/icons/sidebar/reports.svg",
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        name: "Preferences",
        link: "/dashboard/preferences",
        icon: "/icons/sidebar/preferences.svg",
      },
      {
        name: "Fees and Pricing",
        link: "/dashboard/fees-and-pricing",
        icon: "/icons/sidebar/fees-and-pricing.svg",
      },
      {
        name: "Audit Logs",
        link: "/dashboard/audit-logs",
        icon: "/icons/sidebar/audit-logs.svg",
      },
    ],
  },
];
const SideBar = () => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLUListElement>(null);
  const [sectionIsAllVisible, setSectionIsAllVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = section;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
      if (isBottom) {
        setSectionIsAllVisible(true);
      } else {
        setSectionIsAllVisible(false);
      }
    };

    section.addEventListener("scroll", handleScroll);
    return () => section.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.organization}>
        <Image
          src="/icons/sidebar/switch.svg"
          alt="switch organization"
          width={16}
          height={16}
        />
        <p>Switch Organization</p>
        <Iconify icon="ep:arrow-down-bold" />
      </div>
      <ul ref={sectionRef} className={styles.section}>
        {sidebarList.map((item, index) => (
          <li key={index} className={styles["section-item"]}>
            {item.title && (
              <h3 className={styles["section-item--title"]}>{item.title}</h3>
            )}
            <ul className={styles.link}>
              {item.links.map((link, linkIndex) => (
                <li key={linkIndex} className={styles["link-item"]}>
                  <Link
                    href={link.link}
                    className={`${styles["link-item--link"]} ${
                      ((pathname?.includes(link.link) &&
                        link.link !== "/dashboard") ||
                        pathname === link.link) &&
                      styles["active"]
                    }`}
                  >
                    {link?.icon?.includes("svg") ? (
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={16}
                        height={12.8}
                      />
                    ) : (
                      <Iconify icon={link.icon} />
                    )}
                    <p>{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div
        className={`${styles.footer} ${
          !sectionIsAllVisible ? styles.shadow : ""
        }`}
      >
        <div className={styles["footer-logout"]}>
          <Image
            src="/icons/sidebar/logout.svg"
            alt="switch organization"
            width={16}
            height={16}
          />
          <p>Logout</p>
        </div>

        <p className={styles["footer-version"]}>v1.2.0</p>
      </div>
    </div>
  );
};

export default SideBar;
