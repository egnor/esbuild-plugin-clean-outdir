# esbuild-plugin-clean-outdir

This is a plugin for [esbuild](esbuild.github.io) to erase the output directory
before building starts (and add a catch-all `.gitignore` file).

## Why?

Otherwise, esbuild does not erase the output directory, so artifacts of
previous builds can clutter things up and even get pushed to production.

Of course you could do this yourself with something like
`rmSync( "my_outdir", { recursive: true, force: true })`, but this module
has a couple advantages
- this plugin removes the contents but leaves the directory itself, which is
nice to avoid stranding shells or other processes
- this plugin adds a `.gitignore` ensuring that nothing in the directory is
checked in (if you're using git)

That said, there's nothing magical here.

## Usage

Install the plugin:
```
npm i esbuild-plugin-clean-output
```

When you invoke `esbuild.build(...)` in your build script, pass the plugin:
```
import * as esbuild from "esbuild";
import esbuildCleanOutput from "esbuild-plugin-clean-output";
...
await esbuild.build({
  bundle: true,
  outdir: "...",
  ... other esbuild options ...
  plugins: [
    esbuildCleanOutput(),
    ...
  ],
});
```

This plugin only makes sense if you have `outdir` in the esbuild options;
it will throw an error otherwise. Also, the output directory will only be
cleaned at the start during plugin setup, not for incremental rebuilds.
