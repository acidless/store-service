import {useEffect, useState} from "react";

type Props = {
    error: string | undefined;
}

const ErrorPopup = function ({error}: Props) {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (!error) {
            return;
        }

        setActive(true);
        const timeout = setTimeout(() => setActive(false), 3000);

        return function () {
            clearTimeout(timeout);
        }
    }, [error]);

    return <div
        className={`fixed bottom-8 right-8 min-w-[200px] z-50 py-2 px-4 bg-red-200 border-red-300 border-2 rounded-sm duration-300 transition-transform ${isActive ?
            'translate-x-o' : 'translate-x-[150%]'}`}>
        <p className="text-black text-lg">{error}</p>
    </div>
}

export default ErrorPopup;