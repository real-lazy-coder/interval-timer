# ⏰ Interval Timer

A beautiful, terminal-based interval timer that syncs to the hour. Built with [Bun](https://bun.sh), React (Ink), and TypeScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🕐 **Hour-Synced Intervals** - Aligns to clock times (e.g., 15-min intervals at :00, :15, :30, :45)
- 🎨 **Beautiful Terminal UI** - Gradient text, progress bars, and responsive layout
- 📊 **Session Statistics** - Track completed intervals and total duration
- 🎉 **Celebration Messages** - Motivating messages at milestones
- 🔔 **Audio Notifications** - Sound alerts when intervals complete
- ⚡ **Fast & Lightweight** - Built with Bun for blazing performance
- 🎯 **Customizable Intervals** - Set any interval from 1-60 minutes

## 📸 Preview

```
═══════════════ ⏰ INTERVAL TIMER ⏰ ═══════════════

           ⏳ Time Remaining: 14:23

[████████████████████████░░░░░░░░░░░░░░░░░░░░░░] 96%

┌────────────────────────────────────────────┐
│ ⏰ Current Time:       11:45:37 AM         │
│ 🎯 Next Interval:      12:00:00 PM         │
│ ⚡ Interval Duration:  15 minutes          │
└────────────────────────────────────────────┘

┌─────────── 📊 Session Statistics ──────────┐
│ 🎯 Completed:   5    ⏱️  Duration:   75 min │
│ 🔄 Current: Interval 6                      │
└─────────────────────────────────────────────┘
```

## 🚀 Installation

### Option 1: Run from Source (Requires Bun)

```bash
# Clone the repository
git clone https://github.com/yourusername/interval-timer.git
cd interval-timer

# Install dependencies
bun install

# Run the timer
bun run index.tsx
```

### Option 2: Install Globally with Bun

```bash
# Install globally
bun install -g interval-timer

# Run from anywhere
interval-timer
```

### Option 3: Use Pre-built Executables

Download the pre-built executables from the [Releases](https://github.com/yourusername/interval-timer/releases) page:

**Linux:**
```bash
# Download (replace URL with actual release URL)
curl -L -o interval-timer-linux https://github.com/yourusername/interval-timer/releases/latest/download/interval-timer-linux

# Make executable
chmod +x interval-timer-linux

# Run
./interval-timer-linux
```

**Windows:**
```powershell
# Download from releases page and run
interval-timer-windows.exe
```

## 📖 Usage

### Basic Usage

```bash
# Run with default 15-minute intervals
bun run index.tsx

# Or if installed globally
interval-timer
```

### Custom Intervals

```bash
# 10-minute intervals
bun run index.tsx --interval 10

# 5-minute intervals (short form)
bun run index.tsx -i 5

# 30-minute intervals
bun run index.tsx --interval 30
```

### Help

```bash
bun run index.tsx --help
```

## ⚙️ Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--interval <minutes>` | `-i` | Set interval duration (1-60 minutes) | `15` |
| `--help` | `-h` | Show help message | - |

## 🔧 Requirements

- **For running from source:** [Bun](https://bun.sh) v1.2.23 or higher
- **For executables:** No dependencies required (standalone binaries)

### Installing Bun

```bash
# macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash

# Or with npm
npm install -g bun
```

## 🎯 Use Cases

- **Pomodoro Technique** - Use 25-minute intervals for focused work
- **Break Reminders** - Set 15-minute intervals to remember to stretch
- **Meeting Timers** - Track meeting durations with custom intervals
- **Study Sessions** - Use 50-minute intervals with breaks
- **Fitness** - Interval training with custom workout/rest periods

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/yourusername/interval-timer.git
cd interval-timer

# Install dependencies
bun install

# Run in development
bun run index.tsx

# Build executables
bun build --compile --target=bun-linux-x64 ./index.tsx --outfile bin/interval-timer-linux --external react-devtools-core
bun build --compile --target=bun-windows-x64 ./index.tsx --outfile bin/interval-timer-windows.exe --external react-devtools-core
```

## 📂 Project Structure

```
interval-timer/
├── index.tsx              # Entry point & CLI argument parser
├── components/
│   ├── App.tsx           # Main application component
│   ├── CountdownDisplay.tsx
│   ├── ProgressBar.tsx
│   └── InfoPanel.tsx
├── utils/
│   ├── timer.ts          # Timer logic & state management
│   └── sound.ts          # Audio notification system
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh) - The fast all-in-one JavaScript runtime
- UI powered by [Ink](https://github.com/vadimdemedes/ink) - React for CLIs
- Styled with [chalk](https://github.com/chalk/chalk) and [gradient-string](https://github.com/bokub/gradient-string)

## 💡 Tips

- Press `Ctrl+C` to exit at any time
- The timer automatically syncs to clock times for consistent scheduling
- Audio notifications work on most systems with default audio output
- Use in fullscreen terminal for best experience

---

Made with ❤️ using [Bun](https://bun.sh) and [Claude Code](https://claude.com/claude-code)
