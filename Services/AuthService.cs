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
        public string CurrentUserId =>
            CurrentUserIdOrNull ?? throw new InvalidOperationException("The current user is not set");

        public string CurrentUserIdOrNull => ImpersonatedUserId ?? _userService.CurrentHttpUserId;

        public bool IsAuthorized => CurrentUserIdOrNull != null;

        public string ImpersonatedUserId { get; private set; }

        private bool IsImpersonating => ImpersonatedUserId != null;

        public bool IsEditor() => IsImpersonating || IsCurrentUserEditor();

        private bool IsCurrentUserEditor() => GetCurrentUser().IsEditor;

        public User GetCurrentUser()
        {
            // NOTE: GetUserAsync on UserManager is not working, because UserId claim has a custom name
            // instead of the default one like ClaimsIdentity.DefaultNameClaimType
            return _db.Users.First(_ => _.Id.ToString() == CurrentUserId);
        }

        public void EnsureIsEditor()
        {
            if (!IsAuthorized || !IsEditor())
            {
                throw new NotImplementedException("No method");
            }
        }

        public async Task Impersonate(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            EnsureIsEditor();

            if (userId == ImpersonatedUserId || userId == CurrentUserId)
            {
                return;
            }

            var targetUser = await _db.Users.FirstOrDefaultAsync(_ => _.Id.ToString() == userId);

            if (targetUser == null)
            {
                ImpersonatedUserId = null;
                throw new ArgumentException($"Failed to find the target User #{userId}");
            }

            ImpersonatedUserId = userId;
        }

        public async Task<string> CreateToken(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                throw new ("Логин или пароль неверны.");
            }

            return await CreateToken(user);
        }

        private async Task<string> CreateToken(User user)
        {
            var identity = new ClaimsIdentity(
                await _userManager.GetClaimsAsync(user), "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            var jwt = new JwtSecurityToken(
                notBefore: DateTime.UtcNow, claims: identity.Claims, expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                        System.Text.Encoding.ASCII.GetBytes("035E2C6E-3201-438E-94DC-D2F0DC26D937_FC4C79DE-B39F-473A-BA2E-9A8C3032A22C")),
                        SecurityAlgorithms.HmacSha256
                )
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task Register(RegistrationModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.Email,
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Position = model.Position,
                HireDate = model.HireDate,
                FireDate = model.FireDate
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException(
                "Не удалось создать пользователя.\n" + String.Join('\n', result.Errors.Select(_ => _.Description)));
            }

            await _userManager.AddClaimAsync(user, new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName));
            await _userManager.AddClaimAsync(user, new Claim("UserId", user.Id.ToString()));
        }
    }
}