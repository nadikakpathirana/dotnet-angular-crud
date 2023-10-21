import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseApiUrl}/Employees`);
  }

  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseApiUrl}/Employees/${id}`)
  }

  addNewEmpoloyee(employee: Employee): Observable<Employee>{
    employee.id = environment.emptyGuid;
    return this.http.post<Employee>(`${this.baseApiUrl}/Employees`, employee)
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.baseApiUrl}/Employees/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseApiUrl}/Employees/${id}`)
  }

}
