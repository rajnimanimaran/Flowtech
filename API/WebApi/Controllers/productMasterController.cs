using BusinessEntities.Master1.Product;
using BusinessServices.Master1.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace WebApi.Controllers
{
    [RoutePrefix("ProductMaster")]
    public class productMasterController : ApiController
    {

        private readonly IproductService _productService;

        public productMasterController(BusinessServices.Master1.Product.IproductService product)
        {
            _productService = product;
        }


        [HttpGet]
        [Route("Allproduct")]
        public HttpResponseMessage Get()
        {
            try
            {
                var Department = _productService.GetAllproduct();
                return Request.CreateResponse(HttpStatusCode.OK, Department);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Department Not Found", HttpStatusCode.NotFound);
            }
        }

        [HttpGet]
        [Route("GetproductMaster")]
        public HttpResponseMessage GetProductMaster()
        {
            try
            {
                var product = _productService.GetProductMaster();
                return Request.CreateResponse(HttpStatusCode.OK, product);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Role Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPost]
        [Route("Create")]
        public bool Post([FromBody]productEntity productEntity)
        {
            try
            {
                return _productService.Createproduct(productEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category Not Found", HttpStatusCode.NotFound);
            }
        }
        [HttpPut]
        [Route("Modify")]
        public bool Put([FromBody]productEntity productEntity)
        {
            try
            {
                if (productEntity.prdID > 0)
                {

                    return _productService.Updateproduct(productEntity.prdID, productEntity);
                }
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Category not found", HttpStatusCode.NotFound);
            }
            return false;
        }
        [HttpDelete]
        [Route("Delete/{prdID}")]
        public bool Delete(int prdID)
        {
            HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.BadRequest, false);
            try
            {
                if (prdID > 0)
                {
                    return _productService.Deleteproduct(prdID);
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
