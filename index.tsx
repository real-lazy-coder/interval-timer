#!/usr/bin/env bun
import React from 'react';
import { render } from 'ink';
import App from './components/App.js';

/**
 * Parse command line arguments using Bun's native process.argv
 */
function parseArguments(): number {
  const args = process.argv.slice(2);

  // Show help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Interval Timer - Hour-Synced Countdown Timer

Usage:
  bun index.ts [--interval <minutes>]
  bun index.ts --help

Options:
  --interval, -i <minutes>  Set interval in minutes (default: 15)
  --help, -h                Show this help message

Examples:
  bun index.ts                    # 15 minute intervals (default)
  bun index.ts --interval 10      # 10 minute intervals
  bun index.ts -i 5               # 5 minute intervals

The timer syncs to the hour, so intervals align with clock times.
For example, 15-minute intervals trigger at :00, :15, :30, :45.
`);
    process.exit(0);
  }

  // Parse interval argument
  let intervalMinutes = 15; // default

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--interval' || args[i] === '-i') {
      const value = args[i + 1];
      if (value) {
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 60) {
          intervalMinutes = parsed;
        } else {
          console.error('Error: Interval must be a positive number between 1 and 60');
          process.exit(1);
        }
      }
    }
  }

  return intervalMinutes;
}

// Parse arguments
const intervalMinutes = parseArguments();

// Render the app
render(<App intervalMinutes={intervalMinutes} />);