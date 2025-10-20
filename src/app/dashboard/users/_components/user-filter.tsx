import { userFilterSchema } from "@/app/schemas/user-filter.schema";
import Iconify from "@/components/element/icons/iconify";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./user-filter.module.scss";

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
  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      className={styles.form}
    >
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

      <div>
        <Button type="reset" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Filter</Button>
      </div>
    </form>
  );
};

export default UserFilter;
