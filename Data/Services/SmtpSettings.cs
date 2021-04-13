namespace test.Data.Services
{
    public class SmtpSettings
    {
        public string Server {get;set;}
        public int Port {get;set;}
        public string SMTP_Username { get; set; }
        public string ConfigSet { get; set; }
        public string SMTP_Password { get; set; }
        public string SenderName {get;set;}
        public string SenderEmail {get;set;}
        public string Username {get;set;}
        public string Password {get;set;}
    }
}