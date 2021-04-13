using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class CertificationService : ICertificationService
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<Certification> GetCertifications()
        {
            List<Certification> certificationsList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from certification", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                certificationsList = ds.Tables[0].AsEnumerable().Select(dataRow => new Certification
                {
                    CertificationName = dataRow.Field<string>("certificationName"),
                    CertificationDetails = dataRow.Field<string>("certificationDetails"),
                    ValidityPeriod = dataRow.Field<string>("validityPeriod")

                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return certificationsList;
        }
       
    }
}