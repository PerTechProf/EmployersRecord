using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployersRecord.Entities;
using EmployersRecord.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using EmployersRecord.Interfaces;

namespace EmployersRecord.Services
{
    public class AuthService : IAuthService
    {
        private readonly CompanyDbContext _db;
        private readonly UserManager<User> _userManager;
        private readonly IHttpUserService _userService;
        private readonly ILogger<AuthService> _logger;
        
        public AuthService(CompanyDbContext db, 
            UserManager<User> userManager,
            ILogger<AuthService> logger,
            IHttpUserService userService)
        {
            _db = db;
            _userManager = userManager;
            _logger = logger;
            _userService = userService;
        }
        public User GetCurrentUser() =>
            _db.Users.First(user => user.UserName == CurrentUserName);
        
        public int CurrentUserId =>
            GetCurrentUser().Id;
        
        private string CurrentUserName =>
            CurrentUserNameOrNull ?? throw new InvalidOperationException("The current user is not set");

        public string CurrentUserNameOrNull => _userService.CurrentHttpUserName;

        public bool IsAuthorized => CurrentUserNameOrNull != null;

        public bool IsEditor() => IsCurrentUserEditor();

        private bool IsCurrentUserEditor() => GetCurrentUser().IsEditor;

        public void EnsureIsEditor()
        {
            if (!IsAuthorized || !IsEditor())
            {
                throw new NotImplementedException("No method");
            }
        }

        public async Task<User> GetUserAuth(string email, string password) {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                throw new ("Логин или пароль неверны.");
            }

            return user;
        }

        public async Task<(string, User)> GetUserWithNewToken(string email, string password)
        {
            var user = await GetUserAuth(email, password);

            return (await CreateToken(user), user);
        }

        private async Task<string> CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    System.Text.Encoding.ASCII.GetBytes("PDv7DrqznYL6nv7DrqzjnQYO9JxIsWdcjnQYL6nu0f")
                ), 
                SecurityAlgorithms.HmacSha256Signature
            );

            var identity = new ClaimsIdentity(
                await _userManager.GetClaimsAsync(user), "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Email", user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
  
            return tokenHandler.WriteToken(token);
        }

        public async Task Register(RegistrationModel model)
        {
            EnsureIsEditor();

            var user = new User
            {
                Email = model.Email,
                UserName = model.Email,
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Position = model.Position,
                HireDate = DateTimeOffset.Now
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException(
                "Не удалось создать пользователя.\n" + String.Join('\n', result.Errors.Select(_ => _.Description)));
            }

            await _userManager.AddClaimAsync(user, new Claim("Email", user.Email));
            // await _userManager.AddClaimAsync(user, new Claim("UserId", user.Id.ToString()));
        }

        public async Task EditUser(EditUserModel model) {
            EnsureIsEditor();

            var user = _db.Users.First(_ => _.Id == model.Id);

            await _userManager.RemoveClaimAsync(user, new Claim("Email", user.Email));

            user.Email = model.Email;
            user.UserName = model.Email;
            user.Name = model.Name;
            user.PhoneNumber = model.PhoneNumber;
            user.Position = model.Position;
            user.HireDate = model.HireDate;
            user.FireDate = model.FireDate;

            await _userManager.AddClaimAsync(user, new Claim("Email", user.Email));

            await _db.SaveChangesAsync();
        }

        public IEnumerable<EmployerModel> GetEmployers() {
            EnsureIsEditor();
            return _db.Users.Select((user) => new EmployerModel(user));
        }
    }
}