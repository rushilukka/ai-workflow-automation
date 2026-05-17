# NVIDIA LLM Integration - Test Script

Simple Node.js testing script for generating scheduled reminder messages using NVIDIA's DeepSeek API with OpenAI SDK.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set NVIDIA API Key

Set your NVIDIA API key as an environment variable:

**Windows (PowerShell):**
```powershell
$env:NVIDIA_API_KEY = "your_nvidia_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set NVIDIA_API_KEY=your_nvidia_api_key_here
```

**Linux/Mac:**
```bash
export NVIDIA_API_KEY=your_nvidia_api_key_here
```

### 3. Run the Script

```bash
npm start
```

## How It Works

The script connects to NVIDIA's API endpoint at `https://integrate.api.nvidia.com/v1` and:

1. Uses the `deepseek-ai/deepseek-r1` model
2. Generates a productivity reminder message
3. Prints the generated message to console

## Example Output

```
Today's productivity reminder: Stay focused on your most important task. Break down complex projects into smaller, manageable steps.
```

## Configuration

To customize the reminder message, edit `test.js`:

- **Model**: Change `deepseek-ai/deepseek-r1` to another NVIDIA-supported model
- **System Message**: Modify the system role content to change message generation behavior
- **User Message**: Update the user content to generate different types of messages
- **Temperature**: Adjust from 0.7 (0 = deterministic, 1 = creative)
- **Max Tokens**: Limit response length (currently 200)

## Files

- `package.json` - Project configuration and dependencies
- `test.js` - Main testing script
- `.env.example` - Environment variables template
- `README.md` - This file

## Requirements

- Node.js 18+
- NVIDIA API key with access to DeepSeek models
