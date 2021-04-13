using System;
using System.Data;
using MySqlConnector;
namespace test.Data.Services
{
    public class VolunteerEventService : IVolunteerEventService
    {
        public MySqlConnection con = WebApiConfig.conn();

        public void AddVolunteerEvent(VolunteerEvent volunteerEventObject)
        {
            Console.WriteLine(volunteerEventObject.VolunteerId);
            try
            {
                con.Open();
                string status = "In Progress";
                int count = 0;
                do
                {
                    string sql =
                         @"update event 
                        set eventStatus = @eventStatus
                                where eventNumber = @id
                        ";
                    MySqlCommand comm1 = new MySqlCommand(sql, con);
                    comm1.Parameters.AddWithValue("?eventStatus", status);
                    comm1.Parameters.AddWithValue("?id", volunteerEventObject.Id);
                    comm1.CommandType = CommandType.Text;
                    comm1.ExecuteNonQuery();
                    count++;
                } while (count < 1);
                var comm = con.CreateCommand();
                comm.CommandText = @"INSERT INTO volunteerevent (eventNumber, volunteerId, volunteerEventAttended, volunteerEventNote) 
                VALUES(@eventNumber, @volunteerId, @volunteerEventAttended, @volunteerEventNote) ";
                comm.Parameters.AddWithValue("?eventNumber", volunteerEventObject.Id);
                comm.Parameters.AddWithValue("?volunteerId", volunteerEventObject.VolunteerId);
                comm.Parameters.AddWithValue("?volunteerEventAttended", volunteerEventObject.VolunteerEventAttended);
                comm.Parameters.AddWithValue("?volunteerEventNote", volunteerEventObject.VolunteerEventNote);
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        public void LeaveEvent(VolunteerEvent volunteerEventObject)
        {
            try
            {
                con.Open();
                var comm = con.CreateCommand();
                comm.CommandText = "DELETE FROM volunteerevent WHERE eventNumber = @eventNumber AND volunteerId = @volunteerId";
                comm.Parameters.AddWithValue("?eventNumber", volunteerEventObject.Id);
                comm.Parameters.AddWithValue("?volunteerId", volunteerEventObject.VolunteerId);
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
    }
}