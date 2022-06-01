using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;

namespace EmployersRecord.Models
{
    public class EmployerModel
    {
        public EmployerModel(User user) {
            Id = user.Id;
            Email = user.Email;
            Name = user.Name;
            Position = user.Position;
            PhoneNumber = user.PhoneNumber;
            IsEditor = user.IsEditor;
            HireDate = user.HireDate;
            FireDate = user.FireDate;
        }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsEditor { get; set; }
        public DateTimeOffset HireDate { get; set; }
        public DateTimeOffset? FireDate { get; set; }
    }
}