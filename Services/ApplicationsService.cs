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

        public IEnumerable<Application> GetApplications() {
           // var user = _auth.GetCurrentUser();
            var applications = _db.Applications;
            var user = new User(){IsEditor = false, Id = 2};
            if (user.IsEditor)
                return applications;
            return _db.Applications.Where((application) => application.UserId == user.Id);
        }

        public void PostApplication(PostApplicationModel application) {
           // var user = _auth.GetCurrentUser();
            var user = new User(){IsEditor = false, Id = 2};
            _db.Applications.Add(new Application(){
                Name = application.Name,
                Content = application.Content,
                Type = application.Type,
                UserId = user.Id,
                Date = DateTimeOffset.Now,
                Status = StatusType.New
            });
        }
    }
}