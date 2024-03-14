/**
 * User
 */
export interface IUserLogin {
  _id?: string;
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  positionId?: number;
  avatar?: string;
  personId?: number;
  address?: string;
  phoneNumber?: string;
  phoneNumberRelative?: string;
  baseSalary?: number;
  manageSalary?: number;
  gender?: string;
}

/**
 * Theme
 */
export type Theme = {
  dark: boolean;
  colors: {
    "primary": string;
    "background": string;
    "card": string;
    "text": string;
    "border": string;
    "secondary-color"?: string;
    "success-color"?: string;
    "danger-color"?: string;
    "state-color-gold"?: string;
    "state-color-orange"?: string;
    "btn-color-orange"?: string;
    "state-color-green"?: string;
    "background-color"?: string;
    "border-color"?: string;
    "black-color"?: string;
    "white-color"?: string;
  };
};
