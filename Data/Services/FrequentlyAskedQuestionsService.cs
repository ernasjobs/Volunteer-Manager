using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class FrequentlyAskedQuestionsService : IFrequentlyAskedQuestion
    {
        public MySqlConnection con = WebApiConfig.conn();
        public List<FrequentlyAskedQuestion> GetAllFaqs()
        {
            List<FrequentlyAskedQuestion> faqsList = null;
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from frequentlyaskedquestion", con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                faqsList = ds.Tables[0].AsEnumerable().Select(dataRow => new FrequentlyAskedQuestion
                {
                   // Id = dataRow.Field<int>("id"),
                    Title = dataRow.Field<string>("question"),
                    Content = dataRow.Field<string>("answer")
                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return faqsList;
        }
       
    }
}