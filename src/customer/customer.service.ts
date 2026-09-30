import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
} from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 'cus-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    },
    {
      id: 'cus-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
    },
  ];

  getAll(): Customer[] {
    return this.customers;
  }

  getById(id: string): Customer {
    const customer = this.customers.find((item) => item.id === id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  createCustomer(data: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: string, data: CreateCustomerDto): Customer {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    const updatedCustomer: Customer = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    this.customers[index] = updatedCustomer;
    return updatedCustomer;
  }

  patchCustomer(id: string, data: UpdateCustomerDto): Customer {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    const updatedCustomer: Customer = {
      ...this.customers[index],
      ...data,
    };

    this.customers[index] = updatedCustomer;
    return updatedCustomer;
  }

  deleteCustomer(id: string): Customer & { message: string } {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    const deletedCustomer = this.customers[index];
    this.customers.splice(index, 1);

    return { message: 'Customer deleted successfully', ...deletedCustomer };
  }
}
