import type { HTMLAttributes } from 'react';
import './Card.css';

export type CardVariant = 'elevated' | 'outlined' | 'soft';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 视觉样式，默认 elevated */
  variant?: CardVariant;
  /** 内边距，默认 md */
  padding?: CardPadding;
  /** 悬停时抬升（用于可点击卡片或链接容器） */
  interactive?: boolean;
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  className,
  ...rest
}: CardProps) {
  const classes = [
    'card',
    `card--${variant}`,
    `card--pad-${padding}`,
    interactive && 'card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...rest} />;
}