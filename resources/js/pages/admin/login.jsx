import Heading from "../../components/heading";
import Button from "../../components/button";
import Logo from "../../components/logo";

const AdminLoginPage = () => (
    <div className="h-full w-full bg-brand-700">
        <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center space-y-8 p-4 text-center">
            <div className="flex flex-row items-center justify-center space-x-5">
                <Logo color="white" size="lg" />
                <Heading level={1} color="white">
                    Leaderboard
                </Heading>
            </div>
            <Button color="white" size="lg" to="/admin">
                Login with Microsoft
            </Button>
        </div>
    </div>
);

AdminLoginPage.propTypes = {};

export default AdminLoginPage;
