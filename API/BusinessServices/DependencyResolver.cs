

using Resolver;
using System.ComponentModel.Composition;
using BusinessServices.Master1.Product;
using BusinessServices.Master1.RawMaterial;
using BusinessServices.Master1.ProductStock;
using BusinessServices.Master1.UOM;
using BusinessServices.Master1.StockRawMaterial;
using BusinessServices.Master1.WorkOrderMaster;
using BusinessServices.Master1.Customer;
using BusinessServices.Master1.SubContract;
using BusinessServices.sodm;
using BusinessServices.Supplier;
using BusinessServices.BOM_Master;
using BusinessServices.BOM_Details;
using BusinessServices.Master1.SalesOrder;
using BusinessServices.Master1.WorkOrderDetails;
using BusinessServices.Master1.POMaster;
using BusinessServices.Master1.PurchaseOrderService;

namespace BusinessServices
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            registerComponent.RegisterType<IUserServices, UserServices>();
            registerComponent.RegisterType<ITokenServices, TokenServices>();
            registerComponent.RegisterType<IDesignationService, DesignationService>();
            registerComponent.RegisterType<ICityService, CityService>();
            registerComponent.RegisterType<ICountryService, CountryServices>();
            registerComponent.RegisterType<IRoleServices, RoleServices>();
            registerComponent.RegisterType<IRoleMenuMappingServices, RoleMenuMappingServices>();
            registerComponent.RegisterType<IUserMenuMappingServices, UserMenuMappingServices>();
            registerComponent.RegisterType<ICompanyServices, CompanyServices>();
            registerComponent.RegisterType<IStateServices, StateServices>();
            registerComponent.RegisterType<IAreaServices, AreaServices>();
            registerComponent.RegisterType<IOrganizationLevelServices, OrganizationLevelServices>();
            registerComponent.RegisterType<IActionServices, ActionServices>();
            registerComponent.RegisterType<IDepartmentServices, DepartmentServices>();
            registerComponent.RegisterType<IMenuServices, MenuServices>();
            registerComponent.RegisterType<IEmployeeServices, EmployeeServices>();           
            registerComponent.RegisterType<IEmployeeAcademyService, EmployeeAcademyService>();
            registerComponent.RegisterType<IEmployeeExperienceService, EmployeeExperienceService>();
            registerComponent.RegisterType<IStudentService, StudentService>();
            registerComponent.RegisterType<IProductServices, ProductServices>();
            registerComponent.RegisterType<IRawMaterialServices, RawMaterialServices>();


            registerComponent.RegisterType<IproductService, productService>();
            registerComponent.RegisterType<IRawMaterialService, RawMaterialService>();
            registerComponent.RegisterType<IProductStockService, ProductStockService>();
            registerComponent.RegisterType<IUOMMasterService, UOMMasterService>();
            registerComponent.RegisterType<IWorkOrderMasterService, WorkOrderMasterService>();
            registerComponent.RegisterType<ICustomerService, CustomerService>();
            registerComponent.RegisterType<Irmstockservice, rawmaterialStockServices>();
            registerComponent.RegisterType<ISubCont, SubContService>(); 
            registerComponent.RegisterType<IsodmService, sodmService>();
            registerComponent.RegisterType<ISupplierservice, Supplierservice>();
            registerComponent.RegisterType<IPurchaseOrderService, PurchaseOrderService>();
            registerComponent.RegisterType<IBOMmasterServices, BOMmasterServices>();
            registerComponent.RegisterType<IBOM_DetailsServices, BOM_DetailsServices>();
            registerComponent.RegisterType<IBOM_DetailsServices, BOM_DetailsServices>();
            registerComponent.RegisterType<IworkOrderDetails, WorkOrderDetailsService>();
            registerComponent.RegisterType<IPOMasterService, POMasterService>();
            registerComponent.RegisterType<ISalesOrderService, SalesOrderService>();
        }
    }
}

