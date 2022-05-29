using Microsoft.Extensions.Configuration;

namespace EmployersRecord
{
    public class AppSettings : Interfaces.IAppSettings
    {
        private readonly IConfiguration _config;

        public AppSettings(IConfiguration config)
        {
            _config = config;
        }

        public string DbConnectionString =>
            _config.GetConnectionString("DbConnectionString") ?? 
                throw new System.Exception("DataBase connection string must be provided");
    }
}