using System.Collections.Generic;
namespace test.Data.Services
{
    public interface IFrequentlyAskedQuestion
    {
        List <FrequentlyAskedQuestion> GetAllFaqs();
    }
}