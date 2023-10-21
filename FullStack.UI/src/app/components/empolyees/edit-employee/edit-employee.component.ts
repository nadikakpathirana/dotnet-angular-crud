import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee = {
    id: "",
    name: "",
    email: "",
    phone: 0,
    salary: 0,
    department: ""
  }

  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get("id");

        if (id) {
          // call to the api
          this.employeeService.getEmployee(id).subscribe({
            next: (employee) => {
              this.employee = employee;
            }
          })
        }
      }
    })
  }
  updateEmployee() {
    this.employeeService.updateEmployee(this.employee.id, this.employee)
    .subscribe({
      next: (res) => {
        this.router.navigate(["/employees"])
      }
    })
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(this.employee.id)
    .subscribe({
      next: (res) => {
        this.router.navigate(["/employees"])
      }
    })
  }
}
