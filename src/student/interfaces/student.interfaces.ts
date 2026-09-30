export interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface CreateStudentDto {
  name: string;
  age: number;
  email?: string;
}

export interface UpdateStudentDto {
  name?: string;
  age?: number;
  email?: string;
}