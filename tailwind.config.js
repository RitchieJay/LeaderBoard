const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/views/index.blade.php", "./resources/js/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: colors.indigo,
            },
            fontFamily: {
                sans: ["Poppins", defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
