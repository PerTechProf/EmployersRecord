using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployersRecord.Entities
{
    public class Employer
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public string Position { get; set; }
		public DateTimeOffset HireDate { get; set; }
		public DateTimeOffset FireDate { get; set; }
	}
}