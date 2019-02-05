using BusinessEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities.Master1.Product;

namespace BusinessServices
{
    public interface IProductServices
    {
        //ProductEntity GetProductById(int ProductId);
        IEnumerable<ProductEntity> GetAllProducts();
        bool CreateProduct(ProductEntity obj);
        bool UpdateProduct(int ProductId, ProductEntity obj);
        bool DeleteProduct(int ProductId);
        IEnumerable<UOMMasterEntity> GetUOMMaster();

    }
}
