import {type MouseEvent, type ReactNode, useRef} from "react";

type Props = {
    isOpened: boolean;
    setOpened: (val: boolean) => void;
    children: ReactNode;
}

const ModalWindow = function ({isOpened, setOpened, children}: Props) {
    const modalBlockRef = useRef<HTMLDivElement>(null);

    function onModalClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();

        if(modalBlockRef.current && e.target !== modalBlockRef.current) {
            setOpened(false);
        }
    }


    return <div onClick={onModalClick} className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 transition-opacity duration-300 ${isOpened ?
        'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div ref={modalBlockRef} className={`bg-white p-4 rounded-md min-w-[300px] transition-transform duration-300 ${isOpened ? '-translate-y-0' : '-translate-y-1/3'}`}>
            {children}
        </div>
    </div>
}

export default ModalWindow;