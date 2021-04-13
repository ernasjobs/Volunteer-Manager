
public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string Postcode { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string MobileNumber { get; set; }
    public int Weight { get; set; }
    public string NextofKinFullName { get; set; }
    public string NextofKinMobileNumber { get; set; }
    public string NextofKinRelationship { get; set; }
    public string Status { get; set; }
    public string Role { get; set; }
    public string MedicalConditions { get; set; }
    public bool CriminalOffence { get; set; }
  
    public bool EmailVerified {get;set;}
    public string ActivationCode {get;set;} 
}