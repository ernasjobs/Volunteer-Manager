using System.Threading.Tasks;
namespace test.Data.Services
{
    public interface IMailerService
    {
        // define all the methods that we are going to use
      Task SendEmailAsync (string email, string subject, string body);

    }
}