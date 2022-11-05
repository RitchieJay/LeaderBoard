import { useLoaderData } from "react-router-dom";

const HomePage = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-2 text-4xl font-bold">Home</h1>
        </div>
    );
};

export const loader = async () => {
    return {};
};

export default HomePage;
