# cypress-crashing-demo-test
This repo is to help reproduce the Chrome renderer crash issue encountered in our Cypress tests. The spec used here will attempt to run 100 times in order to replicate the crash.

To setup, use:
`npm i`

To run the test, use:
`npm run run`

To keep the logs from the test, use:
`npm run run:saveLogs`

The expected outcome is the following after a few test attempts:
```
We detected that the Chromium Renderer process just crashed.

This can happen for a number of different reasons.

If you're running lots of tests on a memory intense application.
  - Try increasing the CPU/memory on the machine you're running on.
  - Try enabling experimentalMemoryManagement in your config file.
  - Try lowering numTestsKeptInMemory in your config file during 'cypress open'.

You can learn more here:

https://on.cypress.io/renderer-process-crashed
```
