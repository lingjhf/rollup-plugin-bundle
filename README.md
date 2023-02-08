# rollup-plugin-bundle

This is a plugin that lets you roll-up your `.d.ts` definition files.

## Usage

Install the package from `npm`:

Add it to your `rollup.config.js`:

```js
import { defineConfig } from 'rollup'
import { bundle } from "rollup-plugin-bundle";

export default defineConfig([
  {
    plugins: [bundle()],
    input: './src/index.ts',
    output: {
      dir: './dist',
      format: 'es',
    },
  },
])

```
