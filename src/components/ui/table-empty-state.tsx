"use client";
import {Button, Stack, Center } from "@mantine/core";
import Iconify from "../element/icons/iconify";
import styles from "./table-empty-state.module.scss";


interface PropsType {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const TableEmptyState = ({
  title = "No data available",
  description = "Try adjusting your filters or adding a new record.",
  actionLabel,
  onAction,
}: PropsType) => {
  return (
    <Center data-testid="table-empty-state" p="xl" className={styles.container}>
      <Stack align="center" gap="xs">
          <Iconify
            icon="mdi:database-off-outline"
            className={styles.icon}
          />

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

        {actionLabel && (
          <Button mt="sm" variant="light" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Center>
  );
}

export default TableEmptyState;
