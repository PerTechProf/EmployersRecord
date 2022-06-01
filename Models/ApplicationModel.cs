using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;

namespace EmployersRecord.Models
{
    public class ApplicationModel
    {
        public ApplicationModel(Application application) {
            Employer = new EmployerModel(application.User);
            Id = application.Id;
            Name = application.Name;
            Content = application.Content;
            Type = application.Type;
            Date = application.Date;
            Status = application.Status;
        }
        public EmployerModel Employer { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public ApplicationType Type { get; set; }
        public DateTimeOffset Date { get; set; }
        public StatusType Status { get; set; }
    }
}