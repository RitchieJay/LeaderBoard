import { useLoaderData } from "react-router-dom";

const HomePage = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <h1 className="text-4xl font-bold mb-2">Home</h1>
        </div>
    );
};

export const loader = async () => {
    return {};
};

export default HomePage;
