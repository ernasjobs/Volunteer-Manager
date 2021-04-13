using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class RoleService : IRoleService
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<Role> GetAllRoles()
        {
            List<Role> rolesList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from role", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                rolesList = ds.Tables[0].AsEnumerable().Select(dataRow => new Role
                {
                    RoleName = dataRow.Field<string>("roleName"),
                    RoleDescription = dataRow.Field<string>("roleDescription")
                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return rolesList;
        }
       
    }
}