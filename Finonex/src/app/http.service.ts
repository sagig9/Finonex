import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  isLocalHost = document.domain == "localhost";
  readonly APIUrl = this.isLocalHost ? "http://localhost:5222/api" : "http://employeesapi.somee.com/api";
  //
  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<any[]>(this.APIUrl + '/Employees/GetEmployees');
  }

  addEmployee(employee: Employee) {
   
    //employee.department = 1;
    return this.http.post(this.APIUrl + '/Employees/AddEmployee', employee);
  }

  deleteEmployee(employee: Employee) {
    return this.http.post(this.APIUrl + '/Employees/DeleteEmployee', employee);
  }
}


export class Employee {
  fullName!: string;
  address!: string;
  phoneNumber!: string;
  department?: Department;
}

//export enum Department {
//  IT = 1,
//  HR = 2,
//  Management = 3
//}

export interface Department {
  name: string,
  code: number
}
