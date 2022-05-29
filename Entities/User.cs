using System;
using Microsoft.AspNetCore.Identity;

namespace EmployersRecord.Entities
{
    public class User : IdentityUser<int>
  {
    public User()
    {
      HireDate = DateTimeOffset.UtcNow;
      FireDate = null;
    }

    public DateTimeOffset HireDate { get; set; }
    public DateTimeOffset? FireDate { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public bool IsEditor { get; set; }
  }
}