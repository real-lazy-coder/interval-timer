import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import Gradient from 'ink-gradient';

interface ProgressBarProps {
  progress: number; // 0 to 1
  width?: number;
}

/**
 * Get color for progress bar based on completion
 */
function getProgressColor(progress: number): (text: string) => string {
  if (progress < 0.5) {
    return chalk.green;
  } else if (progress < 0.75) {
    return chalk.cyan;
  } else if (progress < 0.9) {
    return chalk.yellow;
  } else {
    return chalk.red;
  }
}

/**
 * Get progress bar character based on position
 */
function getProgressChar(index: number, filledWidth: number, width: number): string {
  if (index < filledWidth - 1) {
    return '█';
  } else if (index === filledWidth - 1) {
    return '▓';
  } else if (index === filledWidth) {
    return '▒';
  } else {
    return '░';
  }
}

/**
 * Get motivational icon based on progress
 */
function getProgressIcon(progress: number): string {
  if (progress < 0.25) return '🌱';
  if (progress < 0.5) return '💪';
  if (progress < 0.75) return '🔥';
  if (progress < 0.9) return '⚡';
  return '🚀';
}

const ProgressBar = React.memo(function ProgressBar({ progress, width = 60 }: ProgressBarProps) {
  const filledWidth = Math.round(progress * width);
  const emptyWidth = width - filledWidth;

  const filled = '█'.repeat(filledWidth);
  const empty = '░'.repeat(emptyWidth);

  const colorFn = getProgressColor(progress);
  const percentage = Math.round(progress * 100);
  const icon = getProgressIcon(progress);

  // Create gradient-styled bar segments
  const segments: string[] = [];
  for (let i = 0; i < width; i++) {
    segments.push(getProgressChar(i, filledWidth, width));
  }

  return (
    <Box flexDirection="column">
      {/* Progress bar label */}
      <Box justifyContent="space-between" width={width + 4}>
        <Text bold>{icon} Progress</Text>
        <Text bold>{String(percentage).padStart(3, ' ')}%</Text>
      </Box>

      {/* Progress bar with borders */}
      <Box>
        <Text>{chalk.dim('║')}</Text>
        <Text>{colorFn(filled)}</Text>
        <Text dimColor>{empty}</Text>
        <Text>{chalk.dim('║')}</Text>
      </Box>
    </Box>
  );
});

export default ProgressBar;
