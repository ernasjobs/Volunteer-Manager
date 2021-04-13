using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class VolunteerEventController : Controller
    {
        private readonly IMailerService _mailerService;
        private IVolunteerEventService _service;
        private IUserService _userService;
        public VolunteerEventController(IUserService userService, IVolunteerEventService service, IMailerService mailer)
        {
            this._service = service;
            this._userService = userService;
            this._mailerService = mailer;
        }

        [HttpPost("AddVolunteerEvent")]
        public IActionResult AddVolunterEvent([FromBody] VolunteerEvent volunteerEventObject)
        {
            User checkUser = null;
            if (volunteerEventObject != null)
            {

                checkUser = _userService.GetUserById(volunteerEventObject.VolunteerId.GetValueOrDefault());
                if (checkUser != null)
                {
                    _service.AddVolunteerEvent(volunteerEventObject);
                    SendJoinedEventConfirmationEmail(checkUser, volunteerEventObject);
                    return StatusCode(200);
                }
                return StatusCode(204);

            }
            return Ok();
        }
        public  void SendJoinedEventConfirmationEmail(User user, VolunteerEvent volunteerEventObject)
        {

            string email = user.Email;
            //var user1  = _service.GetUserByUsername(email);
            string subject = "Thank you for joining us on this event!";
            string eventTitle = volunteerEventObject.EventName;
            string eventDate = volunteerEventObject.EventStartDateTime.ToShortDateString();
            string eventTime = volunteerEventObject.EventStartDateTime.ToShortTimeString();
            // string eventTime = volunteerEventObject.EventStartDateTime.TimeOfDay.ToString();
            string body = "<h2> Hey " + user.FirstName + "! </h3>" +
        "<h4>" + "Your place is confirmed for the " + eventTitle + " event " + "</h4>" +
            "<h4> We can't wait to see you on " + eventDate + " at " + eventTime + "</h4>";
             _mailerService.SendEmailAsync(email, subject, body);
        }
        [HttpDelete("LeaveEvent")]
        public IActionResult LeaveEvent([FromBody] VolunteerEvent volunteerEventObject)
        {
            User checkUser = null;
            if (volunteerEventObject != null)

            {
                checkUser = _userService.GetUserById(volunteerEventObject.VolunteerId.GetValueOrDefault());
                if (checkUser != null)
                {

                    _service.LeaveEvent(volunteerEventObject);
                    SendLeaveEventConfirmationEmail(checkUser, volunteerEventObject);
                    return StatusCode(200);
                }
                return StatusCode(204);

            }
            return Ok();
        }
        public  void SendLeaveEventConfirmationEmail(User user, VolunteerEvent volunteerEventObject)
        {

            string email = user.Email;
            //var user1  = _service.GetUserByUsername(email);
            string subject = "We are sorry to see you leaving this event!";
            string eventTitle = volunteerEventObject.EventName;
            string eventDate = volunteerEventObject.EventStartDateTime.ToShortDateString();
            string eventTime = volunteerEventObject.EventStartDateTime.ToShortTimeString();
            // string eventTime = volunteerEventObject.EventStartDateTime.TimeOfDay.ToString();
            string body = "<h2> Hey " + user.FirstName + "! </h3>" +
        "<h4>" + "We can confirm that your place at  " + eventTitle + " event on " + eventDate + " at " + eventTime + " has been removed" + "</h4>" +
            "<h4> We can't wait to see you again!";
             _mailerService.SendEmailAsync(email, subject, body);
        }
    }
}