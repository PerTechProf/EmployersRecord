using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EmployersRecord
{
    public class Options
    {
        public const string CookieName = "AuthToken";

        public static SymmetricSecurityKey GetSigningKey() =>
        new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes("035ERRRE-3501-438E-92DD-95AD3C97F847_FC5579DE-B39F-473A-BA2E-9CDE3054122C"));
    }
}