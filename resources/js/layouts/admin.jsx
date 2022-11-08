import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import Logo from "../components/logo";
import Heading from "../components/heading";

const user = {
    name: "Dan Crowe",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Leaderboards", href: "/admin/leaderboards", current: true },
    { name: "Users", href: "/admin/users", current: false },
];
const userNavigation = [{ name: "Sign out", href: "#" }];

const AdminLayout = () => (
    <>
        {/* begin navbar */}
        <nav className="bg-brand-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between sm:justify-start">
                        <div className="flex-shrink-0">
                            <Logo color="white" />
                        </div>
                        <div>
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-brand-700 text-white"
                                                : "text-white hover:bg-brand-500 hover:bg-opacity-75",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                        aria-current={item.current ? "page" : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-brand-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        {/* end navbar */}

        {/* begin page header */}
        <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl p-4 sm:px-6 sm:py-5 lg:px-8">
                <Heading as="h1" level={2}>
                    Leaderboards
                </Heading>
            </div>
        </header>
        {/* end page header */}

        {/* begin page content */}
        <main>
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
                <Outlet />
            </div>
        </main>
        {/* end page content */}
    </>
);

AdminLayout.propTypes = {};

export default AdminLayout;
