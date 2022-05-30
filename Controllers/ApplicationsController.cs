using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EmployersRecord.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ApplicationsController : Controller
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IApplicationsService _applications;

        public ApplicationsController(ILogger<ApplicationsController> logger, IApplicationsService applications)
        {
            _applications = applications;
            _logger = logger;
        }

        [HttpGet]
        public List<Application> GetApplications() {
            return _applications.GetApplications(new User(){IsEditor = true, Id = 6});
        }

    }
}