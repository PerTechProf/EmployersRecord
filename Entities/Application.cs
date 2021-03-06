using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployersRecord.Entities
{
    public class Application
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public ApplicationType Type { get; set; }
        public DateTimeOffset Date { get; set; }
        public StatusType Status { get; set; }
    }
}