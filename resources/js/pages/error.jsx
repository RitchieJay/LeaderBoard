import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <h1 className="text-4xl font-bold mb-2">Error {error.status}</h1>
            <p className="text-xl">{error.statusText}</p>
        </div>
    );
};

export default ErrorPage;
