using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using EmployersRecord.Services;
using EmployersRecord.Entities;
using EmployersRecord.Interfaces;

namespace EmployersRecord
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IAppSettings appSettings = new AppSettings(_configuration);

            if (_env.IsDevelopment())
            {
                services.AddCors();
                services.AddSwaggerGen();
            }

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<CompanyDbContext>(
                contextOptions =>
                    contextOptions
                        .UseSqlServer(
                        appSettings.DbConnectionString)
            );
            services.AddScoped<CompanyDbContext>();

            services.AddIdentity<User, IdentityRole<int>>(
                        options =>
                        {
                            options.Password.RequireDigit = false;
                            options.Password.RequireLowercase = false;
                            options.Password.RequireUppercase = false;
                            options.Password.RequireNonAlphanumeric = false;
                        })
                    .AddEntityFrameworkStores<CompanyDbContext>()
                    .AddDefaultTokenProviders();

            services.AddAuthentication(
                options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(
                    JwtBearerDefaults.AuthenticationScheme, options =>
                    {
                        options.SaveToken = true;

                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // укзывает, будет ли валидироваться издатель при валидации токена
                            ValidateIssuer = false,

                            // будет ли валидироваться потребитель токена
                            ValidateAudience = false,

                            // будет ли валидироваться время существования
                            ValidateLifetime = false,

                            // установка ключа безопасности
                            IssuerSigningKey = Options.GetSigningKey(),

                            // валидация ключа безопасности
                            ValidateIssuerSigningKey = true
                        };
                    }
                );
            
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IApplicationsService, ApplicationsService>();
            services.AddScoped<IHttpUserService, HttpUserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(
                    x => x.WithOrigins("http://localhost:5001") // путь к нашему SPA клиенту
                            .AllowCredentials()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.Use(
                async (context, next) =>
                {
                const string authKey = "Authorization";

                if (!context.Request.Headers.ContainsKey(authKey))
                {
                    var cookie = context.Request.Cookies[Options.CookieName];

                    if (cookie != null)
                    {
                        context.Request.Headers.Add(authKey, $"Bearer {cookie}");
                    }
                    else
                    {
                        if (context.Request.Query.TryGetValue(authKey, out var queryTokens) && queryTokens.Count == 1
                            && queryTokens[0] != null)
                        {
                            context.Request.Headers.Add(authKey, $"Bearer {queryTokens[0]}");
                        }
                    }
                }

                await next();
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
