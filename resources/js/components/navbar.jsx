import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Logo from "./logo";
import Spinner from "./spinner";

const Navbar = ({ navigation, className, ...rest }) => {
    const { user, userIsLoading } = useAuth();

    const userRole = useMemo(() => {
        return !user ? "Not logged in" : user.isAdmin ? "Admin" : "User";
    }, [user]);

    return (
        <nav {...rest} className={classNames("bg-brand-600", className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between space-x-2">
                    {/* begin logo / navigation */}
                    <div className="flex flex-1 items-center justify-between space-x-4 sm:justify-start sm:space-x-10">
                        <Link
                            to="/admin"
                            className="rounded-sm outline-none outline-2 outline-offset-[6px] focus:outline-white"
                        >
                            <Logo color="white" />
                        </Link>
                        <div className="flex items-center space-x-2">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        classNames(
                                            "rounded-md px-3 py-2 text-sm font-medium outline-none outline-2 outline-offset-0 focus:outline-white",
                                            {
                                                "bg-brand-700 text-white": isActive,
                                                "text-white hover:bg-brand-500 hover:bg-opacity-75":
                                                    !isActive,
                                            }
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    {/* end logo / navigation */}

                    {/* begin user */}
                    <div className="hidden flex-row items-center justify-end space-x-1 text-right text-sm font-medium sm:flex">
                        <span className="text-brand-200">
                            {userIsLoading ? <Spinner className="h-5 w-5" /> : userRole}
                        </span>
                        {user?.displayName && (
                            <>
                                <span className="text-xs text-brand-200">/</span>
                                <span className="text-white">
                                    {user?.person?.forename} {user?.person?.surname}
                                </span>
                            </>
                        )}
                    </div>
                    {/* end user */}
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
};

export default Navbar;
