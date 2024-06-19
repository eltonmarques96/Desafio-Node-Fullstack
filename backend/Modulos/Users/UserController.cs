using backend.Data;
using backend.Modulos.Users.DTO;
using backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.Modulos.Users;

public static class UserController
{
    public static void UserRoutes(this WebApplication application)
    {
        var userRoutes = application.MapGroup(prefix: "users");

        userRoutes.MapPost(pattern: "", handler: async (UserRequestDTO request, AppDbContext context, CancellationToken ct) =>
        {
            var checkIfUserAlreadyExists = await context.Users.AnyAsync(user => user.Email == request.Email);
            if (checkIfUserAlreadyExists == true)
            {
                return Results.Conflict(error: "User Already Exists");
            }
            var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password, 10);
            var newUser = new User(request.Username, request.Email, encryptedPassword);
            var result = await context.Users.AddAsync(newUser, ct);
            await context.SaveChangesAsync(ct);
            var userReturn = new UserResponseDTO(newUser.Id, newUser.Username, newUser.Email);

            return Results.Ok();
        });

        userRoutes.MapPost(pattern: "/login", handler: async (LoginRequestDTO request, AppDbContext context, CancellationToken ct) =>
        {
            var userInDb = await context.Users.FirstOrDefaultAsync(u => u.Email == request.email, ct);
            if (userInDb is null || !BCrypt.Net.BCrypt.Verify(request.password, userInDb.Password))
            {
                return Results.NotFound(new { message = "User or password is incorrect" });
            };
            var token = TokenService.GenerateToken(userInDb);
            var userReturn = new LoginResponseDTO(userInDb.Id, userInDb.Username, userInDb.Email, token);
            return Results.Ok(userReturn);
        });
    }
}