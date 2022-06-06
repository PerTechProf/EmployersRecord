using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EmployersRecord
{
    public class Options
    {
        public const string CookieName = "AuthToken";

        public static SymmetricSecurityKey GetSigningKey() =>
            new SymmetricSecurityKey(
                    System.Text.Encoding.ASCII.GetBytes("PDv7DrqznYL6nv7DrqzjnQYO9JxIsWdcjnQYL6nu0f"));
    }
}