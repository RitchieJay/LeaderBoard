import Heading from "./heading";
import Button from "./button";
import { login } from "../contexts/auth";
import { useMsal } from "@azure/msal-react";

const LoginCta = () => {
    const { instance: msalInstance } = useMsal();

    return (
        <div className="h-full w-full rounded-xl border bg-white p-8 text-center sm:p-10">
            <Heading className="mb-2" level={2}>
                You're not logged in right now.
            </Heading>
            <p className="mb-6 text-gray-500">Login via the button below to access admin features.</p>
            <Button as="button" type="button" color="brand" onClick={() => login(msalInstance)}>
                Login with Microsoft
            </Button>
        </div>
    );
};

LoginCta.propTypes = {};

export default LoginCta;
