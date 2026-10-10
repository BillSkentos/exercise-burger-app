import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { ClockIcon } from '../icons';
import './SessionTimer.css';

const WARNING_THRESHOLD_MS = 60 * 1000;

interface SessionTimerProps {
  expiresAt: number;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function SessionTimer({ expiresAt }: SessionTimerProps) {
  const [now, setNow] = useState(() => Date.now());
  useInterval(() => setNow(Date.now()), 1000);

  const remaining = expiresAt - now;
  const warn = remaining <= WARNING_THRESHOLD_MS;

  return (
    <span
      className={`session-timer${warn ? ' session-timer--warn' : ''}`}
      title="Your sign-in expires after 10 minutes"
    >
      <ClockIcon size={15} />
      <span className="session-timer__label">Session</span>
      <span>{formatRemaining(remaining)}</span>
    </span>
  );
}
