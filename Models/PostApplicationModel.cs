using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;

namespace EmployersRecord.Models
{
    public class PostApplicationModel
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public ApplicationType Type { get; set; }
    }
}