import React from 'react';
import { Box, Text } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import { formatCountdown } from '../utils/timer.js';
import chalk from 'chalk';

interface CountdownDisplayProps {
  remainingSeconds: number;
  progress: number;
}

/**
 * Get gradient name based on progress
 */
function getGradientName(progress: number): string {
  if (progress < 0.5) {
    return 'morning';
  } else if (progress < 0.75) {
    return 'teen';
  } else if (progress < 0.9) {
    return 'vice';
  } else if (progress < 0.95) {
    return 'passion';
  } else {
    return 'fruit';
  }
}

/**
 * Get status message based on progress
 */
function getStatusMessage(progress: number, remainingSeconds: number): string {
  if (remainingSeconds <= 10) {
    return '⚡ ALMOST THERE   ';  // Fixed width to prevent jumping
  } else if (progress < 0.25) {
    return '🌱 Just Getting Started';
  } else if (progress < 0.5) {
    return '💪 Keep Going Strong';
  } else if (progress < 0.75) {
    return '🔥 Halfway There';
  } else if (progress < 0.9) {
    return '⏰ Final Stretch';
  } else {
    return '🚀 Almost Done';
  }
}

const CountdownDisplay = React.memo(function CountdownDisplay({ remainingSeconds, progress }: CountdownDisplayProps) {
  const timeString = formatCountdown(remainingSeconds);
  const gradientName = getGradientName(progress);
  const statusMessage = getStatusMessage(progress, remainingSeconds);

  return (
    <Box flexDirection="column" alignItems="center">
      {/* Big countdown timer - Fixed width container */}
      <Box width={44} justifyContent="center">
        <Gradient name={gradientName}>
          <BigText text={timeString} font="simple" />
        </Gradient>
      </Box>

      {/* Status message with animation - Fixed width */}
      <Box width={44} justifyContent="center">
        <Text bold>
          {remainingSeconds <= 10 ? chalk.red(statusMessage) : chalk.cyan(statusMessage)}
        </Text>
      </Box>
    </Box>
  );
});

export default CountdownDisplay;
