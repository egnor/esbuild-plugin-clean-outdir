# esbuild-plugin-clean-outdir

This is a plugin for [esbuild](esbuild.github.io) to erase the output directory before building starts (and add a catch-all `.gitignore` file).

## Why?

Otherwise, artifacts of previous build runs can clutter things up and even get pushed to production. You could manage this yourself with `rmSync( "my_outdir", { recursive: true, force: true })`, but this plugin has minor advantages
- it removes contents but leaves the bare directory, to avoid stranding shells and such.
- it adds a `.gitignore` so nothing in the directory is checked in (if you're using git)
- it runs at plugin creation time, not `onStart` time, to avoid clobbering any `onStart` output

That said, there's nothing magical here, and you might prefer one of these alternatives
- [@akrc/esbuild-plugin-clean](https://github.com/AkaraChen/esbuild-plugin-clean#readme)
- [esbuild-clean-plugin](https://github.com/jwilsson/esbuild-clean-plugin#readme)
- [esbuild-plugin-clean](https://github.com/LinbuduLab/esbuild-plugins/tree/main/packages/esbuild-plugin-clean#readme)
- [esbuild-plugin-clear](https://github.com/DasRed/esbuild-plugin-clear#readme)
- [esbuild-plugin-output-reset](https://github.com/yamitsushi/esbuild-plugin-output-reset#readme)

## Usage

Install the plugin:
```
npm i esbuild-plugin-clean-outdir
```

When you invoke `esbuild.build(...)` in your build script, pass the plugin:
```
import * as esbuild from "esbuild";
import esbuildCleanOutdir from "esbuild-plugin-clean-outdir";
...
await esbuild.build({
  bundle: true,
  outdir: "...",
  ... other esbuild options ...
  plugins: [
    esbuildCleanOutdir(),
    ...
  ],
});
```

This plugin only makes sense if you have `outdir` in the esbuild options; it will throw an error otherwise. Also, the output directory will only be cleaned at the start during plugin setup, not for incremental rebuilds.
