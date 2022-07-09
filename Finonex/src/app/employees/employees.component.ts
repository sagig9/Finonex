import { Component, OnInit } from '@angular/core';
import { Department, Employee, HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[]=[];
  filteredEmployees: Employee[]=[];
  selectedEmployee: Employee = new Employee;

  constructor(private service: HttpService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.service.getEmployees().subscribe((data: any) => {

      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  deleteEmployee(employee: Employee) {
    this.service.deleteEmployee(employee).subscribe((data: any) => {

      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  filterEmployee(event: { query: any; }) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.employees.length; i++) {

      let employee = this.employees[i];

      if (employee.fullName.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(employee);
      }
    }

    this.filteredEmployees = filtered.length ? filtered : this.employees;
  }

  onEmployeeSelect(event: any) {
    this.filteredEmployees = [];
    this.filteredEmployees.push(this.selectedEmployee);
  }

}
