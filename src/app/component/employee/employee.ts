// src/app/interfaces/employee.interface.ts
export interface Employee {
  id: number;
  name: string;
  codfuncao: number;
  salary: number;
  dtnascimento: string;
  dtadmissao: string;
  [key: string]: number | string | Date;
}
export interface EmployeeListResponse {
  employees: Employee[];
}
