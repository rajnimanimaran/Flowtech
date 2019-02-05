using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities
{
    public class EmployeeEntity
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CompanyId { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public DateTime DOJ { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string EmployeeCode { get; set; }
        public string FatherName { get; set; }
        public int ReportingTo { get; set; }
        public string ReportingToName { get; set; }
        public string BloodGroup { get; set; }
        public string SpouseName { get; set; }
        public int Children { get; set; }
        public string ProfilePhoto { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }

        public EmployeeCompanyDTO Company { get; set; }
        public EmployeeDesignationDTO Designation { get; set; }
        public EmployeeDepartmentDTO Department { get; set; }
        public EmployeeAddressEntity EmpAddress { get; set; }
        public List<EmployeeAcademyEntity> EmpAcademy { get; set; }
        // public List<EmployeeDocumentEntity> EmpDocuments { get; set; }
        public List<EmployeeExperienceEntity> EmpExperience { get; set; }
    }

    public class EmployeeCompanyDTO
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
    }

    public class EmployeeDesignationDTO
    {
        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
    }

    public class EmployeeDepartmentDTO
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }

    public class EmpByDesigOutputDTO
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CompanyId { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public string EmployeeCode { get; set; }
    }

    public class EmpProPicUploadInputDTO
    {
        public int EmployeeId { get; set; }
        public string ProfilePhoto { get; set; }
    }
}
