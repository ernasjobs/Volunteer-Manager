using System.Collections.Generic;
namespace test.Data.Services
{
    public interface IEventStatusService
    {
        // define all the methods that we are going to use
        List <EventStatus> GetAllEventStatuses();

    }
}