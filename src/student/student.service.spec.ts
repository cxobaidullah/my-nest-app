import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { Student } from './student.schema';

describe('StudentService', () => {
  let service: StudentService;
  const studentModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getModelToken(Student.name),
          useValue: studentModel,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student using the MongoDB model', async () => {
    const payload = {
      name: 'Ali',
      age: 20,
      email: 'ali@gmail.com',
    };

    const createdStudent = {
      _id: 'mongo-id-123',
      ...payload,
    };

    studentModel.create.mockResolvedValue(createdStudent);

    const result = await service.createStudent(payload);

    expect(studentModel.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      statusCode: 201,
      message: 'Student created successfully',
      data: createdStudent,
    });
  });
});
