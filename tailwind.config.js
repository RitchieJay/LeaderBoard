const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/views/index.blade.php", "./resources/js/**/*.{js,ts,jsx,tsx,json}"],
    theme: {
        extend: {
            colors: {
                brand: colors.indigo,
            },
            fontFamily: {
                sans: ["Poppins", defaultTheme.fontFamily.sans],
            },
            animation: {
                "spin-slow": "spin 2.5s linear infinite;",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
