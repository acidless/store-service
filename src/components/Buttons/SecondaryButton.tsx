import type {ReactNode} from "react";

type Props = {
    className?: string;
    onClick?: () => void;
    children: ReactNode;
}

const SecondaryButton = function ({className, onClick, children}: Props) {
    return <button
        type="button"
        className={`border-1 border-neutral-600 hover:border-blue-600 transition-colors duration-300 text-neutral-600 hover:text-blue-600 py-2 px-4 rounded-md cursor-pointer font-semibold text-md ${className ?? ''}`}
        onClick={onClick}>{children}</button>
}

export default SecondaryButton;