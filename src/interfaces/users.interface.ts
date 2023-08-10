export interface User {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  gstNumber: string;
}

export interface ResponseData {
  code: number;
  message: string;
  data: unknown;
}
