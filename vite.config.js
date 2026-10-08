import { copyFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const birthdayTrackFile = resolve(projectRoot, "public/audio/birthday-song.mp3");

function birthdayTrackReady() {
  try {
    return existsSync(birthdayTrackFile) && statSync(birthdayTrackFile).size > 0;
  } catch {
    return false;
  }
}

function birthdayTrackPlugin() {
  const virtualId = "virtual:birthday-track";
  const resolvedId = "\0virtual:birthday-track";

  return {
    name: "birthday-track",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return null;
      return `export const birthdayTrackReady = ${birthdayTrackReady()};\n`;
    },
    configureServer(server) {
      const dir = resolve(projectRoot, "public/audio");
      server.watcher.add(dir);
      const reload = (file) => {
        const path = String(file).replaceAll("\\", "/");
        if (!path.endsWith("/audio/birthday-song.mp3")) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", reload);
      server.watcher.on("change", reload);
      server.watcher.on("unlink", reload);
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Nidzz22/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    birthdayTrackPlugin(),
    {
      name: "github-pages-spa",
      apply: "build",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
}));
