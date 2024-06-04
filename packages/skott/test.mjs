import mainskott from "./dist/index.js";

import { Web } from "./dist/src/rendering/api.js";

const s = await mainskott();

const { findCircularDependencies } = s.useGraph()

Web.renderStandaloneWebApplication({
    application: { 
        data: {
            cycles: findCircularDependencies,
            meta: () => {
                return {
                    "granularity": "module"
                }
            },
            structure: s.getStructure
        },
        open: true,
        port: 1111,
        onListen: (port) => {
            console.log('webapp listening on', port)
        },
        onOpen: (url) => {
            console.log('webapp opened on', url)
        }
    }
})
