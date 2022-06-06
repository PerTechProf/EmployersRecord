using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Interfaces;
using EmployersRecord.Entities;
using EmployersRecord.Models;

namespace EmployersRecord.Services
{
    public class ReportsService : IReportsService
    {
        private readonly CompanyDbContext _db;
        private IAuthService _auth;

        public ReportsService(CompanyDbContext db, IAuthService authService) {
            _db = db;
            _auth = authService;
        }

        public IEnumerable<ReportModel> GetReports() {
           _auth.EnsureIsEditor();
           return _db.Reports.Select(report => new ReportModel(report));
        }
    }
}