using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private IEventService _service;
        private readonly IMailerService _mailerService;
        public EventsController(IEventService service, IMailerService mailer)
        {
            this._service = service;
            this._mailerService = mailer;
        }
        [HttpGet("GetEvents/{status}")]
        public IActionResult GetEvents(string status)
        {

            try
            {
                // throw new Exception();
                var allUsers = _service.GetAllEvents(status);
                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("SingleEvent/{id}")]
        public IActionResult GeteventbyId(int id)
        {
            try
            {
                // throw new Exception();
                var eventObject = _service.GetEventById(id);
                return Ok(eventObject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ShowEvents/{status}/{id}")]
        public IActionResult GetAllEventsByVolunteerId(string status, int id)
        {
            try
            {
                // throw new Exception();
                var allEvents = _service.GetAllEventsByVolunteerId(status, id);
                return Ok(allEvents);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("NewEvent/{token}")]
        public IActionResult GetEventByToken(string token)
        {

            try
            {
                // throw new Exception();
                var eventObject = _service.GetEventByToken(token);
                return Ok(eventObject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddEvent")]
        public IActionResult AddEvent([FromBody] Event eventObject)
        {
            var uniqueCode = GenerateToken(6);
            while (uniqueCode.Contains("/"))
            {
                uniqueCode = GenerateToken(6);
            }
            eventObject.UniqueCode = uniqueCode;
            if (eventObject != null)
            {
                _service.AddEvent(eventObject);
            }
            return Ok();
        }
        [HttpDelete("DeleteEvent/{id}")]
        public IActionResult DeleteEvent(int id)
        {
            _service.DeleteEvent(id);
            return Ok();
        }
        [HttpPut("UpdateEvent/{id}")]
        public IActionResult UpdateEvent(int id, [FromBody] Event eventObject)
        {
            _service.UpdateEvent(id, eventObject);
            return Ok(eventObject);
        }
        [HttpPut("UpdateEventStatus/{id}")]
        public IActionResult UpdateEventStatus(int id, [FromBody] Event eventObject)
        {
            List<EventDetails> eventDetails = _service.GetEventDetailsByEventId(id);
            foreach (var eventDetail in eventDetails)
            {
                Console.WriteLine(eventDetail.Email);
            }

            _service.UpdateEventStatus(id, eventObject);
            if(eventObject.EventStatus == "Cancelled")
            {
                SendEventCancellationEmail(eventDetails);
            }
           
            return Ok(eventObject);
        }
        public  void SendEventCancellationEmail(List<EventDetails> eventDetailsList)
        {
            EventDetails eventDetails = eventDetailsList.First();

            //var user1  = _service.GetUserByUsername(email);
            string subject = "This event has been canceled due to weather!";
            string eventTitle = eventDetails.EventName;
            string eventDate = eventDetails.EventStartDateTime.ToShortDateString();
            string eventTime = eventDetails.EventStartDateTime.ToShortTimeString();
            // string eventTime = volunteerEventObject.EventStartDateTime.TimeOfDay.ToString();
            string body = "<h2> Hey " + eventDetails.FirstName + "! </h3>" +
        "<h4>" + " " + eventTitle + " event on " + eventDate + " at " + eventTime + " has been cancelled" + "</h4>" +
            "<h4> We can't wait to see you again!";
            foreach (var eventDetail in eventDetailsList)
            {
                string email = eventDetail.Email;
                 _mailerService.SendEmailAsync(email, subject, body);
            }
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
        [HttpGet("ShowEventDetails/{eventId}")]
        public IActionResult GetEventDetailsByEventId(int eventId)
        {
            try
            {

                var eventDetails = _service.GetEventDetailsByEventId(eventId);
                return Ok(eventDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}