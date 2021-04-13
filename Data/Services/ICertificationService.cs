using System.Collections.Generic;
namespace test.Data.Services
{
    public interface ICertificationService
    {
        // define all the methods that we are going to use
        List <Certification> GetCertifications();

    }
}