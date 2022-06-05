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

    [HttpGet]
    public EmployerModel GetUserInfo(){
      return new EmployerModel(_auth.GetCurrentUser());
    }

    [HttpPost]
    public async Task<AuthModel> Login(LoginModel model) {
      var token = await _auth.CreateToken(model.Email, model.Password);
      Entities.User user;
      if (model.Email == "boss@boss.ru")
        user = new Entities.User(){Id = 1002, IsEditor = true};
      else
        user = new Entities.User(){Id = 3002, IsEditor = false};
      
      SetAuthCookie(Options.CookieName, token);
      SetAuthCookie("IsEditor", user.IsEditor.ToString());

      return new AuthModel(token, user);
    }
    
    [HttpPost]
    public StatusCodeResult LogOut()
    {
      Response.Cookies.Delete(Options.CookieName);
      Response.Cookies.Delete("IsEditor");
      return Ok();
    }

    private void SetAuthCookie(string name, string token) =>
      // TODO: Use some boilerplate instead of all this?
      Response.Cookies.Append(
        name, token, new CookieOptions { MaxAge = TimeSpan.FromDays(30) });

    // [HttpPut]
    // public async Task EditEmployer([FromBody] RegistrationModel model) =>
    //     await _auth.Register(model);
  }
}
