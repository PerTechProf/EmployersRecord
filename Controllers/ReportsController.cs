using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Interfaces;
using EmployersRecord.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EmployersRecord.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ReportsController: Controller
    {

        private readonly ILogger<ReportsController> _logger;
        private readonly IReportsService _reports;

        public ReportsController(
            ILogger<ReportsController> logger, 
            IReportsService reports
        )
        {
            _reports = reports;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ReportModel> GetReports() {
            return _reports.GetReports();
        }
    }
}