using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using MySqlConnector;
using BC = BCrypt.Net.BCrypt;
namespace test.Data.Services
{
    public class UserService : IUserService
    {
        public MySqlConnection con = WebApiConfig.conn();
        
        public List<User> GetAllUsers(string status)
        {
            List<User> usersList = null;
            try
            {
                con.Open();
              
                MySqlCommand cmd = new MySqlCommand("select * from volunteer where statusName = @userStatus", con);
                cmd.CommandType = System.Data.CommandType.Text;
                 cmd.Parameters.AddWithValue("@userStatus", status);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                usersList = ds.Tables[0].AsEnumerable().Select(dataRow => new User
                {
                    Id = dataRow.Field<int>("volunteerId"),
                    FirstName = dataRow.Field<string>("firstName"),
                    LastName = dataRow.Field<string>("lastname"),
                    Address1 = dataRow.Field<string>("address1"),
                    Address2 = dataRow.Field<string>("address2"),
                    Postcode = dataRow.Field<string>("postcode"),
                    Email = dataRow.Field<string>("email"),
                    Password = dataRow.Field<string>("password"),
                    MobileNumber = dataRow.Field<string>("mobileNumber"),
                    Weight = (int)dataRow.Field<short>("weight"),
                    NextofKinFullName = dataRow.Field<string>("noKinFullName"),
                    NextofKinMobileNumber = dataRow.Field<string>("noKinMobileNumber"),
                    NextofKinRelationship = dataRow.Field<string>("noKinRelationship"),
                    Status = dataRow.Field<string>("statusName"),
                    Role = dataRow.Field<string>("roleName"),
                    MedicalConditions = dataRow.Field<string>("medicalConditions"),
                    CriminalOffence = dataRow.Field<bool>("criminalOffence"),
                    ActivationCode = dataRow.Field<string>("activationCode"),
                    EmailVerified = dataRow.Field<bool>("emailVerified")

                }).ToList();
            }
            finally
            {
                con.Close();
            }
            return usersList;
        }
        public User Login(Login login)
        {
            User user = null;
            try
            {

                con.Open();
                string loginQuery = "select * from volunteer where email = @username";
                MySqlCommand cmd = new MySqlCommand(loginQuery, con);
                cmd.Parameters.AddWithValue("@username", login.Email);
                // cmd.Parameters.AddWithValue("@password", login.Password);
                MySqlDataReader rdr = cmd.ExecuteReader();

                //   Console.WriteLine(login.Password);
                //  Console.WriteLine( rdr["password"].ToString());

                while (rdr.Read())
                {
                    Console.WriteLine(rdr["password"].ToString());
                    bool verified = BCrypt.Net.BCrypt.Verify(login.Password, rdr["password"].ToString());
                    bool emailConfirmed = (bool)rdr["emailVerified"];
                    if (verified)
                    {

                        user = new User
                        {
                            Id = Convert.ToInt32(rdr["volunteerId"]),
                            FirstName = rdr["firstName"].ToString(),
                            LastName = rdr["lastName"].ToString(),
                            Address1 = rdr["address1"].ToString(),
                            Address2 = rdr["address2"].ToString(),
                            Postcode = rdr["postcode"].ToString(),
                            Email = rdr["email"].ToString(),
                            Password = rdr["password"].ToString(),
                            MobileNumber = rdr["mobileNumber"].ToString(),
                            Weight = (int)(short)rdr["weight"],
                            NextofKinFullName = rdr["noKinFullName"].ToString(),
                            NextofKinMobileNumber = rdr["noKinMobileNumber"].ToString(),
                            NextofKinRelationship = rdr["noKinRelationship"].ToString(),
                            Status = rdr["statusName"].ToString(),
                            Role = rdr["roleName"].ToString(),
                            MedicalConditions = rdr["medicalConditions"].ToString(),
                            CriminalOffence = (bool)rdr["criminalOffence"],
                            ActivationCode = rdr["activationCode"].ToString(),
                            EmailVerified = (bool)rdr["emailVerified"]
                        };
                    }
                }

            }
            finally
            {
                con.Close();
            }
            return user;
        }
        public User VerifyUser(Login login)
        {
            User user = null;
            try
            {
                con.Open();
                string loginQuery = "select * from volunteer where email = @username ";
                MySqlCommand cmd = new MySqlCommand(loginQuery, con);
                cmd.Parameters.AddWithValue("@username", login.Email);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    user = new User
                    {
                        Id = Convert.ToInt32(rdr["volunteerId"]),
                        FirstName = rdr["firstName"].ToString(),
                        LastName = rdr["lastName"].ToString(),
                        Address1 = rdr["address1"].ToString(),
                        Address2 = rdr["address2"].ToString(),
                        Postcode = rdr["postcode"].ToString(),
                        Email = rdr["email"].ToString(),
                        Password = rdr["password"].ToString(),
                        MobileNumber = rdr["mobileNumber"].ToString(),
                        Weight = (int)(short)rdr["weight"],
                        NextofKinFullName = rdr["noKinFullName"].ToString(),
                        NextofKinMobileNumber = rdr["noKinMobileNumber"].ToString(),
                        NextofKinRelationship = rdr["noKinRelationship"].ToString(),
                        Status = rdr["statusName"].ToString(),
                        Role = rdr["roleName"].ToString(),
                        MedicalConditions = rdr["medicalConditions"].ToString(),
                        CriminalOffence = (bool)rdr["criminalOffence"],
                        ActivationCode = rdr["activationCode"].ToString(),
                        EmailVerified = (bool)rdr["emailVerified"]
                    };
                }

            }
            finally
            {
                con.Close();
            }
            return user;
        }

        public User GetUserById(int userId)
        {
            User user = null;
            List<User> usersList = null;
            string sql = "select * from volunteer where volunteerId=" + userId + "";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                usersList = ds.Tables[0].AsEnumerable().Select(dataRow => new User
                {
                    Id = dataRow.Field<int>("volunteerId"),
                    FirstName = dataRow.Field<string>("firstName"),
                    LastName = dataRow.Field<string>("lastname"),
                    Address1 = dataRow.Field<string>("address1"),
                    Address2 = dataRow.Field<string>("address2"),
                    Postcode = dataRow.Field<string>("postcode"),
                    Email = dataRow.Field<string>("email"),
                    Password = dataRow.Field<string>("password"),
                    MobileNumber = dataRow.Field<string>("mobileNumber"),
                    Weight = (int)dataRow.Field<short>("weight"),
                    NextofKinFullName = dataRow.Field<string>("noKinFullName"),
                    NextofKinMobileNumber = dataRow.Field<string>("noKinMobileNumber"),
                    NextofKinRelationship = dataRow.Field<string>("noKinRelationship"),
                    Status = dataRow.Field<string>("statusName"),
                    Role = dataRow.Field<string>("roleName"),
                    MedicalConditions = dataRow.Field<string>("medicalConditions"),
                    CriminalOffence = dataRow.Field<bool>("criminalOffence"),
                    ActivationCode = dataRow.Field<string>("activationCode"),
                    EmailVerified = dataRow.Field<bool>("emailVerified")
                }).ToList();
                if (usersList.Count >= 1)
                {
                    user = usersList.First();
                }
            }
            finally
            {
                con.Close();
            }
            return user;
        }
        public User GetUserByToken(string token)
        {
            User user = null;
            List<User> usersList = null;
            string sql = "select * from volunteer where activationCode='" + token + "'";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                usersList = ds.Tables[0].AsEnumerable().Select(dataRow => new User
                {
                    Id = dataRow.Field<int>("volunteerId"),
                    FirstName = dataRow.Field<string>("firstName"),
                    LastName = dataRow.Field<string>("lastname"),
                    Address1 = dataRow.Field<string>("address1"),
                    Address2 = dataRow.Field<string>("address2"),
                    Postcode = dataRow.Field<string>("postcode"),
                    Email = dataRow.Field<string>("email"),
                    Password = dataRow.Field<string>("password"),
                    MobileNumber = dataRow.Field<string>("mobileNumber"),
                    Weight = (int)dataRow.Field<short>("weight"),
                    NextofKinFullName = dataRow.Field<string>("noKinFullName"),
                    NextofKinMobileNumber = dataRow.Field<string>("noKinMobileNumber"),
                    NextofKinRelationship = dataRow.Field<string>("noKinRelationship"),
                    Status = dataRow.Field<string>("statusName"),
                    Role = dataRow.Field<string>("roleName"),
                    MedicalConditions = dataRow.Field<string>("medicalConditions"),
                    CriminalOffence = dataRow.Field<bool>("criminalOffence"),
                    ActivationCode = dataRow.Field<string>("activationCode"),
                    EmailVerified = dataRow.Field<bool>("emailVerified")
                }).ToList();
                if (usersList.Count >= 1)
                {
                    user = usersList.First();
                }
            }
            finally
            {
                con.Close();
            }
            return user;
        }
        public User GetUserByEmail(string email)
        {
            User user = null;
            List<User> usersList = null;
            string sql = "select * from volunteer where email='" + email + "'";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                usersList = ds.Tables[0].AsEnumerable().Select(dataRow => new User
                {
                    Id = dataRow.Field<int>("volunteerId"),
                    FirstName = dataRow.Field<string>("firstName"),
                    LastName = dataRow.Field<string>("lastname"),
                    Address1 = dataRow.Field<string>("address1"),
                    Address2 = dataRow.Field<string>("address2"),
                    Postcode = dataRow.Field<string>("postcode"),
                    Email = dataRow.Field<string>("email"),
                    Password = dataRow.Field<string>("password"),
                    MobileNumber = dataRow.Field<string>("mobileNumber"),
                    Weight = (int)dataRow.Field<short>("weight"),
                    NextofKinFullName = dataRow.Field<string>("noKinFullName"),
                    NextofKinMobileNumber = dataRow.Field<string>("noKinMobileNumber"),
                    NextofKinRelationship = dataRow.Field<string>("noKinRelationship"),
                    Status = dataRow.Field<string>("statusName"),
                    Role = dataRow.Field<string>("roleName"),
                    MedicalConditions = dataRow.Field<string>("medicalConditions"),
                    CriminalOffence = dataRow.Field<bool>("criminalOffence"),
                    ActivationCode = dataRow.Field<string>("activationCode"),
                    EmailVerified = dataRow.Field<bool>("emailVerified")
                }).ToList();
                if (usersList.Count >= 1)
                {
                    user = usersList.First();
                }

            }
            finally
            {
                con.Close();
            }
            return user;
        }

        public void AddUser(User user)
        {

            try
            {
                con.Open();
                string userQuery = "select * from volunteer where email = @username";
                MySqlCommand cmd = new MySqlCommand(userQuery, con);
                cmd.Parameters.AddWithValue("@username", user.Email);
                // cmd.Parameters.AddWithValue("@password", login.Password);
                MySqlDataReader rdr = cmd.ExecuteReader();
                int count = 0;
                while (rdr.Read())
                {
                    // Use the row data, presumably
                    count++;
                }
                con.Close();
                Console.WriteLine(count);
                if (count == 0)
                {
                    con.Open();
                    var hashedPassword = BC.HashPassword(user.Password);
                    // Console.WriteLine(activationCode);
                    //Console.WriteLine( hashedPassword);
                    var comm = con.CreateCommand();
                    comm.CommandText = @"INSERT INTO volunteer (firstName, lastName, address1, address2, postcode, email, password, mobileNumber, weight, noKinFullName, noKinMobileNumber,
                 noKinRelationship, statusName,roleName, medicalConditions, criminalOffence, activationCode, emailVerified) 
                VALUES(@firstName, @lastName, @address1, @address2, @postcode,@email, @password, @mobileNumber, @weight, @noKinFullName
                ,@noKinMobileNumber, @noKinRelationship, @statusName, @roleName, @medicalConditions, @criminalOffence, @activationCode, @emailVerified) ";
                    comm.Parameters.AddWithValue("?firstName", user.FirstName);
                    comm.Parameters.AddWithValue("?lastName", user.LastName);
                    comm.Parameters.AddWithValue("?address1", user.Address1);
                    comm.Parameters.AddWithValue("?address2", user.Address2);
                    comm.Parameters.AddWithValue("?postcode", user.Postcode);
                    comm.Parameters.AddWithValue("?email", user.Email);
                    comm.Parameters.AddWithValue("?password", hashedPassword);
                    comm.Parameters.AddWithValue("?mobileNumber", user.MobileNumber);
                    comm.Parameters.AddWithValue("?weight", user.Weight);
                    comm.Parameters.AddWithValue("?noKinFullName", user.NextofKinFullName);
                    comm.Parameters.AddWithValue("?noKinMobileNumber", user.NextofKinMobileNumber);
                    comm.Parameters.AddWithValue("?noKinRelationship", user.NextofKinRelationship);
                    comm.Parameters.AddWithValue("?statusName", user.Status);
                    comm.Parameters.AddWithValue("?roleName", user.Role);
                    comm.Parameters.AddWithValue("?medicalConditions", user.MedicalConditions);
                    comm.Parameters.AddWithValue("?criminalOffence", user.CriminalOffence);
                    comm.Parameters.AddWithValue("?activationCode", user.ActivationCode);
                    comm.Parameters.AddWithValue("?emailVerified", user.EmailVerified);
                    comm.ExecuteNonQuery();
                }

            }
            finally
            {
                con.Close();
            }

        }

        public void DeleteUser(int userId)
        {
            try
            {
                con.Open();
                string sql = "delete from volunteer where volunteerId=" + userId + "";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                cmd.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        public void UpdateUser(int userId, User user)
        {

            try
            {
                var hashedPassword = BC.HashPassword(user.Password);
                con.Open();
                string sql =
                @"update volunteer 
               set firstName =  @firstName,
                    lastName =  @lastName,
                    email = @email,
                    password =  @password
                     where volunteerId = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);
                comm.Parameters.AddWithValue("?firstName", user.FirstName);
                comm.Parameters.AddWithValue("?lastName", user.LastName);
                comm.Parameters.AddWithValue("?email", user.Email);
                comm.Parameters.AddWithValue("?password", hashedPassword);
                comm.Parameters.AddWithValue("?id", userId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
        public void CompleteUserInfo(int userId, User user)
        {
            try
            {
                con.Open();
                string sql =
                @"update volunteer 
               set address1 =  @address1,
                    address2 =  @address2,
                    postcode = @postcode,
                    mobileNumber =  @mobileNumber,
                    weight =  @weight,
                    noKinFullName =  @noKinFullName,
                    noKinMobileNumber = @noKinMobileNumber,
                    noKinRelationship =  @noKinRelationship, 
                    medicalConditions = @medicalConditions, 
                    statusName = @statusName, 
                    roleName = @roleName, 
                    criminalOffence = @criminalOffence             
                    where volunteerId = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);
                comm.Parameters.AddWithValue("?address1", user.Address1);
                comm.Parameters.AddWithValue("?address2", user.Address2);
                comm.Parameters.AddWithValue("?postcode", user.Postcode);
                comm.Parameters.AddWithValue("?mobileNumber", user.MobileNumber);
                comm.Parameters.AddWithValue("?weight", user.Weight);
                comm.Parameters.AddWithValue("?noKinFullName", user.NextofKinFullName);
                comm.Parameters.AddWithValue("?noKinMobileNumber", user.NextofKinMobileNumber);
                comm.Parameters.AddWithValue("?noKinRelationship", user.NextofKinRelationship);
                comm.Parameters.AddWithValue("?medicalConditions", user.MedicalConditions);
                comm.Parameters.AddWithValue("?statusName", user.Status);
                comm.Parameters.AddWithValue("?roleName", user.Role);
                comm.Parameters.AddWithValue("?criminalOffence", user.CriminalOffence);
                comm.Parameters.AddWithValue("?id", userId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
          public void LockUser(int userId, User user)
        {

            try
            {
                con.Open();
                string sql =
                @"update volunteer 
               set statusName =  @statusName
               where volunteerId = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);
                comm.Parameters.AddWithValue("?statusName", user.Status);
                comm.Parameters.AddWithValue("?id", userId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
        public void ResetUserPassword(int userId, User user)
        {
            try
            {
                var hashedPassword = BC.HashPassword(user.Password);
                con.Open();
                string sql =
                @"update volunteer 
               set 
                    password =  @password
                    where volunteerId = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);

                comm.Parameters.AddWithValue("?password", hashedPassword);
                comm.Parameters.AddWithValue("?id", userId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
        public void ActivateUser(int userId, User user)
        {
            try
            {

                con.Open();
                string sql =
                @"update volunteer 
               set 
                    emailVerified = @emailVerified,
                    statusName = @statusName
                    where volunteerId = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);

                comm.Parameters.AddWithValue("?emailVerified", user.EmailVerified);
                comm.Parameters.AddWithValue("?statusName", user.Status);
                comm.Parameters.AddWithValue("?id", userId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        
    }
}