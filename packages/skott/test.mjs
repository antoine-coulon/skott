import skott, { defaultConfig } from "./dist/index.js"

import { Terminal, Web } from "./dist/src/rendering/api.js"



Terminal.renderTerminalApplication(defaultConfig, { displayMode: "webapp", watch: true })

// Web.renderWebApplication(defaultConfig, {
//     open: true,
//     watch: true,
//     port: 1111,
//     visualization: {
//         granularity: "module"
//     },
//     onListen: () => {
//         console.log("Listening")
//     },
//     onOpen: () => {
//         console.log("Open")
//     }
// })

