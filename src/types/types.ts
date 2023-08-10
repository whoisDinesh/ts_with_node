export type UserInfo = {
  userName?: string;
  email?: string;
  password?: string;
  phonNumber?: string;
  age?: string;
  token?: string;
};

export type login = Pick<UserInfo, "email" | "password">;

export type Register = Required<UserInfo>;

export type resetPassword = Pick<UserInfo, "email" | "token">;

export type forgotPassword = Pick<UserInfo, "email">;
