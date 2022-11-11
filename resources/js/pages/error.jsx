import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import Heading from "../components/heading";
import { usePage } from "../contexts/page";

const ErrorPage = () => {
    const { setPageTitle } = usePage();
    const error = useRouteError();

    useEffect(() => {
        setPageTitle("Error");
    }, [setPageTitle]);

    return (
        <div className="min-h-full px-4 py-16 sm:grid sm:place-items-center sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-max">
                <main className="sm:flex">
                    <Heading as="p" level={1} color="brand">
                        {error.status || "Oops"}
                    </Heading>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-300 sm:pl-6">
                            <Heading level={1} className="mb-2">
                                {error.statusText || "Unknown Error"}
                            </Heading>
                            <p className="text-gray-500">Please check the URL in the address bar and try again.</p>
                        </div>
                        {/*
						TODO - Can we send people anywhere from here? Admins to /admin maybe?
                        <div className="mt-10 sm:border-l sm:border-transparent sm:pl-6">
                            <Button color="brand" to="/">
                                Back to safety
                            </Button>
                        </div>
						*/}
                    </div>
                </main>
            </div>
        </div>
    );
};

ErrorPage.propTypes = {};

export default ErrorPage;
