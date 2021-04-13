using Microsoft.AspNetCore.Hosting;
using Twilio;
using Microsoft.Extensions.Options;
using System;
using Twilio.Rest.Api.V2010.Account;

namespace test.Data.Services
{
    public class SmsService : ISmsService
    {
        private readonly TwilioSettings _twilioSettings;
        private readonly IWebHostEnvironment _env;
        public SmsService(IOptions<TwilioSettings> twilioSettings, IWebHostEnvironment env)
        {
            _twilioSettings = twilioSettings.Value;
            _env = env;
        }

        public void SendSms(string to, string smsContent)
        {
           var accountSid = _twilioSettings.AccountSid;
          var authToken = _twilioSettings.AuthToken;
           Console.WriteLine(accountSid);
            Console.WriteLine(authToken);
           TwilioClient.Init(accountSid,authToken);
            var from = _twilioSettings.From;
            var message = MessageResource.Create(
            body: smsContent,
            from: new Twilio.Types.PhoneNumber(from),
            to: new Twilio.Types.PhoneNumber(to) 
        );
        }

        
    }
}