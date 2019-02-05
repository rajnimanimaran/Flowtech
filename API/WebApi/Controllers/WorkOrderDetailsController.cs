using BusinessEntities.Master1.WorkOrderDetails;
using BusinessServices.Master1.WorkOrderDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace WebApi.Controllers
{
    public class WorkOrderDetailsController : ApiController
    {
        private readonly IworkOrderDetails _WODService;

        public WorkOrderDetailsController(BusinessServices.Master1.WorkOrderDetails.IworkOrderDetails Workorder)
        {
            _WODService = Workorder;
        }


        [HttpGet]
        [Route("AllWOD")]
        public HttpResponseMessage Get()
        {
            try
            {
                var Department = _WODService.GetAllWOD();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPost]
        [Route("Create")]
        public bool Post([FromBody]WorkOrderDetailsEntity WODEntity)
        {
            try
            {
                return _WODService.CreateWOD(WODEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPut]
        [Route("Modify")]
        public bool Put([FromBody]WorkOrderDetailsEntity WODEntity)
        {
            try
            {
                if (WODEntity.WorkItemID > 0)
                {

                    return _WODService.UpdateWOD(WODEntity.WorkItemID, WODEntity);
                }
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category not found", HttpStatusCode.NotFound);
            }
            return false;
        }
        [HttpDelete]
        [Route("Delete/{WorkItemID}")]
        public bool Delete(int WorkItemID)
        {
            HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.BadRequest, false);
            try
            {
                if (WorkItemID > 0)
                {
                    return _WODService.DeleteWOD(WorkItemID);
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
