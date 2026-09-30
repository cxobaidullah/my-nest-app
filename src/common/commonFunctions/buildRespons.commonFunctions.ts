import { ApiResponse } from "../../student/interfaces/student.interfaces";
export function buildResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}
