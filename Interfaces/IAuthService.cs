using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Models;

namespace EmployersRecord.Interfaces
{
    public interface IAuthService
    {
        string CurrentUserId { get; }
        string CurrentUserIdOrNull { get; }
        bool IsAuthorized { get; }
        string ImpersonatedUserId { get; }
        bool IsEditor();
        User GetCurrentUser();
        void EnsureIsEditor();
        Task Impersonate(string userId);
        Task<string> CreateToken(string email, string password);
        Task Register(RegistrationModel model);
    }
}