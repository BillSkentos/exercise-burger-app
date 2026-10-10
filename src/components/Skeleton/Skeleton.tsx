import './Skeleton.css';

interface SkeletonProps {
  height?: number;
  className?: string;
}

export function Skeleton({ height = 16, className }: SkeletonProps) {
  return (
    <div
      className={['skeleton', className].filter(Boolean).join(' ')}
      style={{ height }}
    />
  );
}
