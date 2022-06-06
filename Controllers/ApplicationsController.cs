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
        public IEnumerable<ApplicationModel> GetApplications() {
            return _applications.GetApplications();
        }

        [HttpPost]
        public void PostApplication(PostApplicationModel application) {
            _applications.PostApplication(application);
        }

        [HttpPost("{applicationId:int}")]
        public void ApproveApplication(int applicationId) {
            _applications.SetApplicationStatus(applicationId, StatusType.Approved);
        }

        [HttpPost("{applicationId:int}")]
        public void RejectApplication(int applicationId) {
            _applications.SetApplicationStatus(applicationId, StatusType.Rejected);
        }
    }
}