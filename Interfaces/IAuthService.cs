using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Models;

namespace EmployersRecord.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> CreateToken(string email, string password);
        Task Register(RegistrationModel model);
    }
}