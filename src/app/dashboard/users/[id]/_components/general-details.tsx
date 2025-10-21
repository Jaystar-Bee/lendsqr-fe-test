import styles from "./general-details.module.scss";

const details = {
  personal_information: {
    full_name: "Grace Effiom",
    phone_number: "07060780922",
    email_address: "adedeji@lendsqr.com",
    bvn: "123456789",
    gender: "Female",
    marital_status: "Single",
    children: "None",
    type_of_residence: "Parent’s Apartment",
  },
  education_and_employment: {
    level_of_education: "B.Sc",
    employment_status: "Employed",
    sector_of_employment: "Private Sector",
    duration_of_employment: "2 years",
    office_email: "adedeji@lendsqr.com",
    monthly_income: "₦200,000.00- ₦400,000.00",
    loan_repayment: "2,000,000",
  },
  socials: {
    twitter: "@graceeffiom",
    facebook: "Grace Effiom",
    instagram: "@graceeffiom",
  },
  guarantors: [
    {
      full_name: "Ogana Effiom",
      phone_number: "07060780922",
      email_address: "adedeji@lendsqr.com",
      relationship: "Sister",
    },
    {
      full_name: "Debby Ogana",
      phone_number: "07060780922",
      email_address: "adedeji@lendsqr.com",
      relationship: "Sister",
    },
  ],
};

const GeneralDetails = () => {
  return (
    <div className={styles.container}>
      {Object.entries(details).map(([section, value], index) => (
        <div key={index} className={styles.section}>
          <h2 className={styles["section-title"]}>
            {section === "guarantors" ? "Guarantor" : section.replace(/_/g, " ")}
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
