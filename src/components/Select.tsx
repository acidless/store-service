import {useEffect, useRef, useState} from "react";

type Props = {
    onOptionChange: (key: string) => void;
    defaultOption?: number;
    options: { key: string, text: string }[];
    align?: "left" | "right";
}

const Select = function ({options, onOptionChange, defaultOption = 0, align = "right"}: Props) {
    const [currentOption, setCurrentOption] = useState(defaultOption >= 0 ? defaultOption : 0);
    const [isActive, setActive] = useState(false);
    const currentElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("click", onDocumentClick);

        return () => {
            document.removeEventListener('click', onDocumentClick);
        }
    }, []);

    useEffect(() => {
        if(defaultOption >= 0) {
            selectOption(defaultOption);
        }
    }, [defaultOption]);

    function onDocumentClick(e: Event) {
        if (currentElem.current && !currentElem.current.contains(e.target as Node)) {
            setActive(false);
        }
    }

    function toggle() {
        setActive(prev => !prev);
    }

    function selectOption(idx: number) {
        if(options.length) {
            setCurrentOption(idx);
            setActive(false);
            onOptionChange(options[idx].key);
        }
    }

    if (!options.length) {
        return <div>Empty options</div>;
    }

    return <div ref={currentElem} className="relative">
        <div onClick={toggle} className={`${isActive ? 'border-blue-600' :
            'border-gray-400'} py-1 px-2 border-1 rounded-md cursor-pointer flex items-center justify-between`}>
            <p className="mr-4">{options[currentOption].text}</p>
            <img className={`transition-all duration-300${isActive ? ' rotate-180' : ''}`} src="/chevron-down.svg"
                 alt=""/>
        </div>
        <div className={`${isActive ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
             transition-opacity absolute top-[calc(100%_+_0.5rem)] ${align === 'right' ? 'right-0' :
            'left-0'} z-10 duration-300 border-gray-400 border-1 rounded-md w-max flex flex-col items-start bg-neutral-50`}>
            {options.map((param, idx) => {
                return <button key={param.key} onClick={() => selectOption(idx)}
                               className={`${currentOption === idx ? 'text-blue-600 ' :
                                   ''}cursor-pointer py-2 px-4 border-b-1 last:border-0 hover:text-blue-600 transition-colors duration-300 border-gray-400 w-full text-left`}>
                    {param.text}
                </button>
            })}
        </div>
    </div>
}

export default Select;