const modules = import.meta.glob(
  "../assets/photos/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}",
  { eager: true, import: "default" },
);

function fileBase(path) {
  const file = path.split(/[/\\]/).pop() || "";
  return file.replace(/\.[^.]+$/, "").toLowerCase();
}

function asUrl(mod) {
  if (typeof mod === "string") return mod;
  if (mod && typeof mod.default === "string") return mod.default;
  return null;
}

const entries = Object.entries(modules).map(([path, mod]) => [fileBase(path), asUrl(mod)]);

export function resolvePhoto(slot) {
  const number = String(slot).split("_")[1];
  const aliases = new Set(
    [
      String(slot).toLowerCase(),
      String(slot).toLowerCase().replaceAll("_", "-"),
      number ? `photo-${number}` : null,
      number ? `photo_${number}` : null,
    ].filter(Boolean),
  );

  const found = entries.find(([base]) => aliases.has(base));
  return found ? found[1] : null;
}

export function resolveNamed(names) {
  const wanted = new Set(names.map((name) => name.toLowerCase()));
  const found = entries.find(([base]) => wanted.has(base));
  return found ? found[1] : null;
}

export function photoSrc(photo) {
  if (photo.src) return photo.src;
  return resolvePhoto(photo.id);
}
