import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    defaultCommandTimeout: 15_000,
    testIsolation: true,

    experimentalMemoryManagement: true,
    experimentalModifyObstructiveThirdPartyCode: false, // Breaks assets-pipeline because rewrites non-origin HTML
    experimentalSourceRewriting: false, // Uses AST instead of regex, but immediately triggers OOM in practice
    experimentalRunAllSpecs: true, // For option to run all in UI
    baseUrl: "https://deploy-preview-8704--fluxapp.netlify.app",
    retries: {
        runMode: 2,
    },
    numTestsKeptInMemory: 1,
    pageLoadTimeout: 120000,
    userAgent: "FluxCypressBot",
  }
});
