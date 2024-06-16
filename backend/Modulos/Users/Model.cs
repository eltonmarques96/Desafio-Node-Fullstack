namespace backend.Modulos.Users;
public class User
{
    public Guid Id { get; init; }
    public string Username { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }

    public User(string username, string email, string password)
    {
        Id = Guid.NewGuid();
        Email = email;
        Username = username;
        Password = password;
    }
}