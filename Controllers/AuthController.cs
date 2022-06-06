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
      await _auth.Register(model);
    }

    [HttpPost]
    public async Task EditEmployer(EditUserModel model)
    {
      await _auth.EditUser(model);
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
    public Task ChangePhoneNumber([FromBody]string phoneNumber) =>
      _auth.ChangePhoneNumber(phoneNumber);
    
    [HttpPost]
    public Task ChangePassword(ChangePasswordModel passwords) =>
      _auth.ChangePassword(passwords.CurrentPassword, passwords.Password);

    [HttpPost]
    public async Task<AuthModel> Login(LoginModel model) {
      var (token, user) = await _auth.GetUserWithNewToken(model.Email, model.Password);

      if (user.FireDate != null) {
        throw new ("Вы уволены, поздравляем");
      }

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
