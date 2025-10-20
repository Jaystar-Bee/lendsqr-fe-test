"use client";
import Link from "next/link";
import styles from "./side-bar.module.scss";
import Image from "next/image";
import Iconify from "@/components/element/icons/iconify";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sidebarList } from "@/app/constants/dashboard-navs";

interface PropsType {
  onRouteClick?: (route: string) => void;
}

const SideBar = ({ onRouteClick }: PropsType) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLUListElement>(null);
  const [sectionIsAllVisible, setSectionIsAllVisible] = useState(false);
  const [sectionIsAtTop, setSectionIsAtTop] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = section;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const isTop = scrollTop === 0;
      if (isBottom) {
        setSectionIsAllVisible(true);
      } else {
        setSectionIsAllVisible(false);
      }
      if(isTop) {
        setSectionIsAtTop(true);
      } else {
        setSectionIsAtTop(false);
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
      <ul ref={sectionRef} className={`${styles.section} ${!sectionIsAtTop ? styles.shadow : ""}`}>
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
                    onClick={() => onRouteClick ? onRouteClick(link.link) : null}
                  >
                    {link?.icon?.includes("svg") ? (
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={16}
                        height={16}
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
