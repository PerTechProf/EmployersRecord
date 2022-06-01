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
    [Authorize]
    public class ApplicationsController : Controller
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IApplicationsService _applications;

        public ApplicationsController(
            ILogger<ApplicationsController> logger, 
            IApplicationsService applications
            )
        {
            _applications = applications;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Application> GetApplications() {
            return _applications.GetApplications();
        }

        [HttpPost]
        public void PostApplication(PostApplicationModel application) {
            _applications.PostApplication(application);
        }

    }
}