using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class VolunteerStatusService : IVolunteerStatusService
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<VolunteerStatus> GetAllVolunteerStatuses()
        {
            List<VolunteerStatus> volunteersList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from volunteerstatus", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                volunteersList = ds.Tables[0].AsEnumerable().Select(dataRow => new VolunteerStatus
                {
                    VolunteerStatusName = dataRow.Field<string>("statusName"),
                    VolunteerStatusDescription = dataRow.Field<string>("statusDescription")
                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return volunteersList;
        }
       
    }
}