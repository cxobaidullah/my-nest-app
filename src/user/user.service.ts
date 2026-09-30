import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { buildResponse } from '../common/commonFunctions/buildRespons.commonFunctions';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModal: Model<User>) { }


    async createUser(data: CreateUserDto): Promise<ReturnType<typeof buildResponse>> {
        const newUser = await this.UserModal.create(data);
        return buildResponse(201, 'User created successfully', newUser);
    }

    async findUser(limit = 10, offset = 0): Promise<ReturnType<typeof buildResponse>> {
        if (limit < 1 || limit > 100 || offset < 0) {
            throw new BadRequestException('Limit must be between 1 and 100, and offset must be 0 or greater');
        }

        const [users, total] = await Promise.all([
            this.UserModal.find().sort({ _id: 1 }).skip(offset).limit(limit).exec(),
            this.UserModal.countDocuments().exec(),
        ]);

        return buildResponse(200, 'Users retrieved successfully', {
            users,
            total,
            limit,
            offset,
        });
    }

    async findById(id: string): Promise<ReturnType<typeof buildResponse>> {
        const users = await this.UserModal.findById(id).exec();
        if (!users) {
            throw new NotFoundException('User not found');
        }


        return buildResponse(200, 'User retrieved successfully', users);
    }

    async updateUser(id: string, data: Partial<CreateUserDto>): Promise<ReturnType<typeof buildResponse>> {
        const updatedUser = await this.UserModal.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).exec();

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return buildResponse(200, 'User updated successfully', updatedUser);
    }

    async deleteUser(id: string): Promise<ReturnType<typeof buildResponse>> {
        const deletedUser = await this.UserModal.findByIdAndDelete(id).exec();

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return buildResponse(200, 'User deleted successfully', deletedUser);
    }
}

