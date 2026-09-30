import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import { ApiResponse } from './interfaces/student.interfaces';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  private buildResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
    return {
      statusCode,
      message,
      data,
    };
  }

  // GET /students
  async getAll(): Promise<ApiResponse<StudentDocument[]>> {
    const students = await this.studentModel.find().exec();

    return this.buildResponse(200, 'Students fetched successfully', students);
  }

  // GET /students/:id
  async getById(id: string): Promise<ApiResponse<StudentDocument>> {
    const student = await this.studentModel.findById(id).exec();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.buildResponse(200, 'Student fetched successfully', student);
  }

  // POST /students
  async createStudent(data: Partial<CreateStudentDto>): Promise<ApiResponse<StudentDocument>> {
    const student = await this.studentModel.create(data);

    return this.buildResponse(201, 'Student created successfully', student);
  }

  // PUT /students/:id
  async updateStudent(id: string, data: CreateStudentDto): Promise<ApiResponse<StudentDocument>> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.buildResponse(200, 'Student updated successfully', updatedStudent);
  }

  // PATCH /students/:id
  async patchStudent(id: string, data: UpdateStudentDto): Promise<ApiResponse<StudentDocument>> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.buildResponse(200, 'Student updated successfully', updatedStudent);
  }

  // DELETE /students/:id
  async deleteStudent(id: string): Promise<ApiResponse<StudentDocument>> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();

    if (!deletedStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.buildResponse(200, 'Student deleted successfully', deletedStudent);
  }
}
