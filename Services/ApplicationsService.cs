using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployersRecord.Services
{
    public class ApplicationsService : IApplicationsService
    {
        private readonly CompanyDbContext _db;
        public ApplicationsService(CompanyDbContext db) {
            _db = db;
        }
        public List<Application> GetApplications(User user) {
            return _db.Applications.Where((application) => user.IsEditor || application.UserId == user.Id).ToList();
        }
    }
}