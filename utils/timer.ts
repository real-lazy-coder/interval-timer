/**
 * Timer utility for calculating interval-synced countdown
 */

export interface TimerState {
  currentTime: Date;
  nextIntervalTime: Date;
  remainingMs: number;
  remainingSeconds: number;
  totalSeconds: number;
  progress: number; // 0 to 1
}

/**
 * Calculate the next interval time synced to the hour
 * For example, if interval is 5 minutes, next times are :00, :05, :10, :15, etc.
 */
export function getNextIntervalTime(intervalMinutes: number): Date {
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();
  const currentMs = now.getMilliseconds();

  // Calculate how many minutes past the last interval boundary we are
  const minutesPastInterval = currentMinutes % intervalMinutes;

  // Calculate minutes until next interval
  const minutesUntilNext = minutesPastInterval === 0 && currentSeconds === 0 && currentMs === 0
    ? intervalMinutes // If exactly on the boundary, go to next interval
    : intervalMinutes - minutesPastInterval;

  // Create next interval time
  const nextTime = new Date(now);
  nextTime.setMinutes(currentMinutes + minutesUntilNext);
  nextTime.setSeconds(0);
  nextTime.setMilliseconds(0);

  return nextTime;
}

/**
 * Get current timer state
 */
export function getTimerState(intervalMinutes: number): TimerState {
  const currentTime = new Date();
  const nextIntervalTime = getNextIntervalTime(intervalMinutes);
  const remainingMs = nextIntervalTime.getTime() - currentTime.getTime();
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const totalSeconds = intervalMinutes * 60;
  const progress = 1 - (remainingSeconds / totalSeconds);

  return {
    currentTime,
    nextIntervalTime,
    remainingMs,
    remainingSeconds,
    totalSeconds,
    progress: Math.max(0, Math.min(1, progress)),
  };
}

/**
 * Format time as HH:MM:SS
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Format seconds as MM:SS
 */
export function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
