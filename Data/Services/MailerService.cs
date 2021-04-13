using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using MailKit.Security;

namespace test.Data.Services
{
    public class MailerService : IMailerService
    {
        private readonly SmtpSettings _smtpSettings;
        private readonly IWebHostEnvironment _env;
        public MailerService(IOptions<SmtpSettings> smtpSettings, IWebHostEnvironment env)
        {
            _smtpSettings = smtpSettings.Value;
            _env = env;
        }

        [Obsolete]
        public async Task SendEmailAsync(string email, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                Console.WriteLine(_smtpSettings.SenderEmail);
                Console.WriteLine(_smtpSettings.Server);
                Console.WriteLine(_smtpSettings.Port);
                Console.WriteLine(_smtpSettings.Username);
                Console.WriteLine(_smtpSettings.Password);
                Console.WriteLine(email);
                message.From.Add(new MailboxAddress(_smtpSettings.SenderName, _smtpSettings.SenderEmail));
                message.To.Add(new MailboxAddress(email));
                message.Subject = subject;
                message.Body = new TextPart("html")
                {
                    Text = body
                };
                using (var client = new SmtpClient())
                {
                    
                    
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    if(_env.IsDevelopment())
                    {
                        await client.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, SecureSocketOptions.StartTls);
                    }
                    else
                    {
                        await client.ConnectAsync(_smtpSettings.Server);
                    }
                    await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception e)
            {
                throw new System.Exception (e.Message);
            }
        }
    }
}