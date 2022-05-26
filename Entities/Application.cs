using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployersRecord.Entities
{
    public class Application
    {
        public int UserId { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Status { get; set; }
    }
}