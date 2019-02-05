using BusinessEntities.Master1.WorkOrderDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessServices.Master1.WorkOrderDetails
{
  public  interface IworkOrderDetails
    {
        IEnumerable<WorkOrderDetailsEntity> GetAllWOD();
        bool CreateWOD(WorkOrderDetailsEntity obj);
        bool UpdateWOD(int WorkItemID, WorkOrderDetailsEntity obj);
        bool DeleteWOD(int WorkItemID);

    }
}
