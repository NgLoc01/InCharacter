namespace Backend.Services;

public interface IChatService
{
    IAsyncEnumerable<string> StreamReplyAsync(string characterId, string message);
}
