using System.Collections.Generic;
using EmployersRecord.Models;

namespace EmployersRecord.Interfaces
{
    public interface IApplicationsService
    {
        IEnumerable<ApplicationModel> GetApplications();

        void PostApplication(PostApplicationModel application);
    }
}