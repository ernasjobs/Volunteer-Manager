namespace test.Data.Services
{
    public interface IVolunteerEventService
    {
        // define all the methods that we are going to use
        void AddVolunteerEvent (VolunteerEvent volunteerEventObject);
        void LeaveEvent (VolunteerEvent volunteerEventObject);
        
    }
}