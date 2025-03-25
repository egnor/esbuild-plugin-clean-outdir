# esbuild-plugin-clean-outdir

This is a plugin for [esbuild](esbuild.github.io) to erase the output directory before building starts (and add a catch-all `.gitignore` file).

## Why?

Otherwise, artifacts of previous build runs can clutter things up and even get pushed to production.

Of course you could do this yourself with something like `rmSync( "my_outdir", { recursive: true, force: true })`, but this plugin has minor advantages:
- it removes contents but leaves the directory itself, to avoid stranding shells or other processes
- it adds a `.gitignore` so nothing in the directory is checked in (if you're using git)

That said, there's nothing magical here.

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
