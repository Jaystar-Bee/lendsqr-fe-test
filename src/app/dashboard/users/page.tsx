import CardSection from './_components/card-section'
import UserTable from './_components/user-table'
import styles from './page.module.scss'

const UserPage = () => {
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <section>
        <CardSection />
      </section>

      <section className={styles.table}>
        <UserTable />
      </section>
    </div>
  )
}

export default UserPage