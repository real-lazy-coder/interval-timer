/**
 * Sound notification utility using Bun's subprocess
 */

/**
 * Play a notification sound
 * Uses system-specific commands to play a beep/notification sound
 */
export async function playNotificationSound(): Promise<void> {
  try {
    // Try different methods based on available commands
    // Method 1: paplay (PulseAudio - common on Linux)
    try {
      await Bun.$`paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null`.quiet();
      return;
    } catch {
      // Continue to next method
    }

    // Method 2: aplay (ALSA - Linux)
    try {
      await Bun.$`aplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null`.quiet();
      return;
    } catch {
      // Continue to next method
    }

    // Method 3: afplay (macOS)
    try {
      await Bun.$`afplay /System/Library/Sounds/Glass.aiff 2>/dev/null`.quiet();
      return;
    } catch {
      // Continue to next method
    }

    // Method 4: powershell beep (Windows)
    try {
      await Bun.$`powershell -c "[console]::beep(800,300)" 2>/dev/null`.quiet();
      return;
    } catch {
      // Continue to next method
    }

    // Method 5: speaker-test (Linux fallback - plays a quick tone)
    try {
      await Bun.$`timeout 0.3 speaker-test -t sine -f 800 2>/dev/null`.quiet();
      return;
    } catch {
      // Continue to next method
    }

    // Method 6: Terminal bell (universal fallback)
    process.stdout.write('\x07');
  } catch (error) {
    // Silently fail if no sound method works
    // At minimum, the terminal bell (\x07) should have been attempted
  }
}
