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
        int CurrentUserId { get; }
        User GetCurrentUser();
        string CurrentUserNameOrNull { get; }
        bool IsAuthorized { get; }
        bool IsEditor();
        void EnsureIsEditor();
        Task<(string, User)> GetUserWithNewToken(string email, string password);
        Task Register(RegistrationModel model);
        Task EditUser(EditUserModel model);
        IEnumerable<EmployerModel> GetEmployers();
    }
}