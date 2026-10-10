import type { ReactNode } from 'react';
import './Badge.css';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={['badge', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
