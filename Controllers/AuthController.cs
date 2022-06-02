using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EmployersRecord.Models;
using EmployersRecord.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

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
    public async Task CreateEmployer(RegistrationModel model)
    {
      model.Id = null;
      await _auth.Register(model);
    }

    [HttpGet]
    public IEnumerable<EmployerModel> GetEmployers() {
        return _auth.GetEmployers();
    }

    [HttpPost]
    public async Task<TokenModel> Login(LoginModel model) {
      var token = await _auth.CreateToken(model.Email, model.Password);
      
      SetAuthCookie(token);

      return new TokenModel(token);
    }
    
    [HttpPost]
    public StatusCodeResult LogOut()
    {
      Response.Cookies.Delete(Options.CookieName);
      return Ok();
    }

    private void SetAuthCookie(string token) =>
      // TODO: Use some boilerplate instead of all this?
      Response.Cookies.Append(
        Options.CookieName, token, new CookieOptions { MaxAge = TimeSpan.FromDays(30) });

    // [HttpPut]
    // public async Task EditEmployer([FromBody] RegistrationModel model) =>
    //     await _auth.Register(model);
  }
}
