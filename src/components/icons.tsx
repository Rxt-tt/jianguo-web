import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 边长（px），默认 20 */
  size?: number;
}

type IconBaseProps = IconProps & { children: React.ReactNode };

function IconBase({ size = 20, children, ...rest }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function BrandMark({ size = 28, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="15.5" cy="17.5" r="12.5" fill="currentColor" />
      <path
        d="M15.5 5.5c1.5-2.4 4.1-3.6 6.6-3.2-.1 2.7-1.7 5-4.1 5.9"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="15.5" cy="17.5" r="7.2" fill="#fcf8f1" opacity="0.94" />
      <circle cx="15.5" cy="17.5" r="7.2" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="12.6" cy="15" r="1.35" fill="currentColor" opacity="0.55" />
      <circle cx="18.2" cy="14.6" r="1.35" fill="currentColor" opacity="0.55" />
      <circle cx="15.6" cy="20.2" r="1.35" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 10.6 12 3.4l8.5 7.2" />
      <path d="M5.8 9.2v10.9h12.4V9.2" />
      <path d="M9.7 20.1v-5.4h4.6v5.4" />
    </IconBase>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17.5H5.6a3.6 3.6 0 0 1-.5-7.17A5.6 5.6 0 0 1 15.9 8.5a4.5 4.5 0 0 1 2.9.9 3.9 3.9 0 0 1 1.1 6.1" />
      <path d="M12 12.2v7.3" />
      <path d="m9.1 15 2.9-2.9 2.9 2.9" />
    </IconBase>
  );
}

export function WorksIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.2 17.6 4.5-4.2a2 2 0 0 1 2.7 0l2.3 2.1 2-1.8a2 2 0 0 1 2.6.05l1.9 1.7" />
    </IconBase>
  );
}

export function PricingIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M11.4 3.6H5.2a1.6 1.6 0 0 0-1.6 1.6v6.2c0 .42.17.83.47 1.13l7.4 7.4a1.6 1.6 0 0 0 2.26 0l6.2-6.2a1.6 1.6 0 0 0 0-2.26l-7.4-7.4a1.6 1.6 0 0 0-1.13-.47Z" />
      <circle cx="8.1" cy="8.1" r="1.4" />
    </IconBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8.2" r="3.9" />
      <path d="M4.6 20.4a7.4 7.4 0 0 1 14.8 0" />
    </IconBase>
  );
}

export function SceneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="17.4" cy="7.4" r="2.6" />
      <path d="M2.8 19.6h18.4" />
      <path d="m4.6 19.6 5-7.4 3.2 4.5 1.7-2.3 4.9 5.2" />
    </IconBase>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <circle cx="8.6" cy="10" r="1.7" />
      <path d="m3.8 17.6 4.6-4.3a2 2 0 0 1 2.7 0l2.4 2.2 2-1.8a2 2 0 0 1 2.6 0l2.3 2" />
    </IconBase>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.6 13.7 9l5.4 1.7-5.4 1.7L12 17.8l-1.7-5.4L4.9 10.7 10.3 9Z" />
      <path d="M18.6 15.6l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8Z" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.1} {...props}>
      <path d="m4.8 12.4 4.6 4.6 9.8-9.8" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 12h14.6" />
      <path d="m13.4 6.3 5.7 5.7-5.7 5.7" />
    </IconBase>
  );
}

export function InboxIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.6 13.4h4.1l1.3 2.3h6l1.3-2.3h4.1" />
      <path d="M5.6 5.1h12.8l2.1 8.3v3.6a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-3.6Z" />
    </IconBase>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 19.5c-.5-7 4.4-13.4 15-14.5.9 10-4.7 15.4-11.2 15.2" />
      <path d="M8.4 16.6c2.2-3.4 5-5.7 8.6-7.4" />
    </IconBase>
  );
}