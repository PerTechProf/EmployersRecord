using JetBrains.Annotations;

namespace EmployersRecord.Interfaces
{
  public interface IHttpUserService
  {
    string CurrentHttpUserId { get; }
  }
}