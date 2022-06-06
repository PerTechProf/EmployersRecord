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
            var user = _auth.GetCurrentUser();

            var applications = _db.Applications.Include(_ => _.User).AsEnumerable();

            if (!user.IsEditor)
                applications = applications
                    .Where((application) => application.UserId == user.Id);
            return applications
                .Select(application => new ApplicationModel(application));
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

            _db.SaveChanges();
        }

        public void SetApplicationStatus(int applicationId, StatusType status) {
            _auth.EnsureIsEditor();

            var application = _db.Applications.First(_ => _.Id == applicationId);
            
            application.Status = status;

            var report = _db.Reports.FirstOrDefault(_ => _.ApplicationId == application.Id);

            if (report == null && status == StatusType.Approved)
                _db.Reports.Add(new Report(){ApplicationId = application.Id});
            if (report != null && status != StatusType.Approved) {
                _db.Remove(report);
            }

            _db.SaveChanges();
        }
    }
}