export class EmployeeModel {

    FirstName: string;
    LastName: string;
    CompanyId: number;
    DepartmentId: number;
    DesignationId: number;
    DOJ: Date;
    DOB: Date;
    Gender: string;
    MaritalStatus: string
    EmployeeCode: string
    FatherName: string;
    ReportingTo: string;
    BloodGroup: string
    SpouseName: string;
    Children: string
    ProfilePhoto: string
    
    IsSameAddress: boolean;
    EmployeeId: number;
    ModifiedBy: number;
    EmpAddress: EmployeeAddress;
}
export class EmployeeAddress {
    PerAddress1: string
    PerAddress2: string
    PerArea: string
    PerPincode: string
    PerEmailId: string
    PerMobile: string
    PerLandline: string
    IsSameAddress: boolean
    CommAddress1: string
    CommAddress2: string
    CommArea: string
    CommCity: string
    CommState: string
    CommCountry: string
    CommPincode: string
    CommEmailId: string
    CommMobile: string
    CommLandline: string
}