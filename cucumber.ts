export default {
  // Use forward slashes for cross-platform compatibility
  paths: [
    "C:/Users/abhi2/Automation_Projects/pw-practice-tests/features/navigation.feature",
  ],

  // In ESM mode ("type": "module"), Cucumber looks for 'import' instead of 'require'
  import: [
    "C:/Users/abhi2/Automation_Projects/pw-practice-tests/features/step_definitions/steps.ts",
  ],

  // This tells Node.js how to compile TS on the fly
  loader: ["ts-node/esm"],

  formatOptions: {
    snippetInterface: "async-await",
  },

  // Optional: adds colors to your terminal output
  format: ["progress-bar", "summary"],
};
