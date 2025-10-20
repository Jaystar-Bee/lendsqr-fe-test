"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";
import InputGroup from "@/components/element/form/input-group";
import Iconify from "@/components/element/icons/iconify";
import { useState } from "react";
import { Drawer } from "@mantine/core";
import SideBar from "./side-bar";
import { mobileProfileList } from "@/app/constants/profile-navs";

interface PropsType {
  className?: string;
  onSearch: (search: string) => void;
}



const DesktopHeader = ({ className, onSearch }: PropsType) => {
  return (
    <div className={styles.header + " " + className}>
      <div className={styles["header-logo"]}>
        <Image src="/icons/logo.svg" alt="logo" width={144} height={30} />
      </div>
      <div className={styles["header-nav"]}>
        <div className={styles["header-nav--search"]}>
          <InputGroup
            placeholder="Search for anything"
            id="general-search"
            name="search"
            buttonElement={<Iconify icon="tdesign:search" />}
            onSubmit={onSearch}
          />
        </div>
        <div className={styles["header-right"]}>
          <Link href="#">Docs</Link>
          <Iconify icon="uiw:bell" className={styles["header-right--icon"]} />
          <div className={styles.avatar}>
            <div className={styles["avatar-image"]}>
              <Image src="/images/user.svg" alt="avatar" fill />
            </div>
            <p>Adedeji</p>
            <Iconify icon="icon-park-solid:down-one" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileHeader = ({ className, onSearch }: PropsType) => {
  const [openedMenu, setOpenedMenu] = useState(false);
  const [openedProfile, setOpenedProfile] = useState(false);

  function handleSearch(search: string) {
    onSearch(search);
    setOpenedProfile(false);
  }
  return (
    <>
      <div className={styles.header + " " + className}>
        <div className={styles["avatar-image"]}>
          <Image
            src="/images/user.svg"
            alt="avatar"
            fill
            onClick={() => setOpenedProfile(true)}
          />
        </div>
        <Image src="/icons/logo-icon.svg" alt="logo" width={24} height={24} />
        <Iconify
          icon="heroicons-solid:menu-alt-3"
          className={styles["header-menu"]}
          onClick={() => setOpenedMenu(true)}
        />
        <Drawer
          opened={openedProfile}
          size="xs"
          onClose={() => setOpenedProfile(false)}
          title={
            <Image
              src="/icons/logo-icon.svg"
              alt="logo"
              width={24}
              height={24}
            />
          }
          className={styles.profile}
          position="left"
          classNames={{
            body: styles["profile-drawer--body"],
            content: styles["profile-drawer"],
          }}
        >
          <div className={styles["profile-drawer--content"]}>
            <div className={styles["header-nav--search"]}>
              <InputGroup
                placeholder="Search for anything"
                id="general-search"
                name="search"
                buttonElement={<Iconify icon="tdesign:search" />}
                onSubmit={handleSearch}
              />
            </div>

            <ul className={styles["profile-list"]}>
              {mobileProfileList.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={styles["profile-list--item"]}
                    onClick={() => setOpenedProfile(false)}
                  >
                      <Iconify icon={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Drawer>
      </div>
      <Drawer
        opened={openedMenu}
        size="xs"
        onClose={() => setOpenedMenu(false)}
        title={
          <Image src="/icons/logo-icon.svg" alt="logo" width={24} height={24} />
        }
        position="right"
        classNames={{
          body: styles["more-drawer--body"],
          content: styles["more-drawer"],
        }}
      >
        <SideBar onRouteClick={() => setOpenedMenu(false)} />
      </Drawer>
    </>
  );
};

const HeaderComp = () => {
  function handleSearch(search: string) {
    console.log(search);
  }
  return (
    <header>
      <DesktopHeader onSearch={handleSearch} className={styles.desktop} />
      <MobileHeader onSearch={handleSearch} className={styles.mobile} />
    </header>
  );
};

export default HeaderComp;
