using System;

namespace EmployersRecord.Models
{
    public class EditUserModel
    {
      public int Id { get; set; }
      public string Name { get; set; }
      public string Email { get; set; }
      public string Position { get; set; }
      public string PhoneNumber { get; set; }
      public DateTimeOffset HireDate { get; set; }
      public DateTimeOffset? FireDate { get; set; }
    }
}