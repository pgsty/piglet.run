---
title: Claude Code
linkTitle: Claude Code
weight: 50
icon: fa-solid fa-robot
---

## AI-Assisted Development

Learn to use Claude Code for AI-assisted development in Piglet Run.

## Prerequisites

You need an Anthropic API key. Set it up:

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

## Getting Started

### 1. Launch Claude Code

In VS Code terminal:

```bash
claude
```

### 2. Give Instructions

Ask Claude to help with your project:

```
> Create a FastAPI app with PostgreSQL integration
```

### 3. Review and Accept

Claude will:
- Analyze your request
- Generate code
- Explain the changes
- Wait for your approval

## Best Practices

| Practice | Reason |
|----------|--------|
| Create snapshots | Roll back if needed |
| Review changes | Verify before accepting |
| Be specific | Better results |
| Iterate | Refine step by step |

## Safety

Piglet Run makes AI coding safer:
- **Snapshots**: Restore any time
- **Monitoring**: Track AI activity
- **Isolation**: Sandboxed environment

## Monitoring

View Claude Code activity at:
```
http://<ip>/ui/d/claude-code
```

## Next Steps

- Explore [Database](/docs/tutorial/database/)
- Build an [Application](/docs/tutorial/application/)
