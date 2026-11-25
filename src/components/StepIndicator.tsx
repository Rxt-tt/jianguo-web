import { CheckIcon } from './icons';
import './StepIndicator.css';

export interface StepIndicatorProps {
  /** 顺序展示的步骤名称 */
  steps: readonly string[];
  /** 当前步骤下标，从 0 开始 */
  current: number;
  /** 屏幕阅读器可读的流程名称 */
  label?: string;
  className?: string;
}

export function StepIndicator({
  steps,
  current,
  label = '制作进度',
  className,
}: StepIndicatorProps) {
  const active = Math.min(Math.max(current, 0), steps.length - 1);
  const classes = ['steps', className].filter(Boolean).join(' ');

  return (
    <ol className={classes} aria-label={label}>
      {steps.map((step, index) => {
        const state =
          index < active ? 'done' : index === active ? 'current' : 'todo';

        return (
          <li
            key={step}
            className={`steps__item steps__item--${state}`}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className="steps__dot" aria-hidden="true">
              {state === 'done' ? <CheckIcon size={14} /> : index + 1}
            </span>
            <span className="steps__label">
              <span className="visually-hidden">
                {state === 'done'
                  ? '已完成：'
                  : state === 'current'
                    ? '当前步骤：'
                    : '未开始：'}
              </span>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}