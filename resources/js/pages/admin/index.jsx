import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../layouts/admin";

const AdminIndexPage = () => {
    const navigate = useNavigate();

    // Redirect to the first valid page
    useEffect(() => {
        navigate(navigation[0].to);
    }, [navigate]);

    return null;
};

AdminIndexPage.propTypes = {};

export default AdminIndexPage;
