namespace backend.Modulos.Users.DTO;

public record LoginResponseDTO(Guid Id, string Username, string Email, string Token);
public record UserResponseDTO(Guid Id, string Username, string Email);
