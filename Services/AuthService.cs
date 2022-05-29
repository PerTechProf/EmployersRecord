using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace EmployersRecord.Services
{
    public class AuthService : IAuthService
    {
        private readonly CompanyDbContext _db;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AuthService> _logger;
        
        public AuthService(CompanyDbContext db, UserManager<User> userManager,
            ILogger<AuthService> logger)
        {
            _db = db;
            _userManager = userManager;
            _logger = logger;    
        }
    }
}