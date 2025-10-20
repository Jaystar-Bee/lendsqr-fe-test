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