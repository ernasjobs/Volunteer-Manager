using System.Collections.Generic;
namespace test.Data.Services
{
    public interface IUserService
    {
        // define all the methods that we are going to use
        List <User> GetAllUsers(string status);
        User GetUserById (int userId);
        User GetUserByEmail (string email);
        User GetUserByToken (string token);
        User Login (Login login);
        User VerifyUser (Login login);
        void AddUser (User user);
        void DeleteUser (int userId);
        void UpdateUser (int userId, User user);
        void CompleteUserInfo(int userId, User user);
        void LockUser (int userId, User user);
        void ResetUserPassword (int userId, User user);
        void ActivateUser (int userId, User user);

    }
}