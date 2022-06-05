using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using EmployersRecord.Interfaces;

namespace EmployersRecord.Services
{
  public class HttpUserService : IHttpUserService
  {
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpUserService(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public string CurrentHttpUserName =>
      _httpContextAccessor.HttpContext?.User.Identity.Name ?? null;
  }
}