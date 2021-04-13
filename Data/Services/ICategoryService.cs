using System.Collections.Generic;
namespace test.Data.Services
{
    public interface ICategoryService
    {
        // define all the methods that we are going to use
        List <Category> GetAllCategories();

    }
}