using System.Collections.Generic;
namespace test.Data.Services
{
    public interface IEventService
    {
        List <Event> GetAllEvents(string status);
        List <VolunteerEvent> GetAllEventsByVolunteerId(string status,int userId);
        List <EventDetails> GetEventDetailsByEventId(int eventId);
        Event GetEventById(int eventId);
        Event GetEventByToken (string token);
        void AddEvent (Event eventObject);
        void DeleteEvent (int eventId);
        void UpdateEvent (int eventId, Event eventObject);
         void UpdateEventStatus (int eventId, Event eventObject);


    }
}