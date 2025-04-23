import * as React from 'react';

export interface ButtonProps {
    isActive?: boolean;
    isDisabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}
