import { USER_STATUS_E } from "./extra-enums";

export interface USER_INTERFACE {
    id: string;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: USER_STATUS_E;
}


export interface PERSONAL_INFORMATION_T {
  full_name: string;
  phone_number: string;
  email?: string;
  bvn: string;
  email_address?: string
  gender: string;
  marital_status: string;
  children: string;
  type_of_residence: string;
}

export interface EDUCATION_AND_EMPLOYMENT_T {
  level_of_education: string;
  employment_status: string;
  sector?: string;
  sector_of_employment?: string;
  duration_of_employment: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: number;
}

export interface SOCIALS_T {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface GUARANTOR_T {
  full_name: string;
  phone_number: string;
  email?: string;
  email_address?: string
  relationship: string;
}

export interface USER_DATA_T {
  id: string;
  user_code: string;
  organization: string;
  tier: string;
  tier_stars: number;
  account_balance: string;
  bank_account: string;
  personal_information: PERSONAL_INFORMATION_T;
  education_and_employment: EDUCATION_AND_EMPLOYMENT_T;
  socials: SOCIALS_T;
  guarantors: GUARANTOR_T[];
  created_at: string;
  status: USER_STATUS_E;
}

export interface USER_FILTER_T {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: USER_STATUS_E;
}

