import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-2 text-4xl font-bold">Error {error.status}</h1>
            <p className="text-xl">{error.statusText}</p>
        </div>
    );
};

export default ErrorPage;
