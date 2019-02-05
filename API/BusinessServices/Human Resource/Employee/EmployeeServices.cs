using AutoMapper;
using BusinessEntities;
using DataModel;
using DataModel.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BusinessServices
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IUnitOfWork _unitOfWork;

        public EmployeeServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public EmployeeEntity GetEmployeeById(int EmployeeId)
        {
            var employeeList = _unitOfWork.EmployeeRepository.GetMany(a => a.EmployeeId == EmployeeId).First();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Company, EmployeeCompanyDTO>();
                cfg.CreateMap<Department, EmployeeDepartmentDTO>();
                cfg.CreateMap<Designation, EmployeeDesignationDTO>();
                cfg.CreateMap<EmployeeAddress, EmployeeAddressEntity>();
                cfg.CreateMap<EmployeeAcademy, EmployeeAcademyEntity>();
                cfg.CreateMap<EmployeeExperience, EmployeeExperienceEntity>();
                cfg.CreateMap<Employee, EmployeeEntity>();
            });
            IMapper mapper = config.CreateMapper();

            var employeemodel = mapper.Map<Employee, EmployeeEntity>(employeeList);
            return employeemodel;
        }

        public IEnumerable<EmployeeEntity> GetAllEmployees(int CompanyId)
        {

            var employee = _unitOfWork.EmployeeRepository.GetMany(a => a.CompanyId == CompanyId).OrderByDescending(x => x.EmployeeId).ToList();

            var employeeall = _unitOfWork.EmployeeRepository.GetAll().OrderByDescending(x => x.EmployeeId).ToList();
            if (employee.Any())
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Company, EmployeeCompanyDTO>();
                    cfg.CreateMap<Department, EmployeeDepartmentDTO>();
                    cfg.CreateMap<Designation, EmployeeDesignationDTO>();
                    cfg.CreateMap<EmployeeAddress, EmployeeAddressEntity>();
                    cfg.CreateMap<EmployeeAcademy, EmployeeAcademyEntity>();
                    cfg.CreateMap<EmployeeExperience, EmployeeExperienceEntity>();
                    // cfg.CreateMap<EmployeeDocuments, EmployeeDocumentEntity>();
                    cfg.CreateMap<Employee, EmployeeEntity>();
                });
                IMapper mapper = config.CreateMapper();

                var employeeList = mapper.Map<List<Employee>, List<EmployeeEntity>>(employee);

                foreach (var item in employeeList)
                {
                    item.ReportingToName = (from t in employeeall where t.EmployeeId == item.ReportingTo select t.FirstName).FirstOrDefault();
                }

                return employeeList;
            }

            return null;
        }

        public int CreateEmployee(EmployeeEntity employeeEntity)
        {
            using (var scope = new TransactionScope())
            {

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<EmployeeCompanyDTO, Company>();
                    cfg.CreateMap<EmployeeDepartmentDTO, Department>();
                    cfg.CreateMap<EmployeeDesignationDTO, Designation>();
                    cfg.CreateMap<EmployeeAddressEntity, EmployeeAddress>();
                    cfg.CreateMap<EmployeeAcademyEntity, EmployeeAcademy>();
                    cfg.CreateMap<EmployeeExperienceEntity, EmployeeExperience>();
                    // cfg.CreateMap<EmployeeDocumentEntity, EmployeeDocuments>();
                    cfg.CreateMap<EmployeeEntity, Employee>();
                });
                IMapper mapper = config.CreateMapper();


                var emp = mapper.Map<EmployeeEntity, Employee>(employeeEntity);
                emp.IsActive = true;
                emp.CreatedOn = DateTime.Now;
                emp.ModifiedOn = DateTime.Now;


                emp.Gender = emp.Gender.ToUpper() == "TRUE" ? "F" : "M";
                emp.MaritalStatus = emp.MaritalStatus.ToUpper() == "TRUE" ? "S" : "M";

                if (emp.EmpAddress != null)
                    emp.EmpAddress.CompanyId = emp.CompanyId;

                if (emp.EmpAcademy != null)
                {
                    for (int i = 0; i < emp.EmpAcademy.Count; i++)
                    {
                        emp.EmpAcademy[i].CompanyId = emp.CompanyId;
                    }
                }
                if (emp.EmpExperience != null)
                {
                    for (int i = 0; i < emp.EmpExperience.Count; i++)
                    {
                        emp.EmpExperience[i].CompanyId = emp.CompanyId;
                    }
                }
                //if (emp.EmpDocuments != null)
                //    for (int i = 0; i < emp.EmpDocuments.Count; i++)
                //    {
                //        emp.EmpDocuments[i].CompanyId = emp.CompanyId;
                //    }

                _unitOfWork.EmployeeRepository.Insert(emp);
                _unitOfWork.Save();

                scope.Complete();
                return emp.EmployeeId;
            }
        }

        public bool UpdateEmployee(int EmployeeId, EmployeeEntity employeeEntity, EmployeeAddressEntity empaddrsEntity)
        {
            var success = false;
            if (employeeEntity != null)
            {
                using (var scope = new TransactionScope())
                {
                    var employee = _unitOfWork.EmployeeRepository.GetByID(EmployeeId);
                    if (employeeEntity != null)
                    {
                        employee.FirstName = employeeEntity.FirstName;
                        employee.LastName = employeeEntity.LastName;
                        employee.DepartmentId = employeeEntity.DepartmentId;
                        employee.DesignationId = employeeEntity.DesignationId;
                        employee.DOJ = employeeEntity.DOJ;
                        employee.DOB = employeeEntity.DOB;

                        employee.Gender = employeeEntity.Gender.ToUpper() == "TRUE" ? "F" : "M";

                        employee.MaritalStatus = employeeEntity.MaritalStatus.ToUpper() == "TRUE" ? "S" : "M";

                        employee.EmployeeCode = employeeEntity.EmployeeCode;
                        employee.FatherName = employeeEntity.FatherName;
                        employee.ReportingTo = employeeEntity.ReportingTo;
                        employee.BloodGroup = employeeEntity.BloodGroup;
                        employee.SpouseName = employeeEntity.SpouseName;
                        employee.Children = employeeEntity.Children;
                        employee.ProfilePhoto = employeeEntity.ProfilePhoto;
                        employee.IsActive = employeeEntity.IsActive;
                        employee.ModifiedBy = employeeEntity.ModifiedBy;
                        employee.ModifiedOn = DateTime.Now;

                        _unitOfWork.EmployeeRepository.Update(employee);
                        _unitOfWork.Save();


                        var employeeaddress = _unitOfWork.EmployeeAddressRepository.GetByID(EmployeeId);

                        employeeaddress.PerAddress1 = empaddrsEntity.PerAddress1;
                        employeeaddress.PerAddress2 = empaddrsEntity.PerAddress2;
                        employeeaddress.PerArea = empaddrsEntity.PerArea;
                        employeeaddress.PerCity = empaddrsEntity.PerCity;
                        employeeaddress.PerState = empaddrsEntity.PerState;
                        employeeaddress.PerCountry = empaddrsEntity.PerCountry;
                        employeeaddress.PerPincode = empaddrsEntity.PerPincode;
                        employeeaddress.PerEmailId = empaddrsEntity.PerEmailId;
                        employeeaddress.PerMobile = empaddrsEntity.PerMobile;
                        employeeaddress.PerLandline = empaddrsEntity.PerLandline;
                        employeeaddress.IsSameAddress = empaddrsEntity.IsSameAddress;
                        employeeaddress.CommAddress1 = empaddrsEntity.CommAddress1;
                        employeeaddress.CommAddress2 = empaddrsEntity.CommAddress2;

                        employeeaddress.CommArea = empaddrsEntity.CommArea;
                        employeeaddress.CommCity = empaddrsEntity.PerAddress1;
                        employeeaddress.CommState = empaddrsEntity.CommState;
                        employeeaddress.CommCountry = empaddrsEntity.CommCountry;
                        employeeaddress.CommPincode = empaddrsEntity.CommPincode;
                        employeeaddress.CommEmailId = empaddrsEntity.CommEmailId;
                        employeeaddress.CommMobile = empaddrsEntity.CommMobile;
                        employeeaddress.CommLandline = empaddrsEntity.CommLandline;
                        employeeaddress.CreatedBy = employeeEntity.CreatedBy;
                        employeeaddress.CreatedOn = DateTime.Now;
                        employeeaddress.ModifiedBy = employeeEntity.CreatedBy;
                        employeeaddress.ModifiedOn = DateTime.Now;


                        _unitOfWork.EmployeeAddressRepository.Update(employeeaddress);
                        _unitOfWork.Save();

                        scope.Complete();
                        success = true;
                    }
                }
            }
            return success;
        }

        public bool DeleteEmployee(int EmployeeId)
        {
            var isSuccess = false;
            if (EmployeeId > 0)
            {
                using (var scope = new TransactionScope())
                {
                    var employee = _unitOfWork.EmployeeRepository.GetMany(e => e.ReportingTo == EmployeeId);

                    if (employee.Count() == 0)
                    {
                        _unitOfWork.EmployeeAcademyRepository.DeleteMany(ea => ea.EmployeeId == EmployeeId);
                        _unitOfWork.EmployeeExperienceRepository.DeleteMany(ea => ea.EmployeeId == EmployeeId);
                        _unitOfWork.EmployeeAddressRepository.DeleteMany(ea => ea.EmployeeId == EmployeeId);

                        //_unitOfWork.EmployeeAddressRepository.Delete(EmployeeId);
                        //_unitOfWork.EmployeeDocumentsRepository.Delete(EmployeeId);
                        //_unitOfWork.EmployeeExperienceRepository.Delete(EmployeeId);
                        _unitOfWork.EmployeeRepository.Delete(EmployeeId);
                        _unitOfWork.Save();
                        scope.Complete();
                        isSuccess = true;
                    }
                }

            }
            return isSuccess;
        }

        public bool ToggleActiveEmployee(int EmployeeId)
        {
            var success = false;
            if (EmployeeId > 0)
            {
                using (var scope = new TransactionScope())
                {
                    var objEmp = _unitOfWork.EmployeeRepository.GetByID(EmployeeId);
                    if (objEmp != null)
                    {
                        objEmp.IsActive = !objEmp.IsActive;
                        objEmp.ModifiedBy = 1;
                        objEmp.ModifiedOn = DateTime.Now;
                        _unitOfWork.EmployeeRepository.Update(objEmp);
                        _unitOfWork.Save();
                        scope.Complete();
                        success = true;
                    }
                }
            }
            return success;
        }

        public IEnumerable<EmpByDesigOutputDTO> GetAllCompanyEmployees(int DesignationId)
        {
            var employee = _unitOfWork.EmployeeRepository.GetMany(e => e.DesignationId == DesignationId).ToList();
            if (employee.Any())
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Employee, EmpByDesigOutputDTO>();
                });
                IMapper mapper = config.CreateMapper();

                var employeeList = mapper.Map<List<Employee>, List<EmpByDesigOutputDTO>>(employee);
                return employeeList;
            }
            return null;
        }

        public bool EmployeeProPicUpload(EmpProPicUploadInputDTO empData)
        {
            var result = false;
            var empToUpdate = _unitOfWork.EmployeeRepository.GetByID(empData.EmployeeId);
            empToUpdate.ProfilePhoto = empData.ProfilePhoto;
            using (var scope = new TransactionScope())
            {
                _unitOfWork.EmployeeRepository.Update(empToUpdate);
                _unitOfWork.Save();
                result = true;
                scope.Complete();
            }
            return result;
        }

    }
}
