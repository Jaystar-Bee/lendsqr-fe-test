import { userFilterSchema } from "@/app/schemas/user-filter.schema";
import Iconify from "@/components/element/icons/iconify";
import { Button, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import styles from "./user-filter.module.scss";
import { USER_FILTER_T } from "@/types/user-types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { USER_STATUS_E } from "@/types/extra-enums";

const organization = ["Lendsqr", "234Lender", "Palmpay"];
const statuses = Object.values(USER_STATUS_E)?.map((item) => {
  return {
    label: item,
    value: item,
  };
});

const UserFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    initialValues: {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: undefined as USER_FILTER_T["status"] | undefined,
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
    const filteredEntries = Object.entries(values)
      .filter(
        ([_, v]) =>
          v?.trim() !== undefined && v?.trim() !== "" && v?.trim() !== null
      )
      .map(([k, v]) => [k, String(v)]) as [string, string][];

    if (filteredEntries.length === 0) {
      router.push("?");
    } else {
      router.push(`?${new URLSearchParams(filteredEntries).toString()}`);
    }
  }

  function handleReset() {
    form.reset();
    router.push("?");
  }

  useEffect(() => {
    form.setValues({
      organization: searchParams.get("organization") || "",
      username: searchParams.get("username") || "",
      email: searchParams.get("email") || "",
      date: searchParams.get("date") || "",
      phoneNumber: searchParams.get("phoneNumber") || "",
      status:
        (searchParams.get("status") as USER_FILTER_T["status"]) || undefined,
    });
  }, [searchParams]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
      <div className={styles["form-cover"]}>
        <Select
          label="Organization"
          placeholder="Select"
          data={organization}
          key={form.key("organization")}
          {...form.getInputProps("organization")}
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
          comboboxProps={{ withinPortal: false }}
        />
        <TextInput
          mt={"lg"}
          label="Username"
          placeholder="User"
          key={form.key("username")}
          {...form.getInputProps("username")}
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
          key={form.key("email")}
          {...form.getInputProps("email")}
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
            clearable
            key={form.key("date")}
            {...form.getInputProps("date")}
            maxDate={new Date()}
            classNames={{
              input: styles["form-date--input"],
              label: styles["form-control--label"],
            }}
            popoverProps={{ withinPortal: false }}
          />
          {!form.values.date && (
            <Iconify
              icon="zondicons:calendar"
              className={styles["form-date--icon"]}
            />
          )}
        </div>
        <TextInput
          mt={"lg"}
          label="Phone Number"
          placeholder="Phone Number"
          type="tel"
          key={form.key("phoneNumber")}
          {...form.getInputProps("phoneNumber")}
          classNames={{
            label: styles["form-control--label"],
            input: styles["form-control--input"],
          }}
        />

        <Select
          mt={"lg"}
          label="Status"
          placeholder="Select"
          data={statuses}
          key={form.key("status")}
          {...form.getInputProps("status")}
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
          comboboxProps={{ withinPortal: false }}
        />
      </div>
      <div className={styles["form-actions"]}>
        <Button
          type="reset"
          fullWidth
          className={styles["form-actions--btn"]}
          variant="outline"
          color="var(--subtitle-color)"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit" fullWidth className={styles["form-actions--btn"]}>
          Filter
        </Button>
      </div>
    </form>
  );
};

export default UserFilter;
