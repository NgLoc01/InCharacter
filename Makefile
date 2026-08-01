.PHONY: dev backend frontend

dev:
	@trap 'kill 0' EXIT INT TERM; \
	(cd backend && dotnet run) & \
	(cd frontend && npm run dev) & \
	wait

backend:
	cd backend && dotnet run

frontend:
	cd frontend && npm run dev
