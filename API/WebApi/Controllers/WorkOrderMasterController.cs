using BusinessEntities.Master1.WorkOrder_Master;
using BusinessServices.Master1.WorkOrderMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace WebApi.Controllers
{

    [RoutePrefix("WorkOrderMaster")]
    public class WorkOrderMasterController : ApiController
    {
        private readonly IWorkOrderMasterService _WorkOrderMasterService;


        public WorkOrderMasterController(IWorkOrderMasterService WorkOrder)
        {
            _WorkOrderMasterService = WorkOrder;
        }


        [HttpGet]
        [Route("AllWorkOrder")]
        public HttpResponseMessage Get()
        {
            try
            {
                var Department = _WorkOrderMasterService.GetAllWorkOrder();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpGet]
        [Route("GetWorkOrderMaster")]
        public HttpResponseMessage GetWorkOrder()
        {
            try
            {
                var WorkOrder = _WorkOrderMasterService.GetAllSubContract();
                return Request.CreateResponse(HttpStatusCode.OK, WorkOrder);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPost]
        [Route("Create")]
        public bool Post([FromBody]WorkOrderMasterEntity workOrderMasterEntity)
        {
            try
            {
                return _WorkOrderMasterService.Create(workOrderMasterEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPut]
        [Route("Modify")]
        public bool Put([FromBody]WorkOrderMasterEntity WorkOrderMasterEntity)
        {
            try
            {
                if (WorkOrderMasterEntity.WOID > 0)
                {

                    return _WorkOrderMasterService.Update(WorkOrderMasterEntity.WOID, WorkOrderMasterEntity);
                }
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category not found", HttpStatusCode.NotFound);
            }
            return false;
        }
        [HttpDelete]
        [Route("Delete/{WOID}")]
        public bool Delete(int WOID)
        {
            HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.BadRequest, false);
            try
            {
                if (WOID > 0)
                {
                    return _WorkOrderMasterService.Delete(WOID);
                }

            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
            return false;
        }


    }
}





   