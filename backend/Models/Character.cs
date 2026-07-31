namespace Backend.Models;

public record Character(string Name, string ImageUrl, float Temperature, string SystemPrompt)
{
    public string Id => Name.ToLowerInvariant().Replace(" ", "-").Replace("'", "");
}
