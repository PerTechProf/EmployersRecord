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

    public string CurrentHttpUserId =>
      _httpContextAccessor.HttpContext?.User.Identity is ClaimsIdentity {IsAuthenticated: true} identity
        ? identity.Claims.FirstOrDefault(_ => _.Type == "UserId")?.Value
        : null;
  }
}