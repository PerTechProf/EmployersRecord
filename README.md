1. cd ClientApp
2. npm ci
3. cd ..
4. dotnet restore
5. (if dotnet ef doesn't work)dotnet tool install --global dotnet-ef
6. dotnet ef database update
7. Copy appsettings.json and rename to appsettings.Development.json
8. Add DbConnectionString to appsettings.Development.json
9. dotnet run -v n
