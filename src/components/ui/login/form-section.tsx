"use client";
import React from "react";
import styles from "./form-section.module.scss";
import Cookies from "js-cookie";
import { useForm } from "@mantine/form";
import { loginSchema } from "@/app/schemas/auth.schema";
import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GLOBAL_NAME_E } from "@/types/extra-enums";

const inputStyle = {
  input: {
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgba(84, 95, 125, 0.15)",
    fontSize: 14,
    "::placeholder": {
      color: "rgba(84, 95, 125, 0.15)",
    },
  },
};

const FormSection = () => {
  // GENERAL VARIABLES
  const router = useRouter();
  // FORM
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
      if (!result.success) {
        return result.error.flatten().fieldErrors;
      }
      return {};
    },
  });

  async function handleSubmit(values: typeof form.values) {
    Cookies.set(GLOBAL_NAME_E.AUTHTOKEN, JSON.stringify(values), {
      expires: 7,
      sameSite: "lax",
    });
    router.push("/dashboard/users");
  }

  return (
    <div className={styles.formCover}>
      <div className={styles.header}>
        <h2>Welcome!</h2>
        <small>Enter details to login.</small>
      </div>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <TextInput
          placeholder="Email"
          key={form.key("email")}
          styles={inputStyle}
          {...form.getInputProps("email")}
        />
        <TextInput
          mt="lg"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          key={form.key("password")}
          styles={{ ...inputStyle }}
          {...form.getInputProps("password")}
          rightSectionWidth={50}
          rightSection={
            <Button
              variant="transparent"
              className={styles["show-password-button"]}
              size="xs"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          }
        />

        <div className={styles.forgot}>
          <Link
            href="#"
            rel="noopener noreferrer"
            className={styles["forgot-link"]}
          >
            Forgot PASSWORD?
          </Link>
        </div>

        <Button
          type="submit"
          size="md"
          className={styles.button}
          aria-label="Login"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
