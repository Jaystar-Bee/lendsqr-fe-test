import {
  EDUCATION_AND_EMPLOYMENT_T,
  GUARANTOR_T,
  PERSONAL_INFORMATION_T,
  SOCIALS_T,
} from "@/types/user-types";
import styles from "./general-details.module.scss";
import { useEffect, useState } from "react";

interface PropsTypes {
  guarantors?: GUARANTOR_T[];
  personal_information?: PERSONAL_INFORMATION_T;
  education_and_employment?: EDUCATION_AND_EMPLOYMENT_T;
  socials?: SOCIALS_T;
}
const GeneralDetails = ({
  guarantors,
  personal_information,
  education_and_employment,
  socials,
}: PropsTypes) => {
  const [details, setDetails] = useState<Partial<PropsTypes>>();

  useEffect(() => {
    if (!personal_information) return;
    setDetails({
      personal_information: {
        full_name: personal_information?.full_name || "N/A",
        phone_number: personal_information?.phone_number || "N/A",
        email_address: personal_information?.email || "N/A",
        bvn: personal_information?.bvn || "N/A",
        gender: personal_information?.gender || "N/A",
        marital_status: personal_information?.marital_status || "N/A",
        children: personal_information?.children || "N/A",
        type_of_residence: personal_information?.type_of_residence || "N/A",
      },
      education_and_employment: {
        level_of_education:
          education_and_employment?.level_of_education || "N/A",
        employment_status: education_and_employment?.employment_status || "N/A",
        sector_of_employment: education_and_employment?.sector || "N/A",
        duration_of_employment:
          education_and_employment?.duration_of_employment || "N/A",
        office_email: education_and_employment?.office_email || "N/A",
        monthly_income: education_and_employment?.monthly_income || "N/A",
        loan_repayment: education_and_employment?.loan_repayment || 0,
      },
      socials: {
        twitter: socials?.twitter || "N/A",
        facebook: socials?.facebook || "N/A",
        instagram: socials?.instagram || "N/A",
      },
      guarantors: guarantors?.map((guarantor) => ({
        full_name: guarantor?.full_name || "N/A",
        phone_number: guarantor?.phone_number || "N/A",
        email_address: guarantor?.email || "N/A",
        relationship: guarantor?.relationship || "N/A",
      })),
    });
  }, [personal_information, education_and_employment, socials, guarantors]);

  if (!details) {
    return null;
  }
  return (
    <div className={styles.container}>
      {Object.entries(details).map(([section, value], index) => (
        <div key={index} className={styles.section}>
          <h2 className={styles["section-title"]}>
            {section === "guarantors"
              ? "Guarantor"
              : section.replace(/_/g, " ")}
          </h2>

          {Array.isArray(value) ? (
            value.map((guarantor, i) => (
              <ul key={i} className={styles.subSection}>
                {Object.entries(guarantor).map(([label, val], j) => (
                  <li key={j} className={styles["subSection-item"]}>
                    <span className={styles.label}>
                      {label.replace(/_/g, " ")}
                    </span>
                    <span className={styles.value}>{val}</span>
                  </li>
                ))}
              </ul>
            ))
          ) : (
            <ul className={styles["section-list"]}>
              {Object.entries(value).map(([label, val], i) => (
                <li key={i} className={styles["section-list--item"]}>
                  <span className={styles.label}>
                    {label.replace(/_/g, " ")}
                  </span>
                  <span className={styles.value}>{val}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneralDetails;
