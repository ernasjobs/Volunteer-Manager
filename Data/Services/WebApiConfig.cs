using MySqlConnector;

namespace test.Data.Services
{
    public class WebApiConfig
    {
        public static MySqlConnection conn()
        {
            //string conn_string = "server=localhost;port=3306;database=ps;username=root;password=;";
            string conn_string = "server=mysql5044.site4now.net;port=3306;database=db_a70a8c_ernasjo;username=a70a8c_ernasjo;password=Ernasp1991;";
            MySqlConnection conn = new MySqlConnection(conn_string);

            return conn;
        }
    }
}