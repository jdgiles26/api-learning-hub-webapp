# API Learning Hub

An interactive learning platform for mastering modern API protocols including REST, GraphQL, WebSocket, gRPC, and SOAP.

![API Learning Hub](https://img.shields.io/badge/API-Learning%20Hub-6366f1)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Material UI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui)

## Features

### 📚 Comprehensive Coverage
- **REST API** - Resource-oriented architecture with HTTP methods
- **GraphQL** - Query language for precise data fetching
- **WebSocket** - Real-time bidirectional communication
- **gRPC** - High-performance RPC with Protocol Buffers
- **SOAP** - XML-based enterprise protocol

### 🎨 Enhanced Learning Experience
- **Interactive Code Blocks** - Syntax highlighting with copy-to-clipboard
- **Architecture Diagrams** - Visual flow of how each protocol works
- **Comparison Table** - Side-by-side feature comparison
- **Knowledge Quiz** - 10 questions to test your understanding
- **Learning Tips** - Best practices and recommendations

### 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Material UI 5
- **Syntax Highlighting**: react-syntax-highlighter
- **Routing**: React Router 6

## Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd api-learning-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
api-learning-demo/
├── public/
│   └── api-icon.svg           # Favicon
├── src/
│   ├── components/            # Reusable components
│   │   ├── ArchitectureDiagram.tsx
│   │   ├── CodeBlock.tsx      # Syntax-highlighted code with copy
│   │   ├── FeatureCard.tsx    # Feature/Pros/Cons cards
│   │   ├── NavBar.tsx         # Top navigation
│   │   ├── QuizComponent.tsx  # Interactive quiz
│   │   └── Sidebar.tsx        # Side navigation
│   ├── data/
│   │   └── apiContent.ts      # All API content & examples
│   ├── pages/
│   │   ├── HomePage.tsx       # Landing page with overview
│   │   ├── ApiDetailPage.tsx  # Individual API detail view
│   │   ├── ComparisonPage.tsx # Side-by-side comparison
│   │   └── QuizPage.tsx       # Knowledge check
│   ├── styles/
│   │   └── globals.css        # Global styles & animations
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Content Overview

### Code Examples
Each API type includes:
- Server implementation (Node.js, Express, Apollo, etc.)
- Client implementation (Fetch, Apollo, native WebSocket, etc.)
- Alternative language examples (Python, etc.)
- Protocol definitions (Protobuf, WSDL, GraphQL schemas)

### Learning Features
1. **Architecture Flow** - Step-by-step visual diagrams
2. **Feature Cards** - Pros, cons, use cases, when to use
3. **Comparison Matrix** - 11 key features compared across all protocols
4. **Interactive Quiz** - Test knowledge with explanations

## Enhanced Features Added

### 1. Dark Theme UI
Modern dark interface with gradient accents and smooth animations

### 2. Responsive Design
Works on desktop, tablet, and mobile devices

### 3. Copy-to-Clipboard
One-click code copying with visual feedback

### 4. Tab Navigation
Organized content: Overview, Code Examples, Architecture, Comparison

### 5. Color-Coded API Types
Each API has its own color scheme for visual distinction:
- REST: Green (#4CAF50)
- GraphQL: Pink (#E535AB)
- WebSocket: Orange (#FF9800)
- gRPC: Blue (#2196F3)
- SOAP: Brown (#795548)

## Learning Path

1. **Start** → Go to Home page for overview
2. **Explore** → Click any API type card to learn details
3. **Compare** → Visit Compare page to see differences
4. **Practice** → Take the quiz to test understanding
5. **Implement** → Copy code examples and build projects

## API Selection Guide

| Use Case | Recommended API |
|----------|----------------|
| Simple CRUD operations | REST |
| Complex data queries | GraphQL |
| Real-time chat/live updates | WebSocket |
| Internal microservices | gRPC |
| Enterprise/legacy systems | SOAP |

## Contributing

Feel free to:
- Add more code examples
- Expand quiz questions
- Add more API types (Webhooks, SSE, etc.)
- Improve UI/UX

## License

MIT License - feel free to use for learning and teaching!

---

Happy Learning! 🚀
