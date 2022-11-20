import indigo from "./indigo";

const themes = {
    indigo,
};

export const getTheme = (reference) => {
    return themes[reference] ?? themes.indigo;
};

export default themes;
