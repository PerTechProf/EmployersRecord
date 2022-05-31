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

        public List<Application> GetApplications() {
            var user = _auth.GetCurrentUser();
            return _db.Applications.Where((application) => user.IsEditor || application.UserId == user.Id).ToList();
        }

        public void PostApplication(PostApplicationModel application) {
            var user = _auth.GetCurrentUser();
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