using Azure.AI.OpenAI;
using OpenAI.Chat;
using Backend.Data;

namespace Backend.Services;

public class ChatService : IChatService
{
    private readonly AzureOpenAIClient _client;
    private readonly string _deploymentName;

    public ChatService(AzureOpenAIClient client, IConfiguration configuration)
    {
        _client = client;
        _deploymentName = configuration["AzureOpenAI:DeploymentName"] ?? "";
    }

    public async IAsyncEnumerable<string> StreamReplyAsync(string characterId, string message)
    {
        var character = Characters.All.FirstOrDefault(c => c.Id == characterId) ?? Characters.Iroh;

        var chatClient = _client.GetChatClient(_deploymentName);

        var messages = new List<ChatMessage>
        {
            ChatMessage.CreateSystemMessage(character.SystemPrompt),
            ChatMessage.CreateUserMessage(message),
        };

        var options = new ChatCompletionOptions { Temperature = character.Temperature };

        await foreach (StreamingChatCompletionUpdate update in chatClient.CompleteChatStreamingAsync(messages, options))
        {
            foreach (var part in update.ContentUpdate)
            {
                if (string.IsNullOrEmpty(part.Text)) continue;
                yield return part.Text;
            }
        }
    }
}
