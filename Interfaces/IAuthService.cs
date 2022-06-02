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
        bool IsAuthorized { get; }
        bool IsEditor();
        void EnsureIsEditor();
        Task<string> CreateToken(string email, string password);
        Task Register(RegistrationModel model);
        IEnumerable<EmployerModel> GetEmployers();
    }
}