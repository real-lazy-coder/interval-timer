import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import Gradient from 'ink-gradient';
import CountdownDisplay from './CountdownDisplay.js';
import ProgressBar from './ProgressBar.js';
import InfoPanel from './InfoPanel.js';
import { getTimerState, type TimerState } from '../utils/timer.js';
import { playNotificationSound } from '../utils/sound.js';

interface AppProps {
  intervalMinutes: number;
}

/**
 * Get celebration message based on completion count
 */
function getCelebrationMessage(count: number): string {
  if (count === 1) return '🎉 First interval complete!';
  if (count === 5) return '🔥 Five intervals! On fire!';
  if (count === 10) return '⭐ Ten intervals! Crushing it!';
  if (count === 20) return '🚀 Twenty intervals! Unstoppable!';
  if (count % 10 === 0) return `💪 ${count} intervals completed! Amazing!`;
  return `✨ ${count} interval${count === 1 ? '' : 's'} completed`;
}

export default function App({ intervalMinutes }: AppProps) {
  const [timerState, setTimerState] = useState<TimerState>(() => getTimerState(intervalMinutes));
  const [completionCount, setCompletionCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Update timer every second for stable rendering
    const interval = setInterval(() => {
      const newState = getTimerState(intervalMinutes);
      setTimerState(newState);

      // Check if we've hit the interval (remainingSeconds reaches 0)
      if (newState.remainingSeconds === 0) {
        // Play notification sound
        playNotificationSound();
        setCompletionCount(prev => prev + 1);

        // Show celebration message briefly
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [intervalMinutes]);

  return (
    <Box flexDirection="column" padding={1} borderStyle="bold" borderColor="magenta">
      {/* Header with gradient */}
      <Box justifyContent="center" marginBottom={0}>
        <Gradient name="rainbow">
          <Text bold>
            {'═'.repeat(15)} ⏰ INTERVAL TIMER ⏰ {'═'.repeat(15)}
          </Text>
        </Gradient>
      </Box>

      {/* Celebration message (shows briefly after completion) - Fixed height to prevent jumping */}
      <Box justifyContent="center" height={1}>
        {showCelebration && (
          <Text bold backgroundColor="green" color="black">
            {' '}{getCelebrationMessage(completionCount)}{' '}
          </Text>
        )}
      </Box>

      {/* Countdown Display */}
      <CountdownDisplay
        remainingSeconds={timerState.remainingSeconds}
        progress={timerState.progress}
      />

      {/* Progress Bar */}
      <ProgressBar progress={timerState.progress} width={60} />

      {/* Info Panel */}
      <InfoPanel
        currentTime={timerState.currentTime}
        nextIntervalTime={timerState.nextIntervalTime}
        intervalMinutes={intervalMinutes}
      />

      {/* Stats Section */}
      <Box flexDirection="column" borderStyle="single" borderColor="yellow" padding={1}>
        <Box justifyContent="center" marginBottom={0}>
          <Text bold>{chalk.yellow('📊 Session Statistics')}</Text>
        </Box>
        <Box justifyContent="space-around">
          <Text>
            {chalk.cyan('🎯 Completed:')} {chalk.bold.white(String(completionCount).padStart(3, ' '))}
          </Text>
          <Text>
            {chalk.green('⏱️  Duration:')} {chalk.bold.white(`${String(completionCount * intervalMinutes).padStart(4, ' ')} min`)}
          </Text>
          <Text>
            {chalk.magenta('🔄 Current:')} {chalk.bold.white(`Interval ${String(completionCount + 1).padStart(3, ' ')}`)}
          </Text>
        </Box>
      </Box>

      {/* Footer with decorative border */}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>
          {chalk.dim('━'.repeat(20))} Press {chalk.bold('Ctrl+C')} to exit {chalk.dim('━'.repeat(20))}
        </Text>
      </Box>
    </Box>
  );
}
