using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;

namespace EmployersRecord.Models
{
    public class ReportModel
    {
        public ReportModel(Report report) {
            Id = report.Id;
            Application = new ApplicationModel(report.Application);
        }
        public int Id { get; set; }
        public ApplicationModel Application { get; set; }
    }
}