import react from "@vitejs/plugin-react";
import fs from "fs";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const host = "rankup.local";
const certPath = "./certificates/development.pfx";
const certPassphrase = "local-development";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: "./resources/static/**/*",
                    dest: "../",
                },
            ],
        }),
    ],
    server: {
        host,
        hmr: { host },
        https: {
            pfx: fs.readFileSync(certPath),
            passphrase: certPassphrase,
        },
    },
});
