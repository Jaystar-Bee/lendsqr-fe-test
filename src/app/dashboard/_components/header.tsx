"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";
import InputGroup from "@/components/element/form/input-group";
import Iconify from "@/components/element/icons/iconify";

const HeaderComp = () => {
  function handleSearch(search: string) {
    console.log(search);
  }
  return (
    <header>
      <div className={styles.header}>
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
              onSubmit={(search) => handleSearch(search)}
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
    </header>
  );
};

export default HeaderComp;
