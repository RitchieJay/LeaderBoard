const themes = {
    indigo: {
        name: "Indigo",
        badgeColor: "indigo",
        theme: {
            test: "value",
        },
    },
};

export const getTheme = (reference) => {
    return themes[reference] ?? themes.indigo;
};

export default themes;
