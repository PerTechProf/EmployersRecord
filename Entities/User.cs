using System;
using Microsoft.AspNetCore.Identity;

namespace EmployersRecord.Entities
{
    public class User : IdentityUser<int>
  {
    public User()
    {
      hireDate = DateTimeOffset.UtcNow;
      fireDate = null;
    }

    public DateTimeOffset hireDate { get; set; }
    public DateTimeOffset? fireDate { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public bool IsEditor { get; set; }
  }
}