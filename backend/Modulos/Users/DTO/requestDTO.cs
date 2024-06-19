namespace backend.Modulos.Users.DTO;

public record UserRequestDTO(string Username, string Email, string Password);
public record LoginRequestDTO(string email, string password);