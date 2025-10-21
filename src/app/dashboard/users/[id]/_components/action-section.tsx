import Iconify from "@/components/element/icons/iconify";
import Link from "next/link";
import styles from "./action-section.module.scss";
import { Button } from "@mantine/core";
import { USER_STATUS_E } from "@/types/extra-enums";

interface ActionSectionProps {
  status?: USER_STATUS_E;
  onBlacklist?: () => void;
  onActivate?: () => void;
}

const ActionSection = ({
  status,
  onBlacklist,
  onActivate,
}: ActionSectionProps) => {
  return (
    <div>
      <Link href="/dashboard/users" className={styles.back}>
        <Iconify icon="lucide:move-left" />
        <p>Back to Users</p>
      </Link>

      <div className={styles.details}>
        <h1>User Details</h1>
        <div className={styles["details-actions"]}>
          {status !== USER_STATUS_E.BLACKLISTED && (
            <Button
              variant="outline"
              color="var(--error-color)"
              onClick={onBlacklist}
            >
              Blacklist User
            </Button>
          )}

          {status !== USER_STATUS_E.ACTIVE && (
            <Button variant="outline" onClick={onActivate}>
              Active User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionSection;
