import fs from "fs";
import path from "path";

const targetFile = path.resolve("node_modules", "@lovable.dev", "vite-tanstack-config", "dist", "index.js");

try {
  let content = fs.readFileSync(targetFile, "utf8");
  const search = `    const tsConfigPaths = (await import("vite-tsconfig-paths")).default;\n    internalPlugins.push(tsConfigPaths({ projects: ["./tsconfig.json"] }));\n`;
  if (content.includes(search)) {
    content = content.replace(search, "");
    fs.writeFileSync(targetFile, content, "utf8");
    console.log(`Patched ${targetFile} to remove vite-tsconfig-paths injection.`);
  } else {
    console.log(`No patch needed; ${targetFile} already contains the expected changes.`);
  }
} catch (error) {
  console.error(`Failed to patch ${targetFile}:`, error);
  process.exit(1);
}
