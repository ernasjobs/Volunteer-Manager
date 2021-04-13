using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class CategoryService : ICategoryService
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<Category> GetAllCategories()
        {
            List<Category> categoriesList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from category", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                categoriesList = ds.Tables[0].AsEnumerable().Select(dataRow => new Category
                {
                    CategoryName = dataRow.Field<string>("categoryName"),
                    CategoryDescription = dataRow.Field<string>("categoryDescription"),
                    Image = dataRow.Field<string>("image")

                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return categoriesList;
        }
       
    }
}