import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
       private readonly employees = [
  {
    id: 1,
    name: "Obaid",
    
  },
  {
    id: 2,
    name: "Ahmed",
    
  },
  {
    id: 3,
    name: "Sara",
    
  },
  {
    id: 4,
    name: "Khalid",
    
  }
];

getEmployees(): any[] {
  return this.employees.length > 0 ? this.employees : [];
}

getEmployeeById(id: number): any {

  return this.employees.find(employee => employee.id === id) || "Employee not found";
}
}
