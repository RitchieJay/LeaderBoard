import classNames from "classnames";

const theme = {
    name: "Indigo",
    badgeColor: "indigo",
    theme: {
        rankPrefix: "#",
        backgroundClasses: "bg-gradient-to-t from-indigo-700 to-purple-600",
        logoColor: "white",
        pageTitleColor: "white",
        scoreCardContainerClasses: "bg-white bg-opacity-25",
        scoreCardDividerClasses: "text-white opacity-80",
        scoreCardClasses: (rank, scoreIdx, scoresCount) => ({
            containerClasses: classNames("mx-auto w-full p-4", {
                "py-6 bg-gradient-to-r from-white via-white to-yellow-100": rank === 1,
                "bg-gradient-to-r from-white via-white to-gray-200": rank === 2,
                "bg-gradient-to-r from-white via-white to-orange-100": rank === 3,
                "bg-white": rank >= 4,

                "mb-3": scoreIdx < scoresCount - 1,
            }),
            rankClasses: classNames("text-base rounded-md font-bold", {
                "py-2 px-2.5 bg-yellow-400 text-yellow-900": rank === 1,
                "py-2 px-2.5 bg-gray-300 text-gray-900": rank === 2,
                "py-2 px-2.5 bg-orange-400 text-orange-900": rank === 3,
                "p-0": rank >= 4,
            }),
            displayNameClasses: classNames({
                "text-lg text-yellow-700 font-bold": rank === 1,
                "text-base text-gray-700 font-bold": rank === 2,
                "text-base text-orange-700 font-bold": rank === 3,
                "text-base text-gray-700": rank >= 4,
            }),
            scoreClasses: classNames("font-bold", {
                "pr-2 text-lg text-yellow-700": rank === 1,
                "pr-2 text-base text-gray-700": rank === 2,
                "pr-2 text-base text-orange-700": rank === 3,
                "text-base text-indigo-700": rank >= 4,
            }),
            trophyClasses: "w-5 h-5 -mt-0.5 text-yellow-700 rotate-12",
        }),
    },
};

export default theme;
