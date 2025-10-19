import type {ReactNode} from "react";

type Props = {
    className?: string;
    onClick?: () => void;
    [key: string]: any;
    children: ReactNode;
}

const AccentButton = function ({className, onClick, children, ...rest}: Props) {
    return <button
        className={`bg-blue-600 hover:bg-blue-800 transition-colors duration-300 text-white py-2 px-4 rounded-md cursor-pointer font-semibold text-md ${className ?? ''}`}
        onClick={onClick} {...rest}>{children}</button>
}

export default AccentButton;