using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;

namespace EmployersRecord.Interfaces
{
    public interface IApplicationsService
    {
        List<Application> GetApplications(User user);
    }
}