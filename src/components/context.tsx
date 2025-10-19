import {createContext} from "react";

type ErrorContextType = {
    error: string;
    setError: (error: string) => void;
}

const ErrorContext = createContext<ErrorContextType>({
    error: "",
    setError: () => {}
});

export default ErrorContext;