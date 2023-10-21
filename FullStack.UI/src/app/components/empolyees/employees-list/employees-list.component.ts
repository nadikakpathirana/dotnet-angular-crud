import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  // employees: Employee[] = [
  //   {
  //     id: "1",
  //     name: "Name 1",
  //     email: "nadikakpathirana@gmail.com",
  //     phone: 354234,
  //     salary: 25000,
  //     department: "test"
  //   },
  //   {
  //     id: "2",
  //     name: "Name 2",
  //     email: "nadikakpathirana@gmail.com",
  //     phone: 354234,
  //     salary: 25000,
  //     department: "test"
  //   },
  //   {
  //     id: "2",
  //     name: "Name 3",
  //     email: "nadikakpathirana@gmail.com",
  //     phone: 354234,
  //     salary: 25000,
  //     department: "test"
  //   }
  // ]

  employees: Employee[] = []

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees()
    .subscribe({
      next: (employees: Employee[]) => {
        this.employees = employees;
      },
      error: (response: any) => {
        console.log(response);
      }
    });
  }

}
