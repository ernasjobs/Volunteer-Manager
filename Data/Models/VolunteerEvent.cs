
using System;

public class VolunteerEvent
{
    public int Id { get; set; }
    public string EventName { get; set; }
    public string EventDescription { get; set; }
    public DateTime EventStartDateTime { get; set; }
    public DateTime EventEndDateTime { get; set; }
    public string EventAddress1 { get; set; }
    public string EventAddress2 { get; set; }
    public string EventPostcode { get; set; }
    public string EventCategory { get; set; }
    public string EventStatus { get; set; }
    public string UniqueCode {get; set;}
    public int? VolunteerId {get;set;}
    public bool? VolunteerEventAttended {get;set;}
    public string VolunteerEventNote {get;set;}
}