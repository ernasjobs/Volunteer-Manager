using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySqlConnector;
namespace test.Data.Services
{
    public class EventService : IEventService
    {
        public MySqlConnection con = WebApiConfig.conn();
         string partSql = "where  Date(eventStartDateTime) >= Date(now())";
        public List<Event> GetAllEvents(string status)
        {
            List<Event> eventList = null;
           
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("select * from event where eventStatus = @eventStatus order by eventStartDateTime asc ", con);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.AddWithValue("@eventStatus", status);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventList = ds.Tables[0].AsEnumerable().Select(dataRow => new Event
                {
                    Id = dataRow.Field<int>("eventNumber"),
                    EventName = dataRow.Field<string>("eventName"),
                    EventDescription = dataRow.Field<string>("eventDescription"),
                    EventStartDateTime = dataRow.Field<DateTime>("eventStartDateTime"),
                    EventEndDateTime = dataRow.Field<DateTime>("eventEndDateTime"),
                    EventAddress1 = dataRow.Field<string>("eventAddress1"),
                    EventAddress2 = dataRow.Field<string>("eventAddress2"),
                    EventPostcode = dataRow.Field<string>("eventPostcode"),
                    EventCategory = dataRow.Field<string>("categoryName"),
                    EventStatus = dataRow.Field<string>("eventStatus"),
                    Avatar = dataRow.Field<String> ("avatar")
                }).ToList();

            }
            finally
            {
                con.Close();
            }
            return eventList;
        }

        public List<VolunteerEvent> GetAllEventsByVolunteerId(string status,int userId)
        {
            
            List<VolunteerEvent> eventList = null;
            try
            {
                con.Open();
                Console.WriteLine(status);
                if(status == "past")
                {
                    partSql = "where  Date(eventStartDateTime) < Date(now())";
                }
                
                string sql = "select * from event  left join volunteerevent  on event.eventNumber = volunteerevent.eventNumber and  volunteerevent.volunteerId =" + userId + " "+ partSql+  "   order by eventStartDateTime asc";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventList = ds.Tables[0].AsEnumerable().Select(dataRow => new VolunteerEvent
                {
                    Id = dataRow.Field<int>("eventNumber"),
                    EventName = dataRow.Field<string>("eventName"),
                    EventDescription = dataRow.Field<string>("eventDescription"),
                    EventStartDateTime = dataRow.Field<DateTime>("eventStartDateTime"),
                    EventEndDateTime = dataRow.Field<DateTime>("eventEndDateTime"),
                    EventAddress1 = dataRow.Field<string>("eventAddress1"),
                    EventAddress2 = dataRow.Field<string>("eventAddress2"),
                    EventPostcode = dataRow.Field<string>("eventPostcode"),
                    EventCategory = dataRow.Field<string>("categoryName"),
                    EventStatus = dataRow.Field<string>("eventStatus"),
                    VolunteerEventAttended = dataRow.Field<bool?>("volunteerEventAttended"),
                    VolunteerId = dataRow.Field<int?>("volunteerId"),
                    VolunteerEventNote = dataRow.Field<string>("volunteerEventNote"),

                }).ToList();

            }
            finally
            {
                con.Close();
            }
            return eventList;
        }
        public List<EventDetails> GetEventDetailsByEventId(int eventId)
        {
            List<EventDetails> eventDetails = null;
            try
            {
                string sql = @"select event.eventNumber, event.eventName, event.eventStartDateTime,
                 event.eventEndDateTime, event.eventStatus, event.categoryName, volunteer.volunteerId,  volunteer.firstName, volunteer.lastName,
                volunteer.email, volunteer.mobileNumber, volunteer.roleName, volunteerevent.volunteerEventNote from event  join volunteerevent 
                on event.eventNumber = volunteerevent.eventNumber join volunteer   on  volunteerevent.volunteerId = volunteer.volunteerId where event.eventNumber =" + eventId + "";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = System.Data.CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventDetails = ds.Tables[0].AsEnumerable().Select(dataRow => new EventDetails
                {
                    EventNumber = dataRow.Field<int>("eventNumber"),
                    EventName = dataRow.Field<string>("eventName"),
                    EventStartDateTime = dataRow.Field<DateTime>("eventStartDateTime"),
                    EventEndDateTime = dataRow.Field<DateTime>("eventEndDateTime"),
                    EventCategory = dataRow.Field<string>("categoryName"),
                    EventStatus = dataRow.Field<string>("eventStatus"),
                    VolunteerId = dataRow.Field<int>("volunteerId"),
                    FirstName = dataRow.Field<string>("firstName"), 
                    LastName = dataRow.Field<string>("lastName"),
                    Email = dataRow.Field<string>("email"),
                    MobileNumber = dataRow.Field<string>("mobileNumber"),
                    Role  = dataRow.Field<string>("roleName"),
                    VolunteerEventNote = dataRow.Field<string>("volunteerEventNote"),
                    


                }).ToList();

            }
            finally
            {
                con.Close();
            }
            return eventDetails;
        }



        public Event GetEventById(int eventId)
        {
            Event eventObject = null;
            List<Event> eventsList = null;
            string sql = "select * from event where eventNumber=" + eventId + "";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventsList = ds.Tables[0].AsEnumerable().Select(dataRow => new Event
                {
                    Id = dataRow.Field<int>("eventNumber"),
                    EventName = dataRow.Field<string>("eventName"),
                    EventDescription = dataRow.Field<string>("eventDescription"),
                    EventStartDateTime = dataRow.Field<DateTime>("eventStartDateTime"),
                    EventEndDateTime = dataRow.Field<DateTime>("eventEndDateTime"),
                    EventAddress1 = dataRow.Field<string>("eventAddress1"),
                    EventAddress2 = dataRow.Field<string>("eventAddress2"),
                    EventPostcode = dataRow.Field<string>("eventPostcode"),
                    EventCategory = dataRow.Field<string>("categoryName"),
                    EventStatus = dataRow.Field<string>("eventStatus"),
                    Latitude = dataRow.Field<decimal>("latitude"),
                    Longitude = dataRow.Field<decimal>("longitude"),

                }).ToList();
                if (eventsList.Count >= 1)
                {
                    eventObject = eventsList.First();
                }
            }
            finally
            {
                con.Close();
            }
            return eventObject;
        }
        public void AddEvent(Event eventObject)
        {
            try
            {
                con.Open();
                var comm = con.CreateCommand();
                comm.CommandText = @"INSERT INTO event (eventName, eventDescription, eventStartDateTime, eventEndDateTime, eventAddress1, eventAddress2, eventPostcode, categoryName, eventStatus, uniqueCode, latitude, longitude) 
                VALUES(@eventName, @eventDescription, @eventStartDateTime, @eventEndDateTime, @eventAddress1,@eventAddress2, @eventPostcode,@categoryName,  @eventStatus, @uniqueCode, @latitude, @longitude) ";
                comm.Parameters.AddWithValue("?eventName", eventObject.EventName);
                comm.Parameters.AddWithValue("?eventDescription", eventObject.EventDescription);
                comm.Parameters.AddWithValue("?eventStartDateTime", eventObject.EventStartDateTime);
                comm.Parameters.AddWithValue("?eventEndDateTime", eventObject.EventEndDateTime);
                comm.Parameters.AddWithValue("?eventAddress1", eventObject.EventAddress1);
                comm.Parameters.AddWithValue("?eventAddress2", eventObject.EventAddress2);
                comm.Parameters.AddWithValue("?eventPostcode", eventObject.EventPostcode);
                comm.Parameters.AddWithValue("?categoryName", eventObject.EventCategory);
                comm.Parameters.AddWithValue("?eventStatus", eventObject.EventStatus);
                comm.Parameters.AddWithValue("?uniqueCode", eventObject.UniqueCode);
                comm.Parameters.AddWithValue("?latitude", eventObject.Latitude);
                comm.Parameters.AddWithValue("?longitude", eventObject.Longitude);
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }

        }

        public void DeleteEvent(int eventId)
        {
            try
            {
                con.Open();
                string sql = "delete from event where eventNumber=" + eventId + "";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                cmd.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        public void UpdateEvent(int eventId, Event eventObject)
        {
            try
            {
                con.Open();
                string sql =
                @"update event 
               set eventName =  @eventName,
                    eventDescription =  @eventDescription,
                    eventStartDateTime = @eventStartDateTime,
                    eventEndDateTime =  @eventEndDateTime,
                    eventStatus = @eventStatus,
                    categoryName = @categoryName
                     where eventNumber = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);
                comm.Parameters.AddWithValue("?eventName", eventObject.EventName);
                comm.Parameters.AddWithValue("?eventDescription", eventObject.EventDescription);
                comm.Parameters.AddWithValue("?eventStartDateTime", eventObject.EventStartDateTime);
                comm.Parameters.AddWithValue("?eventEndDateTime", eventObject.EventEndDateTime);
                comm.Parameters.AddWithValue("?eventStatus", eventObject.EventStatus);
                comm.Parameters.AddWithValue("?categoryName", eventObject.EventCategory);
                comm.Parameters.AddWithValue("?id", eventId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }
        public void UpdateEventStatus(int eventId, Event eventObject)
        {
            try
            {
                con.Open();
                string sql =
                @"update event 
               set eventStatus = @eventStatus
                     where eventNumber = @id
               ";
                MySqlCommand comm = new MySqlCommand(sql, con);
                comm.Parameters.AddWithValue("?eventStatus", eventObject.EventStatus);
                comm.Parameters.AddWithValue("?id", eventId);
                comm.CommandType = CommandType.Text;
                comm.ExecuteNonQuery();
            }
            finally
            {
                con.Close();
            }
        }

        public Event GetEventByToken(string token)
        {
            Event eventObject = null;
            List<Event> eventsList = null;
            string sql = "select * from event where uniqueCode='" + token + "'";
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                eventsList = ds.Tables[0].AsEnumerable().Select(dataRow => new Event
                {
                    Id = dataRow.Field<int>("eventNumber"),
                    EventName = dataRow.Field<string>("eventName"),
                    EventDescription = dataRow.Field<string>("eventDescription"),
                    EventStartDateTime = dataRow.Field<DateTime>("eventStartDateTime"),
                    EventEndDateTime = dataRow.Field<DateTime>("eventEndDateTime"),
                    EventAddress1 = dataRow.Field<string>("eventAddress1"),
                    EventAddress2 = dataRow.Field<string>("eventAddress2"),
                    EventPostcode = dataRow.Field<string>("eventPostcode"),
                    EventCategory = dataRow.Field<string>("categoryName"),
                    EventStatus = dataRow.Field<string>("eventStatus"),
                    UniqueCode = dataRow.Field<string>("uniqueCode"),
                }).ToList();
                if (eventsList.Count >= 1)
                {
                    eventObject = eventsList.First();
                }

            }
            finally
            {
                con.Close();
            }
            return eventObject;
        }
    }

}