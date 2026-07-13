import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/uninus-rain-card.js",
  output: {
    file: "uninus-rain-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [nodeResolve()],
};
