import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(): ReturnType<CustomerService['getAll']> {
    return this.customerService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): ReturnType<CustomerService['getById']> {
    return this.customerService.getById(id);
  }

  @Post()
  createCustomer(
    @Body() data: CreateCustomerDto,
  ): ReturnType<CustomerService['createCustomer']> {
    return this.customerService.createCustomer(data);
  }

  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() data: CreateCustomerDto,
  ): ReturnType<CustomerService['updateCustomer']> {
    return this.customerService.updateCustomer(id, data);
  }

  @Patch(':id')
  patchCustomer(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): ReturnType<CustomerService['patchCustomer']> {
    return this.customerService.patchCustomer(id, data);
  }

  @Delete(':id')
  deleteCustomer(
    @Param('id') id: string,
  ): ReturnType<CustomerService['deleteCustomer']> {
    return this.customerService.deleteCustomer(id);
  }
}
