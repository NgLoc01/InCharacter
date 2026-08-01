using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("characters")]
    public IActionResult GetCharacters() =>
        Ok(Characters.All.Select(c => new { c.Id, c.Name, c.ImageUrl }));

    [HttpPost("chat")]
    public async Task PostChat([FromBody] ChatRequest request)
    {
        Response.ContentType = "text/plain; charset=utf-8";

        await foreach (var chunk in _chatService.StreamReplyAsync(request.CharacterId ?? "", request.Message))
        {
            await Response.WriteAsync(chunk);
        }
    }
}
