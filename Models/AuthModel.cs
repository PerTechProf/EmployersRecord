using EmployersRecord.Entities;

namespace EmployersRecord.Models
{
    public class AuthModel
    {
        public AuthModel(string token, User user) {
            Token = token;
            IsEditor = user.IsEditor;
            UserId = user.Id;
        }
        public string Token { get; set; }
        public bool IsEditor { get; set; }
        public int UserId { get; set; }
    }
}