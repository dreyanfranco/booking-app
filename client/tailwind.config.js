/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
        container: {
            padding: {
                sm: "2rem",
                md: "2rem",
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
}
