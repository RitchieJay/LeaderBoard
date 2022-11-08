import { useEffect } from "react";
import { useNavigationContext } from "../../contexts/navigation";

const AdminUsersPage = () => {
    const { setPageTitle } = useNavigationContext();

    useEffect(() => {
        setPageTitle("Users");
    }, [setPageTitle]);
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
