import { Component, OnInit } from '@angular/core';
import { Message, SelectItem, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Employee, HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = { fullName: '', address: '', phoneNumber: '', department: undefined };
  departments: Department[] = [
    { name: 'IT', code: 1 },
    { name: 'HR', code: 2 },
    { name: 'Management', code: 3 }
  ];
  selectedDepartment?: Department;
  msgs1: Message[] = [];

  successMsg: Message = { severity: 'success', summary: 'Success', detail: 'Employee Added Successfully' };
  warningMsg: Message = { severity: 'warn', summary: 'Warning', detail: 'Employee Already Exist' };
  errorMsg: Message = { severity: 'error', summary: 'Error', detail: 'Error Occured When Try To Add Employee' };

  constructor(private service: HttpService,
              private messageService: MessageService) {

  }
  
  ngOnInit(): void {
  }

  addEmployee() {

    if (this.isAllFieldsValid()) {
      this.service.addEmployee(this.employee).subscribe((data: any) => {

        this.messageService.clear();

        if (data == AddEmployeeResult.success) {
          this.messageService.add(this.successMsg);
        }
        else if (data == AddEmployeeResult.exist) {
          this.messageService.add(this.warningMsg);
        }
        else if (data == AddEmployeeResult.error) {
          this.messageService.add(this.errorMsg);
        }

      });
    }
  }

  isAllFieldsValid() {
    return this.employee.fullName != '' &&
      this.employee.address != '' &&
      this.employee.phoneNumber != '' &&
      this.employee.department != undefined;
  }

  cancel() {
    this.employee.fullName = '';
    this.employee.address = '';
    this.employee.phoneNumber = '';
    this.employee.department = undefined;
  }
}

interface Department {
  name: string,
  code: number
}

enum AddEmployeeResult {
  success=1,
  exist=2,
  error=3
}
