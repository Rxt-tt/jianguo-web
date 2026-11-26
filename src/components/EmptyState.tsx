import type { ReactNode } from 'react';
import { InboxIcon } from './icons';
import './EmptyState.css';

export interface EmptyStateProps {
  /** 主标题，一句话说明当前状态 */
  title: string;
  /** 补充说明 */
  description?: string;
  /** 顶部图标，缺省使用收件箱图标 */
  icon?: ReactNode;
  /** 底部操作区（按钮、链接等） */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const classes = ['empty', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className="empty__icon" aria-hidden="true">
        {icon ?? <InboxIcon size={26} />}
      </span>
      <h3 className="empty__title">{title}</h3>
      {description && <p className="empty__desc">{description}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  );
}