import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./logo";
import { NavLink } from "react-router-dom";

const user = {
    name: "Dan Crowe",
};

const Navbar = ({ navigation, className }) => (
    <nav className={classNames("bg-brand-600", className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between space-x-2">
                {/* begin logo / navigation */}
                <div className="flex flex-1 items-center justify-between space-x-10 sm:justify-start">
                    <Logo className="flex-shrink-0" color="white" />
                    <div className="flex items-center space-x-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({ isActive }) =>
                                    classNames("rounded-md px-3 py-2 text-sm font-medium", {
                                        "bg-brand-700 text-white": isActive,
                                        "text-white hover:bg-brand-500 hover:bg-opacity-75": !isActive,
                                    })
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
                {/* end logo / navigation */}

                {/* begin user */}
                <div className="hidden flex-col items-end justify-center text-right sm:flex">
                    <span className="space-x-1 text-sm font-medium">
                        <span className="text-brand-200">Admin</span>
                        <span className="text-xs text-brand-200">/</span>
                        <span className="text-white">{user.name}</span>
                    </span>
                </div>
                {/* end user */}
            </div>
        </div>
    </nav>
);

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
