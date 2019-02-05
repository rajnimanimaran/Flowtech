using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities.Master1.SalesOrder
{
    public class SalesGetEntity
    {
        public int OrderID { get; set; }
        public int ID { get; set; }
        public string OrderItemID { get; set; }
      //  public int CustomerID { get; set; }
       // public string OrderTakenBy { get; set; }
        public int OrderNumber { get; set; }
        public string CODE { get; set; }
        public DateTime OrderDate { get; set; }
        public int SupplierID { get; set; }
        public string SName { get; set; }
        public DateTime ACKDate { get; set; }
        public string AssignedTo { get; set; }
        public int? prdID { get; set; }
        public string prdName { get; set; }
        public int Quantity { get; set; }
        public int? UOMID { get; set; }
        public string UOMName { get; set; }
        public decimal? GSTNO { get; set; }
        public int Rate { get; set; }
        public int Tax { get; set; }
        public decimal Amount { get; set; }
        public decimal? T_Amount { get; set; }
    }
    public class SalesOrderCommonEntity
    {
        public int OrderID { get; set; }
        public int OrderNumber { get; set; }
        public string CODE { get; set; }
        public int SupplierID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ACKDate { get; set; }
      //  public string OrderTakenBy { get; set; }
        public string AssignedTo { get; set; }
        public int ActionBy { get; set; }
        public bool IsActive { get; set; }
        public string OrderDetails { get; set; }
    }
    public class getSuppliername
    {
        public int SID { get; set; }
        public string SName { get; set; }
    }
    public class GetSalesOrderDetails
    {
        public SalesOrders SalesOrder { get; set; }
        public List<SalesOrderDetails> SalesOrderDetails { get; set; }
    }
    public class SalesOrders
    {
        public int OrderID { get; set; }
        public int OrderNumber { get; set; }
        public string CODE { get; set; }
        public int SupplierID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ACKDate { get; set; }
       // public string OrderTakenBy { get; set; }
        public string AssignedTo { get; set; }
    }
    public class SalesOrderDetails
    {
        public int OrderID { get; set; }
        public string OrderItemID { get; set; }
        public int prdID { get; set; }
        public int Quantity { get; set; }
        public int UOMID { get; set; }
        public string GSTNO { get; set; }
        public int Rate { get; set; }
        public int Tax { get; set; }
        public decimal Amount { get; set; }
        public decimal T_Amount { get; set; }
        public bool Status { get; set; }
        public string AssignedTo { get; set; }
    }
}
