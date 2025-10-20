import { Button, Modal } from "@mantine/core";
import Iconify from "../element/icons/iconify";
import styles from "./confirm-modal.module.scss";

interface PropsType {
  opened: boolean;
  title?: string;
  description?: string;
  color?: string;
  close: () => void;
  confirm?: () => void;
}
const ConfirmModal = ({
  opened,
  title = "Are you sure?",
  description,
  color,
  close,
  confirm,
}: PropsType) => {
  return (
    <Modal opened={opened} onClose={close} centered>
      <div className={styles.container}>
        <Iconify icon="typcn:info" className={`${styles.icon} ${color ? styles[color] : ""}`} />
        <div className={styles.content}>
          <h1 className={styles["content-title"]}>{title}</h1>
          {description && <p className={styles["content-description"]}>{description}</p>}
        </div>
        <div className={styles.actions}>
          <Button variant="outline" color="var(--subtitle-color)" size="md" onClick={close} fullWidth>
            Cancel
          </Button>
          <Button size="md" onClick={confirm} fullWidth color={color || ""}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
