import {useEffect, useRef, useState} from "react";

const sortingParams = [
    {key: "default", text: "Default sort"},
    {key: "price-asc", text: "Price: Low to High"},
    {key: "price-desc", text: "Price: High to Low"},
    {key: "rating", text: "Rating"},
];

type Props = {
    onSortChange: (sort: string) => void;
}


const Sort = function ({onSortChange}: Props) {
    const [currentSort, setCurrentSort] = useState(0);
    const [isActive, setActive] = useState(false);
    const sortElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("click", onDocumentClick);

        return () => {
            document.removeEventListener('click', onDocumentClick);
        }
    }, []);

    function onDocumentClick(e: Event) {
        if(sortElem.current && !sortElem.current.contains(e.target as Node)) {
            setActive(false);
        }
    }

    function toggle() {
        setActive(prev => !prev);
    }

    function selectSort(idx: number) {
        setCurrentSort(idx);
        setActive(false);
        onSortChange(sortingParams[idx].key);
    }

    return <div ref={sortElem} className="relative">
        <div onClick={toggle} className={`${isActive ? 'border-blue-600' :
            'border-gray-400'} py-1 px-2 border-1 rounded-md cursor-pointer flex items-center justify-between`}>
            <p className="mr-4">{sortingParams[currentSort].text}</p>
            <img className={`transition-all duration-300${isActive ? ' rotate-180' : ''}`} src="/chevron-down.svg"
                 alt=""/>
        </div>
        <div className={`${isActive ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
             transition-opacity absolute top-[calc(100%_+_0.5rem)] right-0 z-10 duration-300 border-gray-400 border-1 rounded-md w-max flex flex-col items-start bg-neutral-50`}>
            {sortingParams.map((param, idx) => {
                return <button key={param.key} onClick={() => selectSort(idx)}
                               className={`${currentSort === idx ? 'text-blue-600 ' : ''}cursor-pointer py-2 px-4 border-b-1 last:border-0 hover:text-blue-600 transition-colors duration-300 border-gray-400 w-full text-left`}>
                    {param.text}
                </button>
            })}
        </div>
    </div>
}

export default Sort;