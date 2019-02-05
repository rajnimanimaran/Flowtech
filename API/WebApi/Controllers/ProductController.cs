using BusinessEntities;
using BusinessServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace WebApi.Controllers
{
    [RoutePrefix("Product")]
    public class ProductController : ApiController
    {
        private readonly IProductServices _productServices;

        public ProductController(IProductServices product)
        {
            _productServices = product;
        }

        [HttpGet]
        [Route("AllProducts")]
        public HttpResponseMessage Get()
        {
            try
            {
                var Product = _productServices.GetAllProducts();
                return Request.CreateResponse(HttpStatusCode.OK, Product);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Role Not Found", HttpStatusCode.NotFound);
            }
        }

        [HttpGet]
        [Route("GetUOMMaster")]
        public HttpResponseMessage GetUOMMaster()
        {
            try
            {
                var Uom = _productServices.GetUOMMaster();
                return Request.CreateResponse(HttpStatusCode.OK, Uom);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Role Not Found", HttpStatusCode.NotFound);
            }
        }

        //[HttpPost]
        //[Route("GetProductId/{id}")]
        //public HttpResponseMessage GetById(int id)
        //{
        //    if (id != null)
        //    {
        //        var Product = _productServices.GetProductById(id);
        //        if (Product != null)
        //            return Request.CreateResponse(HttpStatusCode.OK, Product);
        //        throw new ApiDataException(1001, "No product found for this id.", HttpStatusCode.NotFound);
        //    }
        //    throw new ApiException()
        //    {
        //        ErrorCode = (int)HttpStatusCode.BadRequest,
        //        ErrorDescription = "Bad Request..."
        //    };
        //}


        [HttpPost]
        [Route("Create")]
        public bool Post([FromBody]ProductEntity productEntity)
        {
            try
            {
                return _productServices.CreateProduct(productEntity);
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Product Not Found", HttpStatusCode.NotFound);
            }
        }

        [HttpPut]
        [Route("Modify")]
        public bool Put([FromBody]ProductEntity productEntity)
        {
            try
            {
                if (productEntity.ProductId > 0)
                {
                    return _productServices.UpdateProduct(productEntity.ProductId, productEntity);
                }
            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Product not found", HttpStatusCode.NotFound);
            }
            return false;
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public bool Delete(int id)
        {
            HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.BadRequest, false);
            try
            {
                if (id > 0)
                {
                    return _productServices.DeleteProduct(id);
                }

            }
            catch (Exception ex)
            {
                throw new ApiDataException(1000, "Product not found", HttpStatusCode.NotFound);
            }
            return false;

        }

    }
}
