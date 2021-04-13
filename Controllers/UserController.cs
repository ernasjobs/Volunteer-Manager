using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;
namespace test.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IMailerService _mailerService;
        private readonly ISmsService _smsService;
        private IUserService _service;
        public UsersController(IUserService service, IMailerService mailer, ISmsService sms)
        {
            this._service = service;
            this._mailerService = mailer;
            this._smsService = sms;
        }
        [HttpGet("GetUsers/{status}")]
        public IActionResult GetUsers(string status)
        {

            try
            {
                // throw new Exception();
                var allUsers = _service.GetAllUsers(status);
                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("SingleUser/{id}")]
        public IActionResult GetuserById(int id)
        {

            try
            {
                // throw new Exception();
                var user = _service.GetUserById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("NewUser/{token}")]
        public IActionResult GetuserByToken(string token)
        {

            try
            {
                // throw new Exception();
                var user = _service.GetUserByToken(token);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddUser")]
        public IActionResult Adduser([FromBody] User user)
        {
            var activationCode = GenerateToken(6);
            while (activationCode.Contains("/"))
            {
                activationCode = GenerateToken(6);
            }
            User checkUser = null;
            user.ActivationCode = activationCode;
            if (user != null)
            {

                checkUser = _service.GetUserByEmail(user.Email);
                if (checkUser == null)
                {
                    _service.AddUser(user);
                    SendRegistrationConfirmationEmail(user);
                    SendNewSigupEmail(user);
                    // SendActivationEmail(user);
                    return StatusCode(200);
                }
                return StatusCode(204);
            }
            return Ok(checkUser);
        }
        [HttpPut("CompleteUserInfo/{id}")]
        public IActionResult CompleteUserInfo(int id, [FromBody] User user)
        {
            if (user != null)
            {
                _service.CompleteUserInfo(id, user);
                SendActivationEmail(user);
             //    SendActivationSms(user);
            }

            return Ok(user);
        }
        public void SendActivationSms(User user)
        {

            string to = user.MobileNumber;
            string firstName = user.FirstName;
            Console.WriteLine(user.MobileNumber);
            string smsContent = "Hi " + firstName + " Thank you for registering as a volunteer for Peterborough Sailability. We are delighted to confirm we now have received satisfactory references and a DBS check. (It's Ernasi testing the SMS service so please ignore this message))";
            _smsService.SendSms(to, smsContent);

        }

        public async void SendActivationEmail(User user)
        {

            string email = user.Email;
            //var user1  = _service.GetUserByUsername(email);
            Console.WriteLine(user.Email);
            string subject = "Thank You For Your Registration!";
            string link = "https://localhost:5001/activate-account/" + user.ActivationCode;
            //Console.WriteLine("activation code: ");
           
            string body = "<h3> Hey " + user.FirstName + "! </h3>" +
           "<h4> Thank you for registering as a volunteer for Peterborough Sailability. I am delighted to confirm we now have received satisfactory references and a DBS check.  </h4>"
            +
           "<h4>To activate your Peterborough Sailability user account please follow the link.</h4>"
           + "<a href=" + link + ">Click here to activate your account</a>";
            await _mailerService.SendEmailAsync(email, subject, body);

        }
         public async void SendRegistrationConfirmationEmail(User user)
        {

            string email = user.Email;
            //var user1  = _service.GetUserByUsername(email);
            Console.WriteLine(user.Email);
            string subject = "Thank You For Your Registration!";
            //string link = "https://localhost:5001/activate-account/" + user.ActivationCode;
            //Console.WriteLine("activation code: ");
           
            string body = "<h3> Hey " + user.FirstName + "! </h3>" +
           "<h4> Thank you for registering. We will be in touch with you shortly.  </h4>";
            await _mailerService.SendEmailAsync(email, subject, body);
        }
         public async void SendNewSigupEmail(User user)
        {

            string email = "p110106003@student.peterborough.ac.uk";
            //var user1  = _service.GetUserByUsername(email);
         //   Console.WriteLine(user.Email);
            string subject = "New user creation!";
            //string link = "https://localhost:5001/activate-account/" + user.ActivationCode;
            //Console.WriteLine("activation code: ");
           
            string body = "<h3> Hey team!  </h3>" +
           "<h4> Please check volunteer page as "+ user.FirstName +" "+ user.LastName + " has applied recently.</h4>";
            await _mailerService.SendEmailAsync(email, subject, body);
        }
        public async void SendResetPasswordEmail(User user)
        {

            string email = user.Email;
            //var user1  = _service.GetUserByUsername(email);
            //  Console.WriteLine(user.ActivationCode);
            string subject = "Reset your Peterborough Sailability account password!";
            string link = "https://localhost:5001/resetpassword/" + user.Id;
            Console.WriteLine("activation code: ");
            string body = "<h3> Hey " + user.FirstName + "! </h3>" +
            "<h4> Clink on the link below to reset your password.</h4>"
            + "<a href=" + link + ">Click here to reset your password</a>";
            await _mailerService.SendEmailAsync(email, subject, body);
        }
        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _service.DeleteUser(id);
            return Ok();
        }
        [HttpPut("UpdateUser/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            _service.UpdateUser(id, user);
            return Ok(user);
        }


        [HttpPut("LockUser/{id}")]
        public IActionResult LockUser(int id, [FromBody] User user)
        {
            _service.LockUser(id, user);
            return Ok(user);
        }
        [HttpPut("ResetPassword/{id}")]
        public IActionResult ResetUser(int id, [FromBody] User user)
        {
            _service.ResetUserPassword(id, user);
            return Ok(user);
        }
        [HttpPut("ActivateUser/{id}")]
        public IActionResult Activate(int id, [FromBody] User user)
        {
            _service.ActivateUser(id, user);
            return Ok(user);
        }
        [HttpPost("Login")]
        public IActionResult UserLogin([FromBody] Login login)
        {
            var response = _service.Login(login);
            return Ok(response);
        }
        [HttpPost("Verify")]
        public IActionResult Verify([FromBody] Login login)
        {
            User response = _service.VerifyUser(login);
            if (response != null)
            {
                SendResetPasswordEmail(response);
                return Ok(response);

            }
            return Ok(response);
        }
        public string GenerateToken(int length)
        {
            using (RNGCryptoServiceProvider cryptRNG = new RNGCryptoServiceProvider())
            {
                byte[] tokenBuffer = new byte[length];
                cryptRNG.GetBytes(tokenBuffer);
                return Convert.ToBase64String(tokenBuffer);
            }
        }
    }
}