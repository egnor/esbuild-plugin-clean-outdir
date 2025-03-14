import fs from "node:fs";

export default function esbuildCleanOutdir() {
  const name = "clean-outdir";
  return {
    name, setup(build) {
      const plugin = `esbuild-plugin-${name}`;
      const { outdir } = build.initialOptions;
      if (!outdir) throw new Error(`${plugin} requires 'outdir'`);

      // Remove contents but not the directory to minimize stranding
      fs.mkdirSync(outdir, { recursive: true });
      for (const f of fs.readdirSync(outdir)) {
        fs.rmSync(`${outdir}/${f}`, { recursive: true, force: true });
      }

      fs.writeFileSync(`${outdir}/.gitignore`, `# written by ${plugin}\n*\n`);
    }
  };
};
