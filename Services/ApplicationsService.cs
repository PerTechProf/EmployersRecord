using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Interfaces;
using EmployersRecord.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployersRecord.Services
{
    public class ApplicationsService : IApplicationsService
    {
        private readonly CompanyDbContext _db;
        private IAuthService _auth;

        public ApplicationsService(CompanyDbContext db, IAuthService authService) {
            _db = db;
            _auth = authService;
        }

        public IEnumerable<ApplicationModel> GetApplications() {
           // var user = _auth.GetCurrentUser();
            var applications = _db.Applications.Include(_ => _.User).AsEnumerable();
            // Change for screenshot
            var user = new User(){IsEditor = true, Id = 1002};
            if (!user.IsEditor)
                applications = applications
                    .Where((application) => application.UserId == user.Id);
            return applications
                .Select(application => new ApplicationModel(application));
        }

        public void PostApplication(PostApplicationModel application) {
           // var user = _auth.GetCurrentUser();
           // Change for screenshot
            var user = new User(){IsEditor = true, Id = 3003};
            _db.Applications.Add(new Application(){
                Name = application.Name,
                Content = application.Content,
                Type = application.Type,
                UserId = user.Id,
                Date = DateTimeOffset.Now,
                Status = StatusType.New
            });
            _db.SaveChanges();
        }
    }
}