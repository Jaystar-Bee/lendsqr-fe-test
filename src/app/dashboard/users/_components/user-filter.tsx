import { userFilterSchema } from "@/app/schemas/user-filter.schema";
import Iconify from "@/components/element/icons/iconify";
import { Button, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import styles from "./user-filter.module.scss";
import { useState } from "react";

const UserFilter = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    },
    validate: (values) => {
      const result = userFilterSchema.safeParse(values);
      if (!result.success) {
        return result.error.flatten().fieldErrors;
      }
      return {};
    },
  });

  function handleSubmit(values: typeof form.values) {
    console.log(values);
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
      <Select
        label="Organization"
        placeholder="Select"
        data={["React", "Angular", "Vue", "Svelte"]}
        rightSection={
          <Iconify
            icon="ep:arrow-down-bold"
            className={styles["form-control--icon"]}
          />
        }
        classNames={{
          label: styles["form-control--label"],
          input: styles["form-control--input"],
        }}
      />
      <TextInput
        mt={"lg"}
        label="Username"
        placeholder="User"
        classNames={{
          label: styles["form-control--label"],
          input: styles["form-control--input"],
        }}
      />
      <TextInput
        mt={"lg"}
        label="Email"
        placeholder="Email"
        type="email"
        classNames={{
          label: styles["form-control--label"],
          input: styles["form-control--input"],
        }}
      />
      <div className={styles["form-date"]}>
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Date"
          placeholder="Date input"
          classNames={{
            input: styles["form-date--input"],
            label: styles["form-control--label"],
          }}
        />
        <Iconify
          icon="zondicons:calendar"
          className={styles["form-date--icon"]}
        />
      </div>
      <TextInput
        mt={"lg"}
        label="Phone Number"
        placeholder="Phone Number"
        type="tel"
        classNames={{
          label: styles["form-control--label"],
          input: styles["form-control--input"],
        }}
      />

      <Select
        mt={"lg"}
        label="Status"
        placeholder="Select"
        data={["React", "Angular", "Vue", "Svelte"]}
        rightSection={
          <Iconify
            icon="ep:arrow-down-bold"
            className={styles["form-control--icon"]}
          />
        }
        classNames={{
          label: styles["form-control--label"],
          input: styles["form-control--input"],
        }}
      />

      <div className={styles["form-actions"]}>
        <Button
          type="reset"
          fullWidth
          className={styles["form-actions--btn"]}
          variant="outline"
          color="var(--subtitle-color)"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" fullWidth className={styles["form-actions--btn"]}>
          Filter
        </Button>
      </div>

      {}
    </form>
  );
};

export default UserFilter;
