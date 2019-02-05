using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities.Master1.WorkOrder_Master
{
   public class WorkOrderMasterEntity
    {
        public int WOID { get; set; }
        public int WONumber { get; set; }
        public int OrderID { get; set; }
        public int subContID { get; set; }
    
        public string Name { get; set; }
        public DateTime AssignedDate { get; set; }
        public bool Status { get; set; }
        public DateTime ExpectedCompleteDate { get; set; }
        public int ActionBy { get; set; }
        public bool IsActive { get; set; }
    }
    public class SubContractMasterEntity
    {
        public int subContID { get; set; }
        public string Name { get; set; }
    }
}
