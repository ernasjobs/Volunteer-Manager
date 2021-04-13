namespace test.Data.Services
{
    public interface IVolunteerCertificationService
    {
        // define all the methods that we are going to use
        void AddVolunteerCertification (VolunteerCertification volunteerCertificationObject);
        VolunteerCertification GetVolunteerCertification (VolunteerCertification volunteerCertificationObject);
        
    }
}