import cls from './Badge.module.css';
import { ReactNode } from 'react';

type BadgeProps = {
    children: ReactNode;
    variant?: string;
};

export function Badge({ variant, children }: BadgeProps) {
    switch (variant) {
        case 'primary':
            return <div className={`${cls.badge} ${cls.primary}`}>{children}</div>;
        case 'success':
            return <div className={`${cls.badge} ${cls.success}`}>{children}</div>;
        case 'warning':
            return <div className={`${cls.badge} ${cls.warning}`}>{children}</div>;
        case 'alert':
            return <div className={`${cls.badge} ${cls.alert}`}>{children}</div>;
        default:
            return <div className={cls.badge}>{children}</div>;
    }
}
