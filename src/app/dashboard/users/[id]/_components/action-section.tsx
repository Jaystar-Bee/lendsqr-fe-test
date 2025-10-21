import Iconify from "@/components/element/icons/iconify";
import Link from "next/link";
import styles from "./action-section.module.scss";
import { Button } from "@mantine/core";
import { USER_STATUS_E } from "@/types/extra-enums";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useState } from "react";

interface ActionSectionProps {
  status?: USER_STATUS_E;
  onBlacklist: () => void;
  onActivate: () => void;
}

interface ConfirmModalProps {
  title: string;
  type: USER_STATUS_E;
  description: string;
  color?: string;
  close: () => void;
  confirm: () => void;
}

const ActionSection = ({
  status,
  onBlacklist,
  onActivate,
}: ActionSectionProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedActionElement, setSelectedActionElement] =
    useState<ConfirmModalProps | null>(null);

  function handleSetAction(type: USER_STATUS_E) {
    setSelectedActionElement({
      title: "Are you sure?",
      description: `Are you sure you want to ${
        type === USER_STATUS_E.BLACKLISTED ? "blacklist" : "activate"
      } this user?`,
      color: type === USER_STATUS_E.BLACKLISTED ? "red" : undefined,
      type,
      close: () => setOpenConfirmModal(false),
      confirm: () => setOpenConfirmModal(false),
    });
    setOpenConfirmModal(true);
  }

  function handleConfirm() {
    if (selectedActionElement?.type === USER_STATUS_E.BLACKLISTED) {
      onBlacklist();
    } else if (selectedActionElement?.type === USER_STATUS_E.ACTIVE) {
      onActivate();
    }

    setOpenConfirmModal(false);
  }
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
              onClick={() => handleSetAction(USER_STATUS_E.BLACKLISTED)}
            >
              Blacklist User
            </Button>
          )}
          {status !== USER_STATUS_E.ACTIVE && (
            <Button
              variant="outline"
              onClick={() => handleSetAction(USER_STATUS_E.ACTIVE)}
            >
              Active User
            </Button>
          )}
        </div>
      </div>
      <ConfirmModal
        opened={openConfirmModal}
        title={selectedActionElement?.title}
        description={selectedActionElement?.description}
        color={selectedActionElement?.color}
        close={() => setOpenConfirmModal(false)}
        confirm={handleConfirm}
      />
    </div>
  );
};

export default ActionSection;
