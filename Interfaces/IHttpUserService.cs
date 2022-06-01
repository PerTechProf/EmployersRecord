using JetBrains.Annotations;

namespace EmployersRecord.Interfaces
{
  public interface IHttpUserService
  {
    string CurrentHttpUserName { get; }
  }
}