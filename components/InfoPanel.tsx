import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import { formatTime } from '../utils/timer.js';

interface InfoPanelProps {
  currentTime: Date;
  nextIntervalTime: Date;
  intervalMinutes: number;
}

const InfoPanel = React.memo(function InfoPanel({ currentTime, nextIntervalTime, intervalMinutes }: InfoPanelProps) {
  return (
    <Box flexDirection="column" borderStyle="double" borderColor="cyan" padding={1}>
      {/* Current Time */}
      <Box>
        <Text>
          {chalk.magenta('🕐 Current Time')}
          {' '.repeat(8)}
          {chalk.bold.white(formatTime(currentTime))}
        </Text>
      </Box>

      {/* Next Interval */}
      <Box>
        <Text>
          {chalk.green('⏭️  Next Interval')}
          {' '.repeat(7)}
          {chalk.bold.green(formatTime(nextIntervalTime))}
        </Text>
      </Box>

      {/* Interval Config */}
      <Box>
        <Text>
          {chalk.yellow('⚙️  Interval: ')}
          {chalk.bold.yellow(`${intervalMinutes} minutes`)}
          {chalk.dim(' (synced to hour)')}
        </Text>
      </Box>
    </Box>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent re-renders when dates have same time
  return (
    prevProps.currentTime.getTime() === nextProps.currentTime.getTime() &&
    prevProps.nextIntervalTime.getTime() === nextProps.nextIntervalTime.getTime() &&
    prevProps.intervalMinutes === nextProps.intervalMinutes
  );
});

export default InfoPanel;
