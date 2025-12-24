/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cartoon: ['"Luckiest Guy"', 'cursive'],
                chewy: ['"Chewy"', 'cursive'],
                comic: ['"Comic Neue"', 'cursive'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                cartoon: {
                    yellow: '#FFDE59', // Bright Cartoon Yellow
                    black: '#1A1A1A', // Soft Black for outlines
                    white: '#FFFFFF',
                    bg: '#FFFDF5', // Slight off-white mostly white
                },
                gold: { // Keeping gold variable for code compatibility but remapping to cartoon yellow
                    DEFAULT: '#FFDE59',
                    light: '#FFF0A4',
                    dark: '#E6C200',
                    dim: '#BFA100',
                },
            },
        },
    },
    plugins: [],
}
