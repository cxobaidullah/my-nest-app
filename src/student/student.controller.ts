import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  CreateStudentDto,
  UpdateStudentDto,
} from './dto/create-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // GET /student
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): ReturnType<StudentService['getAll']> {
    return this.studentService.getAll();
  }

  // GET /student/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string): ReturnType<StudentService['getById']> {
    return this.studentService.getById(id);
  }

  // POST /student
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createStudent(
    @Body() data: CreateStudentDto,
  ): ReturnType<StudentService['createStudent']> {
    return this.studentService.createStudent(data);
  }

  // PUT /student/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateStudent(
    @Param('id') id: string,
    @Body() data: CreateStudentDto,
  ): ReturnType<StudentService['updateStudent']> {
    return this.studentService.updateStudent(id, data);
  }

  // PATCH /student/:id
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  patchStudent(
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ): ReturnType<StudentService['patchStudent']> {
    return this.studentService.patchStudent(id, data);
  }

  // DELETE /student/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteStudent(
    @Param('id') id: string,
  ): ReturnType<StudentService['deleteStudent']> {
    return this.studentService.deleteStudent(id);
  }
}
