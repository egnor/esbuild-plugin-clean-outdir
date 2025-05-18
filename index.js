import fs from "node:fs";

export default function esbuildCleanOutdir() {
  const name = "clean-outdir";
  return {
    name, setup(build) {
      const { outdir } = build.initialOptions;
      if (!outdir) return;

      // Remove contents but not the directory to minimize stranding
      fs.mkdirSync(outdir, { recursive: true });
      for (const f of fs.readdirSync(outdir)) {
        if (f !== ".gitignore") {
          fs.rmSync(`${outdir}/${f}`, { recursive: true, force: true });
        }
      }

      const plugin = `esbuild-plugin-${name}`;
      fs.writeFileSync(`${outdir}/.gitignore.tmp`, `# by ${plugin}\n*\n`);
      fs.renameSync(`${outdir}/.gitignore.tmp`, `${outdir}/.gitignore`);
    }
  };
};
