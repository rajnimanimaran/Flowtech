using BusinessEntities.Master1.WorkOrder_Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessServices.Master1.WorkOrderMaster
{
    public interface IWorkOrderMasterService
    {
        IEnumerable<WorkOrderMasterEntity> GetAllWorkOrder();
        bool Create(WorkOrderMasterEntity obj);
        bool Update(int WOID, WorkOrderMasterEntity obj);
        bool Delete(int WOID);
        IEnumerable<SubContractMasterEntity> GetAllSubContract();
    }
}
