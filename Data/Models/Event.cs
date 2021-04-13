
using System;

public class Event
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
    public decimal Latitude {get;set;}
    public decimal Longitude {get;set;}
    public string Avatar {get;set;}
}