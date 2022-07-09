using FinonexApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinonexApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private static List<Employee> Employees = new List<Employee>
        {
            new Employee{ FullName="Moshe",Address="Tel Aviv",PhoneNumber="054-4551234",Department=GetDepartment(DepartmentEnum.IT)},
            new Employee{ FullName="Dana",Address="Herzlia",PhoneNumber="050-4551001",Department=GetDepartment(DepartmentEnum.HR)},
            new Employee{ FullName="Benny",Address="Tel Aviv",PhoneNumber="054-2011234",Department=GetDepartment(DepartmentEnum.IT)},
            new Employee{ FullName="Yael",Address="Kfar Saba",PhoneNumber="052-4536734",Department=GetDepartment(DepartmentEnum.Management)}
        };

        [HttpGet]
        [Route("GetEmployees")]
        public IEnumerable<Employee> GetEmployees()
        {
            return Employees;
        }

        [HttpPost]
        [Route("AddEmployee")]
        public AddEmployeeResult AddEmployee(Employee employee)
        {
            AddEmployeeResult addEmployeeResult;

            try
            {
                if (!IsEmployeeExist(employee))
                {
                    Employees.Add(employee);
                    addEmployeeResult = AddEmployeeResult.Success;
                }
                else
                {
                    addEmployeeResult = AddEmployeeResult.Exist;
                }
            }
            catch (Exception ex) {
                addEmployeeResult = AddEmployeeResult.Error;
            }

            return addEmployeeResult;
        }

        [HttpPost]
        [Route("DeleteEmployee")]
        public IEnumerable<Employee> DeleteEmployee(Employee employee)
        {
            try
            {
                int empIndex = GetEmployeeIndex(employee);

                if (empIndex != -1)
                {
                    Employees.RemoveAt(empIndex);
                }
            }
            catch (Exception ex) { }

            return Employees;
        }

        private bool IsEmployeeExist(Employee employee)
        {
            return GetEmployeeIndex(employee) != -1;
        }

        private int GetEmployeeIndex(Employee employee)
        {
            return Employees.FindIndex(emp => emp.FullName == employee.FullName &&
                                              emp.Address == employee.Address &&
                                              emp.PhoneNumber == employee.PhoneNumber &&
                                              emp.Department.Code == employee.Department.Code);

        }

        private static Department GetDepartment(DepartmentEnum departmentEnum)
        {
            return new Department { Name = departmentEnum.ToString(), Code = (int)departmentEnum };
        }
    }
}


public enum AddEmployeeResult
{
    Success = 1,
    Exist = 2,
    Error = 3
}