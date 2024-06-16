using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Modulos.Users;

public static class UserController
{
    public static void UserRoutes(this WebApplication application)
    {
        var userRoutes = application.MapGroup(prefix: "users");

        userRoutes.MapPost(pattern: "", handler: async (CreateUser request, AppDbContext context, CancellationToken ct) =>
        {
            var checkIfUserAlreadyExists = await context.Users.AnyAsync(user => user.Email == request._email);
            if (checkIfUserAlreadyExists == true)
            {
                return Results.Conflict(error: "User Already Exists");
            }
            var encryptedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(request._password, 20);

            var newUser = new User(request._fullName, request._email, encryptedPassword);
            var result = await context.Users.AddAsync(newUser, ct);
            await context.SaveChangesAsync(ct);
            var userReturn = new UserDTO(newUser.Id, newUser.Username, newUser.Email);

            return Results.Ok();
        });
    }
}