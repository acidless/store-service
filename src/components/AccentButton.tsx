import type {ReactNode} from "react";

type Props = {
    className?: string;
    onClick: () => void;
    children: ReactNode;
}

const AccentButton = function ({className, onClick, children}: Props) {
    return <button className={`bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-2 px-4 rounded-md cursor-pointer font-semibold text-md ${className ?? ''}`} onClick={onClick}>{children}</button>
}

export default AccentButton;