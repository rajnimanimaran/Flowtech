using BusinessEntities;
using BusinessEntities.Master1.SalesOrder;
using BusinessServices.Master1.POMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace WebApi.Controllers
{
    [RoutePrefix("PO")]
    public class POController : ApiController
    {
        private readonly IPOMasterService _POMasterService;

        public POController(IPOMasterService sodm)
        {
            _POMasterService = sodm;
        }


        [HttpGet]
        [Route("AllPO")]
        public HttpResponseMessage Get()
        {
            try
            {
                var Department = _POMasterService.GetAllsodm();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpGet]
        [Route("AllSupplierName")]
        public HttpResponseMessage GetSupplierName()
        {
            try
            {
                var Department = _POMasterService.GetAllSupplierName();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }

        [HttpGet]
        [Route("GetPoDetails")]
        public HttpResponseMessage Getpodetails(int PurchaseID)
        {
            try
            {
                var Department = _POMasterService.GetPurchaseOrderDetails(PurchaseID);

                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPost]
        [Route("Create")]
        public bool Post([FromBody]PurchaseOrderCommonEntity PurchaseOrderCommonEntity)
        {
            try
            {
                return _POMasterService.Create(PurchaseOrderCommonEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPut]
        [Route("Modify")]
        public bool Put([FromBody]PurchaseOrderCommonEntity purchaseMDEntity)
        {
            try
            {
                if (purchaseMDEntity.PurchaseID > 0)
                {
                    return _POMasterService.Update(purchaseMDEntity.PurchaseID, purchaseMDEntity);
                }
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Product not found", HttpStatusCode.NotFound);
            }
            return false;
        }
        [HttpDelete]
        [Route("Delete/{ID}/{PurchaseID}")]
        public bool Delete(int ID, int PurchaseID)
        {
            HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.BadRequest, false);
            try
            {
                if (ID > 0)
                {
                    return _POMasterService.Delete(ID, PurchaseID);
                }


            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Product not found", HttpStatusCode.NotFound);
            }
            return false;


        }


        [HttpGet]
        [Route("AllSO")]
        public HttpResponseMessage GetSo()
        {
            try
            {
                var Department = _POMasterService.GetAllpodm();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }


        [HttpGet]
        [Route("GetSoDetails")]
        public HttpResponseMessage Getsodetails(int OrderID)
        {
            try
            {
                var Department = _POMasterService.GetSalesOrderDetails(OrderID);

                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }

        //[HttpGet]
        //[Route("AllSupplierName")]
        //public HttpResponseMessage GetSupplierName()
        //{
        //    try
        //    {
        //        var Department = _SalesOrderService.GetAllSupplierName();
        //        return Request.CreateResponse(HttpStatusCode.OK, Department);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
        //    }
        //}
        [HttpPost]
        [Route("Creates")]
        public bool Post([FromBody]SalesOrderCommonEntity SalesOrderCommonEntity)
        {
            try
            {
                return _POMasterService.Create(SalesOrderCommonEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
        }

    }
}
