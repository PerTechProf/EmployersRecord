using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Models;

namespace EmployersRecord.Interfaces
{
    public interface IApplicationsService
    {
        List<Application> GetApplications();

        void PostApplication(PostApplicationModel application);
    }
}