import { ResponseData, User } from "@/interfaces/users.interface";

export enum ResponseCode {
  Success = 200,
  NotFound = 404,
  BadRequest = 400,
  InternalServerError = 500,
  // Add more response codes as needed
}

export function setResponse(
  code: ResponseCode,
  message: string,
  data: unknown
): ResponseData {
  return {
    code,
    message,
    data,
  };
}
