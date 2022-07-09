namespace FinonexApi.Models
{
    public class Employee
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Department Department { get; set; }
    }

    public enum DepartmentEnum
    {
        IT = 1,
        HR = 2,
        Management = 3
    }

    public class Department
    {
        public string Name { get; set; }
        public int Code { get; set; }
    }
}