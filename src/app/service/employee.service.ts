// src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee,EmployeeListResponse } from "../component/employee/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }
  postEmployee(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, newEmployee);
  }
  deleteEmployee(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`);
  }
  updateEmployee(Employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/employees/${Employee.id}`, Employee);
  }
}
