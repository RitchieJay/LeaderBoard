import { useRouteError } from "react-router-dom";
import Heading from "../components/heading";
import P from "../components/paragraph";
import Button from "../components/button";

const ErrorPage = () => {
    const error = useRouteError();

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
                            <P color="muted">Please check the URL in the address bar and try again.</P>
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
