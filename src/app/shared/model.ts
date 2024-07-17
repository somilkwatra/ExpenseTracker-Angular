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
