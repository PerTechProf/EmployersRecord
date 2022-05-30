using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EmployersRecord.Services.Interfaces;
using EmployersRecord.Models;

namespace EmployersRecord.Controllers
{
  [ApiController]
  [Route("api/[controller]/[action]")]
  public class AuthController : ControllerBase
  {
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _auth;

    public AuthController(ILogger<AuthController> logger, IAuthService auth)
    {
      _logger = logger;
      _auth = auth;
    }

    [HttpPost]
    public async Task CreateEmployer([FromBody] RegistrationModel model)
    {
      model.Id = null;
      await _auth.Register(model);
    }

    // [HttpPut]
    // public async Task EditEmployer([FromBody] RegistrationModel model) =>
    //     await _auth.Register(model);

    
  }
}
