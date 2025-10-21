import React, { ReactNode } from 'react'
import HeaderComp from './_components/header'
import styles from './layout.module.scss'
import SideBar from './_components/side-bar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HeaderComp />
      <div className={styles.container}>
        <div className={styles.sidebar}>
        <SideBar />
        </div>
        <div className={styles.main} id="dashboard-main">

      {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout