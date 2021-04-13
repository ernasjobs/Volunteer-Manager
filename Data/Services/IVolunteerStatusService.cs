using System.Collections.Generic;
namespace test.Data.Services
{
    public interface IVolunteerStatusService
    {
        // define all the methods that we are going to use
        List <VolunteerStatus> GetAllVolunteerStatuses();        
    }
}