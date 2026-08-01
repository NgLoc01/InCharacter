- https://www.youtube.com/watch?v=PJGIGKTl67U
- https://blog.masteringbackend.com/how-to-create-an-azure-open-ai-resource-and-deploy-your-first-model
- https://learn.microsoft.com/en-us/azure/foundry-classic/openai/how-to/create-resource?view=foundry-classic&pivots=web-portal

Setup:

    The backend won't run out of the box because it has no `backend/.env` file.
    Create one (it's gitignored) with your own Azure OpenAI credentials:

        AzureOpenAI__Endpoint=<your-azure-openai-endpoint>
        AzureOpenAI__ApiKey=<your-azure-openai-api-key>
        AzureOpenAI__DeploymentName=<your-deployment-name>


InCharater structure:

    backend
        Program.cs
        Controllers
        Services
        Models
        Data

    frontend
        index.html
        src
            App.tsx
            main.tsx
            components
            hooks
