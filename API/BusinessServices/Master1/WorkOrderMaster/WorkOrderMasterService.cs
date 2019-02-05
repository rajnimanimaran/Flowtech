using BusinessEntities.Master1.WorkOrder_Master;
using DataModel.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessServices.Master1.WorkOrderMaster
{
    public class WorkOrderMasterService : IWorkOrderMasterService
    {

        private readonly IUnitOfWork _unitOfWork;

        public WorkOrderMasterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<WorkOrderMasterEntity> GetAllWorkOrder()
        {
            SqlCommand cmd = new SqlCommand("SO_spGetWorkOrder");
            cmd.CommandType = CommandType.StoredProcedure;
            var locMas = _unitOfWork.DbLayer.GetEntityList<WorkOrderMasterEntity>(cmd);
            return locMas;
        }

        public IEnumerable<SubContractMasterEntity> GetAllSubContract()
        {
            SqlCommand cmd = new SqlCommand("SO_getSubcontract");
            cmd.CommandType = CommandType.StoredProcedure;
            var SubContract = _unitOfWork.DbLayer.GetEntityList<SubContractMasterEntity>(cmd);
            return SubContract;
        }

        public bool Create(WorkOrderMasterEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("SO_spSaveWorkOrder");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@p_WONumber", obj.WONumber);
            cmd.Parameters.AddWithValue("@p_OrderID", obj.OrderID);
            cmd.Parameters.AddWithValue("@p_SubConID", obj.subContID);
            cmd.Parameters.AddWithValue("@p_AssignedDate", obj.AssignedDate);
            cmd.Parameters.AddWithValue("@p_Status", obj.Status);
            cmd.Parameters.AddWithValue("@p_ExpectedCompleteDate", obj.ExpectedCompleteDate);
            cmd.Parameters.AddWithValue("@p_ActionBy", obj.ActionBy);
            //cmd.Parameters.AddWithValue("@IsActive", obj.IsActive);
            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;
        }
        public bool Update(int WOID, WorkOrderMasterEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("[SO_spSaveWorkOrder]");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@p_WOID", obj.WOID);
            cmd.Parameters.AddWithValue("@p_WONumber", obj.WONumber);
            cmd.Parameters.AddWithValue("@p_OrderID", obj.OrderID);
            cmd.Parameters.AddWithValue("@p_SubConID", obj.subContID);
            cmd.Parameters.AddWithValue("@p_AssignedDate", obj.AssignedDate);
            cmd.Parameters.AddWithValue("@p_Status", obj.Status);
            cmd.Parameters.AddWithValue("@p_ExpectedCompleteDate", obj.ExpectedCompleteDate);
            cmd.Parameters.AddWithValue("@p_ActionBy", obj.ActionBy);
            cmd.Parameters.AddWithValue("@P_IsActive", obj.IsActive);
            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;

        }
        public bool Delete(int WOID)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("SO_spRemoveWorkOrder");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@p_WOID", WOID);
            var locMax = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMax != Int32.MaxValue)
            {
                res = true;
            }
            return res;

        }

    }
}
