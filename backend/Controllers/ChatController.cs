using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace Backend.Controllers;

[ApiController]
[Route("api")]
public class ChatController : ControllerBase
{
    [HttpGet("characters")]
    public IActionResult GetCharacters() =>
        Ok(Characters.All.Select(c => new { c.Id, c.Name, c.ImageUrl }));
}
