# Projects Dependency Manager

Manage all project dependencies recursively from the `/projects` parent directory.

## Installation

This package is designed to run from the `/projects` directory. No additional setup needed beyond npm.

## Available Commands

### Install all packages
```bash
npm run install:all
```
Recursively finds all subdirectories containing `package.json` and runs `npm install` in each.

### Uninstall all packages
```bash
npm run uninstall:all
```
Recursively removes `node_modules` directories and `package-lock.json` files from all projects.

### Clean and reinstall
```bash
npm run clean:all
```
Runs uninstall followed by install. Useful for complete dependency refresh.

## How It Works

The scripts automatically:
1. **Discover Projects**: Recursively searches for all directories containing `package.json`
2. **Process Each Project**: Runs npm operations in the correct working directory
3. **Provide Feedback**: Shows progress with visual indicators (✅, ❌, 📦, etc.)
4. **Handle Errors**: Gracefully handles missing directories or npm errors

## Project Structure
```
projects/
├── package.json (parent - DO NOT EDIT MANUALLY)
├── scripts/
│   ├── install-all.js
│   └── uninstall-all.js
├── scheduled-personalized-msg/
│   ├── cron-job-telegram/
│   │   └── package.json
│   ├── llm-integration/
│   │   └── package.json
│   ├── superbase-pg/
│   │   └── package.json
│   └── telegram-script/
│       └── package.json
```

## Example Output

```
🔍 Found 4 project(s):

  - scheduled-personalized-msg/cron-job-telegram
  - scheduled-personalized-msg/llm-integration
  - scheduled-personalized-msg/superbase-pg
  - scheduled-personalized-msg/telegram-script

📦 Installing packages...

  [1/4] Installing: scheduled-personalized-msg/cron-job-telegram
  ✅ scheduled-personalized-msg/cron-job-telegram installed

  [2/4] Installing: scheduled-personalized-msg/llm-integration
  ✅ scheduled-personalized-msg/llm-integration installed

  [3/4] Installing: scheduled-personalized-msg/superbase-pg
  ✅ scheduled-personalized-msg/superbase-pg installed

  [4/4] Installing: scheduled-personalized-msg/telegram-script
  ✅ scheduled-personalized-msg/telegram-script installed

📊 Installation Summary:
  ✅ Successful: 4
  ❌ Failed: 0
```

## Usage Examples

### Run from Windows PowerShell
```powershell
cd C:\Users\rushi\OneDrive\Documents\Desktop\Projects-AI\ai-workflow-systems\projects
npm run install:all
```

### Run from Command Prompt
```cmd
cd C:\Users\rushi\OneDrive\Documents\Desktop\Projects-AI\ai-workflow-systems\projects
npm run uninstall:all
npm run install:all
```

## Troubleshooting

- **Scripts not found**: Ensure you're running commands from the `/projects` directory
- **Permission denied**: Run terminal as Administrator on Windows
- **npm command not found**: Ensure Node.js and npm are installed
