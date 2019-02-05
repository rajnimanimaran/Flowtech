using BusinessEntities.Master1.WorkOrderDetails;
using DataModel.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessServices.Master1.WorkOrderDetails
{
   public class WorkOrderDetailsService : IworkOrderDetails
    {
        private readonly IUnitOfWork _unitOfWork;

        public WorkOrderDetailsService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<WorkOrderDetailsEntity> GetAllWOD()
        {
            SqlCommand cmd = new SqlCommand("WOD_spGetWorkOrderDetails");
            cmd.CommandType = CommandType.StoredProcedure;
            var locMas = _unitOfWork.DbLayer.GetEntityList<WorkOrderDetailsEntity>(cmd);
            return locMas;
        }
        public bool CreateWOD(WorkOrderDetailsEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("WOD_spSaveWorkOrderDetails");
            cmd.CommandType = CommandType.StoredProcedure;
            // cmd.Parameters.AddWithValue("@p_WorkItemID", obj.WorkItemID);
            cmd.Parameters.AddWithValue("@p_OrderItemID", obj.OrderItemID);
            cmd.Parameters.AddWithValue("@p_prdID", obj.prdID);
            cmd.Parameters.AddWithValue("@p_UOMID", obj.UOMID);
            cmd.Parameters.AddWithValue("@p_Status", obj.Status);
            cmd.Parameters.AddWithValue("@p_ActionBy", obj.ActionBy);

            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;
        }
        public bool UpdateWOD(int WorkItemID, WorkOrderDetailsEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("WOD_spSaveWorkOrderDetails");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@p_WorkItemID", obj.WorkItemID);
            cmd.Parameters.AddWithValue("@p_OrderItemID", obj.OrderItemID);
            cmd.Parameters.AddWithValue("@p_prdID", obj.prdID);
            cmd.Parameters.AddWithValue("@p_UOMID", obj.UOMID);
            cmd.Parameters.AddWithValue("@p_Status", obj.Status);
            cmd.Parameters.AddWithValue("@p_ActionBy", obj.ActionBy);
            cmd.Parameters.AddWithValue("@p_IsActive", obj.IsActive);
            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;

        }
        public bool DeleteWOD(int WorkItemID)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("WOD_spRemoveWorkOrderDetails");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@p_WorkItemID", WorkItemID);
            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;

        }

    }
}
