using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class EventStatusService : IEventStatusService
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<EventStatus> GetAllEventStatuses()
        {
            List<EventStatus> eventStatusesList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from eventstatus", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventStatusesList = ds.Tables[0].AsEnumerable().Select(dataRow => new EventStatus
                {
                    EventStatusName = dataRow.Field<string>("statusName"),
                    EventStatusDescription = dataRow.Field<string>("statusDescription")
                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return eventStatusesList;
        }
       
    }
}