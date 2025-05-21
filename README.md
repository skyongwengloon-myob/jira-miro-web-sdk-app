# jira-miro-web-sdk-app

# 🧩 Jira Miro Web SDK App

This project integrates Jira sprint data with Miro, allowing you to generate burn-up charts and tables directly on a Miro board using the Miro Web SDK.

---

## 🚀 Getting Started

To run the application, start both the **backend** and **frontend** services in separate terminals.

---

### 1️⃣ Start the Backend (Node.js + Express)

Runs on [http://localhost:3001](http://localhost:3001)

```bash
npm run server
```

### 2️⃣ Start the Backend (Node.js + Express)

Runs on [http://localhost:3001](http://localhost:3001)

```bash
npm run dev
```

### 📁 Project Structure

```pgsql
jira-miro-web-sdk-app/
├── server/             # Backend service (Express)
│   ├── routes/         # API routes
│   ├── services/       # Jira + Miro integration logic
│   ├── index.js        # Main backend entry point
│   └── bootstrap.js    # Optional: preload .env before imports
├── src/                # Frontend (Vite + Miro SDK)
│   ├── jiraApi.js      # Jira API functions
│   ├── miroApi.js      # Miro SDK wrapper
│   └── chartBuilder.js # Burn-up chart config (Chart.js)
├── .env                # Environment variables
├── package.json
└── README.md
```

### 🔐 Environment Variables

```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_TOKEN=your-jira-api-token
JIRA_BOARD_ID=your-jira-board-id
MIRO_TOKEN=your_miro_token
MIRO_BOARD_ID=your-miro-board-id
```
✅ Ensure these environment variables are used only in the backend code (Node.js), not frontend.

### 📊 Features
- Retrieves the last 4 closed sprints + current active sprint from Jira.
- Computes total and completed issues per sprint.
- Displays data in a Miro table.
- Generates a burn-up chart using Chart.js and uploads it to Miro.

### 🛠 Requirements
- Node.js 18+ or 20+
- A Miro Developer App
- Jira Cloud instance with API token access

### 📌 Tips
- Use .js extensions explicitly in all import statements when using ES Modules.
- Ensure "type": "module" is present in package.json.
- Environment variables from .env must be accessed via process.env in backend code only.

### 🧪 Testing API Endpoint
- To verify the backend is working, visit:
```bash
http://localhost:3001/api/hello
```
- Expected response:
```json
{ "message": "Backend is working" }
```

### 📄 License
```vbnet
Nothing here
```