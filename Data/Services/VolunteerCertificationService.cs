using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class VolunteerCertificationService : IVolunteerCertificationService
    {
        public MySqlConnection con = WebApiConfig.conn();

        public void AddVolunteerCertification(VolunteerCertification volunteerCertificationObject)
        {
            Console.WriteLine(volunteerCertificationObject.VolunteerId);
            try
            {
                con.Open();
                var comm = con.CreateCommand();
                comm.CommandText = @"INSERT INTO volunteercertification (volunteerId, certificationName, certificationNote, certificationDate) 
                VALUES(@volunteerId, @certificationName, @certificationNote, @certificationDate) ";
                comm.Parameters.AddWithValue("?volunteerId", volunteerCertificationObject.VolunteerId);
                comm.Parameters.AddWithValue("?certificationName", volunteerCertificationObject.CertificationName);
                comm.Parameters.AddWithValue("?certificationNote", volunteerCertificationObject.CertificationNote);
                comm.Parameters.AddWithValue("?certificationDate", volunteerCertificationObject.CertificationDate);
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        public VolunteerCertification GetVolunteerCertification(VolunteerCertification volunteerCertificationObject)
        {
            VolunteerCertification volunteerCertification = null;
            List<VolunteerCertification> volunteerCertificationsList = null;

            string sql = "select * from volunteercertification where volunteerId=@volunteerId and certificationName=@certificationName";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.AddWithValue("@volunteerId", volunteerCertificationObject.VolunteerId);
                cmd.Parameters.AddWithValue("@certificationName", volunteerCertificationObject.CertificationName);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                volunteerCertificationsList = ds.Tables[0].AsEnumerable().Select(dataRow => new VolunteerCertification
                {
                    VolunteerId = dataRow.Field<int>("volunteerId"),
                    CertificationName = dataRow.Field<string>("certificationName"),
                    CertificationDate = dataRow.Field<DateTime>("certificationDate"),
                    CertificationNote = dataRow.Field<string>("certificationNote"),
                   
                }).ToList();
                if (volunteerCertificationsList.Count >= 1)
                {
                    volunteerCertification = volunteerCertificationsList.First();
                }

            }
            finally
            {
                con.Close();
            }
            return volunteerCertification;

        }
    }
}