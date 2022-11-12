import { InteractionType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useLogin } from "../contexts/auth";
import Button from "./button";
import Heading from "./heading";

const LoginCta = () => {
    const { inProgress } = useMsal();
    const handleLogin = useLogin();

    const isAuthenticating = inProgress !== InteractionType.None;

    return (
        <div className="h-full w-full rounded-xl border bg-white p-8 text-center sm:p-10">
            <Heading className="mb-2" level={2}>
                You're not logged in right now.
            </Heading>
            <p className="mb-6 text-gray-500">Login via the button below to access admin features.</p>

            <Button as="button" type="button" color="brand" disabled={isAuthenticating} onClick={() => handleLogin()}>
                {isAuthenticating ? "Logging You In..." : "Login with Microsoft"}
            </Button>
        </div>
    );
};

LoginCta.propTypes = {};

export default LoginCta;
