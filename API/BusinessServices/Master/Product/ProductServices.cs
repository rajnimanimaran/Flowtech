using AutoMapper;
using BusinessEntities;
using DataModel.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities.Master1.Product;

namespace BusinessServices
{
    public class ProductServices : IProductServices
    {
        private readonly UnitOfWork _unitOfWork;

        public ProductServices(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //public List<ProductEntity> GetProductById(int ProductId)
        //{
        //    SqlCommand cmd = new SqlCommand("selectdata");

        //    cmd.Parameters.AddWithValue("@ProductId", ProductId);


        //    cmd.CommandType = CommandType.StoredProcedure;

        //    var locMas = _unitOfWork.DbLayer.GetEntityList<ProductEntity>(cmd);

        //    return locMas;
        //}


        public IEnumerable<ProductEntity> GetAllProducts()
        {
            SqlCommand cmd = new SqlCommand("sp_Select_productMaster");
            cmd.CommandType = CommandType.StoredProcedure;
            var locMas = _unitOfWork.DbLayer.GetEntityList<ProductEntity>(cmd);

            return locMas;

        }

        public IEnumerable<UOMMasterEntity> GetUOMMaster()
        {
            SqlCommand cmd = new SqlCommand("spGetUOM_Master");
            cmd.CommandType = CommandType.StoredProcedure;
            var uom = _unitOfWork.DbLayer.GetEntityList<UOMMasterEntity>(cmd);

            return uom;

        }

        public bool CreateProduct(ProductEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("sp_Insert_productMaster");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProductName", obj.ProductName);
            cmd.Parameters.AddWithValue("@CreatedBy", obj.CreatedBy);
            var locMas = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMas != Int32.MaxValue)
            {
                res = true;
            }
            return res;
        }

        public bool UpdateProduct(int ProductId, ProductEntity obj)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("sp_Update_productMaster");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProductId", obj.ProductId);
            cmd.Parameters.AddWithValue("@ProductName", obj.ProductName);
            cmd.Parameters.AddWithValue("@ModifiedBy", obj.ModifiedBy);
            cmd.Parameters.AddWithValue("@ModifiedOn", DateTime.Now);
            var locMas = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMas != Int32.MaxValue)
            {
                res = true;
            }
            return res;
        }

        public bool DeleteProduct(int ProductId)
        {
            bool res = false;
            SqlCommand cmd = new SqlCommand("sp_Delete_productMaster");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProductId", ProductId);
            var locMas = _unitOfWork.DbLayer.ExecuteNonQuery(cmd);
            if (locMas != Int32.MaxValue)
            {
                res = true;
            }
            return res;
        }





    }
}
