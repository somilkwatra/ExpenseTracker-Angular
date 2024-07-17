export interface user {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface login {
  email: string;
  password: string;
}
export interface account {
  oldPassword: string;
  newPassword: string;
}
export interface category {
  _id: string;
  name: string;
}
export interface CategoryUsage {
  name: string;
  percentage: number;
  count: number;
}
export interface Expense {
  _id: string;
  sno: number;
  date: string;
  name: string;
  amount: number;
  category: {
    name: string;
  };
}
