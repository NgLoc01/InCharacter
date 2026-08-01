using System.ClientModel;
using Azure.AI.OpenAI;
using Backend.Services;

DotNetEnv.Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

var azureEndpoint = builder.Configuration["AzureOpenAI:Endpoint"] ?? "";
var azureApiKey = builder.Configuration["AzureOpenAI:ApiKey"] ?? "";

builder.Services.AddSingleton(new AzureOpenAIClient(new Uri(azureEndpoint), new ApiKeyCredential(azureApiKey)));
builder.Services.AddScoped<IChatService, ChatService>();

builder.Services.AddCors(o => o.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();
app.MapControllers();

app.Run();
