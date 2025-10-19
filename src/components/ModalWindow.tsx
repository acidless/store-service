import {type MouseEvent, type ReactNode, useRef, useState} from "react";

type Props = {
    isOpened: boolean;
    setOpened: (val: boolean) => void;
    children: ReactNode;
}

const ModalWindow = function ({isOpened, setOpened, children}: Props) {
    const modalBlockRef = useRef<HTMLDivElement>(null);
    const [mouseDownInside, setMouseDownInside] = useState(false);

    function onMouseDown(e: MouseEvent<HTMLDivElement>) {
        if (modalBlockRef.current && modalBlockRef.current.contains(e.target as Node)) {
            setMouseDownInside(true);
        } else {
            setMouseDownInside(false);
        }
    }

    function onMouseUp(e: MouseEvent<HTMLDivElement>) {
        if (!mouseDownInside && e.target === e.currentTarget) {
            setOpened(false);
        }
    }

    return <div onMouseDown={onMouseDown} onMouseUp={onMouseUp}
                className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 transition-opacity duration-300 ${isOpened ?
                    'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div ref={modalBlockRef}
             className={`bg-white p-4 md:p-6 rounded-xl min-w-[300px] md:min-w-[500px] transition-transform duration-300 ${isOpened ?
                 '-translate-y-0' : '-translate-y-1/3'}`}>
            {children}
        </div>
    </div>
}

export default ModalWindow;