using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities.Master1.WorkOrderDetails
{
   public class WorkOrderDetailsEntity
    {
        public int WorkItemID { get; set; }
        public int OrderItemID { get; set; }
        public int prdID { get; set; }
        public int Quantity { get; set; }
        public int UOMID { get; set; }
        public byte Status { get; set; }
        public int ActionBy { get; set; }
        public byte IsActive { get; set; }

    }
}
