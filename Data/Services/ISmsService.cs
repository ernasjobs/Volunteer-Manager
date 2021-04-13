using System.Threading.Tasks;
namespace test.Data.Services
{
    public interface ISmsService
    {
      void SendSms(string to, string smsContent);
    }
}