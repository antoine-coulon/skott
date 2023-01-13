import { SkottStructureWithCycles } from "./skott";

export const graphData = {
  "prisma/logistic/client/runtime/index.js": {
    id: "prisma/logistic/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: ["node:fs", "node:path", "node:util"],
    },
  },
  "prisma/logistic/client/runtime/edge.js": {
    id: "prisma/logistic/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: ["stream"],
    },
  },
  "prisma/logistic/client/runtime/index-browser.js": {
    id: "prisma/logistic/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/logistic/client/index.js": {
    id: "prisma/logistic/client/index.js",
    adjacentTo: ["prisma/logistic/client/runtime/index.js"],
    body: {
      size: 52839,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/logistic/client/index-browser.js": {
    id: "prisma/logistic/client/index-browser.js",
    adjacentTo: ["prisma/logistic/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/runtime/index.js": {
    id: "prisma/bulk/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/runtime/edge.js": {
    id: "prisma/bulk/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/runtime/index-browser.js": {
    id: "prisma/bulk/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/index.js": {
    id: "prisma/bulk/client/index.js",
    adjacentTo: ["prisma/bulk/client/runtime/index.js"],
    body: {
      size: 52819,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/index-browser.js": {
    id: "prisma/bulk/client/index-browser.js",
    adjacentTo: ["prisma/bulk/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/runtime/index.js": {
    id: "prisma/store_insights/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/runtime/edge.js": {
    id: "prisma/store_insights/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/runtime/index-browser.js": {
    id: "prisma/store_insights/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/index.js": {
    id: "prisma/store_insights/client/index.js",
    adjacentTo: ["prisma/store_insights/client/runtime/index.js"],
    body: {
      size: 52869,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/index-browser.js": {
    id: "prisma/store_insights/client/index-browser.js",
    adjacentTo: ["prisma/store_insights/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  ".prettierrc.js": {
    id: ".prettierrc.js",
    adjacentTo: [],
    body: {
      size: 43,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  ".eslintrc.js": {
    id: ".eslintrc.js",
    adjacentTo: [],
    body: {
      size: 1800,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "knex/migrations/20220912134231_stocks.ts": {
    id: "knex/migrations/20220912134231_stocks.ts",
    adjacentTo: [],
    body: {
      size: 2136,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "knex/knexfile.ts": {
    id: "knex/knexfile.ts",
    adjacentTo: [],
    body: {
      size: 323,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/errors.ts": {
    id: "src/server/errors.ts",
    adjacentTo: [],
    body: {
      size: 191,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/settings.ts": {
    id: "src/server/settings.ts",
    adjacentTo: ["src/lib/fastify/index.ts", "src/server/errors.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/index.ts": {
    id: "src/lib/fastify/index.ts",
    adjacentTo: [
      "src/lib/fastify/listen.ts",
      "src/lib/fastify/match.ts",
      "src/lib/fastify/raw.ts",
      "src/lib/fastify/register.ts",
      "src/lib/fastify/inject.ts",
      "src/lib/fastify/basic_auth.ts",
    ],
    body: {
      size: 158,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/listen.ts": {
    id: "src/lib/fastify/listen.ts",
    adjacentTo: ["src/lib/fastify/errors.ts"],
    body: {
      size: 1396,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/errors.ts": {
    id: "src/lib/fastify/errors.ts",
    adjacentTo: [],
    body: {
      size: 207,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/match.ts": {
    id: "src/lib/fastify/match.ts",
    adjacentTo: ["src/lib/fastify/listen.ts", "src/lib/fastify/register.ts"],
    body: {
      size: 4490,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/register.ts": {
    id: "src/lib/fastify/register.ts",
    adjacentTo: ["src/lib/fastify/listen.ts"],
    body: {
      size: 3530,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/raw.ts": {
    id: "src/lib/fastify/raw.ts",
    adjacentTo: [],
    body: {
      size: 285,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/inject.ts": {
    id: "src/lib/fastify/inject.ts",
    adjacentTo: ["src/lib/fastify/listen.ts"],
    body: {
      size: 542,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/basic_auth.ts": {
    id: "src/lib/fastify/basic_auth.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/secrets.ts",
      "src/lib/fastify/match.ts",
    ],
    body: {
      size: 2447,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/secrets.ts": {
    id: "src/lib/secrets.ts",
    adjacentTo: ["src/lib/azure_keyvault.ts", "src/lib/env.ts"],
    body: {
      size: 2571,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/azure_keyvault.ts": {
    id: "src/lib/azure_keyvault.ts",
    adjacentTo: ["src/lib/azure_identity/index.ts", "src/lib/utils.ts"],
    body: {
      size: 2376,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/azure_identity/index.ts": {
    id: "src/lib/azure_identity/index.ts",
    adjacentTo: ["src/lib/env.ts", "src/lib/internal/logger/index.ts"],
    body: {
      size: 1947,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/env.ts": {
    id: "src/lib/env.ts",
    adjacentTo: [],
    body: {
      size: 1225,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/logger/index.ts": {
    id: "src/lib/internal/logger/index.ts",
    adjacentTo: ["src/lib/internal/logger/logger.ts"],
    body: {
      size: 26,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/logger/logger.ts": {
    id: "src/lib/internal/logger/logger.ts",
    adjacentTo: [
      "src/lib/env.ts",
      "src/lib/utils.ts",
      "src/lib/internal/alerting/scheduler.ts",
      "src/lib/internal/logger/transport.ts",
    ],
    body: {
      size: 3812,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/utils.ts": {
    id: "src/lib/utils.ts",
    adjacentTo: [],
    body: {
      size: 971,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/scheduler.ts": {
    id: "src/lib/internal/alerting/scheduler.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/internal/alerting/client/index.ts",
      "src/lib/internal/alerting/config.ts",
    ],
    body: {
      size: 1784,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/client/index.ts": {
    id: "src/lib/internal/alerting/client/index.ts",
    adjacentTo: ["src/lib/internal/alerting/client/send.ts"],
    body: {
      size: 24,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/client/send.ts": {
    id: "src/lib/internal/alerting/client/send.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/internal/alerting/config.ts",
      "src/lib/internal/alerting/client/format.ts",
    ],
    body: {
      size: 1659,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/config.ts": {
    id: "src/lib/internal/alerting/config.ts",
    adjacentTo: ["src/lib/env.ts"],
    body: {
      size: 1626,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/client/format.ts": {
    id: "src/lib/internal/alerting/client/format.ts",
    adjacentTo: ["src/lib/internal/logger/index.ts"],
    body: {
      size: 651,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/logger/transport.ts": {
    id: "src/lib/internal/logger/transport.ts",
    adjacentTo: [
      "src/lib/internal/alerting/scheduler.ts",
      "src/lib/internal/logger/logger.ts",
    ],
    body: {
      size: 1242,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/environment.ts": {
    id: "src/server/environment.ts",
    adjacentTo: [],
    body: {
      size: 1824,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/http_server.ts": {
    id: "src/server/http_server.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/lib/azure_identity/index.ts",
      "src/lib/fastify/index.ts",
      "src/lib/health_check.ts",
    ],
    body: {
      size: 2069,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts": {
    id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts",
    ],
    body: {
      size: 84,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      adjacentTo: [],
      body: {
        size: 1921,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts": {
    id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
    ],
    body: {
      size: 2509,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/health_check.ts": {
    id: "src/lib/health_check.ts",
    adjacentTo: [
      "src/scripts/create_application_metadata.ts",
      "src/lib/azure_b2c/index.ts",
      "src/lib/azure_resources.ts",
      "src/lib/azure_storage.ts",
      "src/lib/filesystem/index.ts",
    ],
    body: {
      size: 6591,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/scripts/create_application_metadata.ts": {
    id: "src/scripts/create_application_metadata.ts",
    adjacentTo: [],
    body: {
      size: 1943,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/azure_b2c/index.ts": {
    id: "src/lib/azure_b2c/index.ts",
    adjacentTo: ["src/lib/env.ts", "src/lib/secrets.ts"],
    body: {
      size: 3890,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/azure_resources.ts": {
    id: "src/lib/azure_resources.ts",
    adjacentTo: [
      "src/lib/azure_identity/index.ts",
      "src/lib/env.ts",
      "src/lib/utils.ts",
    ],
    body: {
      size: 1759,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/azure_storage.ts": {
    id: "src/lib/azure_storage.ts",
    adjacentTo: ["src/lib/azure_identity/index.ts", "src/lib/utils.ts"],
    body: {
      size: 3955,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/filesystem/index.ts": {
    id: "src/lib/filesystem/index.ts",
    adjacentTo: [],
    body: {
      size: 714,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/organization.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/organization.guard.ts",
    adjacentTo: [],
    body: {
      size: 359,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/index.ts": {
    id: "src/lib/fastify_azure_ad_b2c/index.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/signin.ts",
      "src/lib/fastify_azure_ad_b2c/token.guard.ts",
      "src/lib/fastify_azure_ad_b2c/admin.guard.ts",
      "src/lib/fastify_azure_ad_b2c/organization.guard.ts",
    ],
    body: {
      size: 126,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/signin.ts": {
    id: "src/lib/fastify_azure_ad_b2c/signin.ts",
    adjacentTo: ["src/lib/azure_b2c/index.ts", "src/lib/fastify/index.ts"],
    body: {
      size: 1870,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/token.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/token.guard.ts",
    adjacentTo: [
      "src/lib/fastify_passport/index.ts",
      "src/lib/internal_token.ts",
    ],
    body: {
      size: 1299,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_passport/index.ts": {
    id: "src/lib/fastify_passport/index.ts",
    adjacentTo: ["src/lib/fastify/register.ts"],
    body: {
      size: 1167,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal_token.ts": {
    id: "src/lib/internal_token.ts",
    adjacentTo: ["src/lib/secrets.ts"],
    body: {
      size: 895,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/admin.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/admin.guard.ts",
    adjacentTo: ["src/lib/internal_token.ts"],
    body: {
      size: 739,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/prisma/index.ts": {
    id: "src/lib/prisma/index.ts",
    adjacentTo: [
      "prisma/logistic/client/index.js",
      "src/lib/azure_identity/index.ts",
      "src/lib/env.ts",
      "src/lib/filesystem/index.ts",
      "src/lib/internal/logger/index.ts",
      "prisma/bulk/client/index.js",
      "prisma/store_insights/client/index.js",
    ],
    body: {
      size: 8222,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/internal/alerting/index.ts": {
    id: "src/lib/internal/alerting/index.ts",
    adjacentTo: [
      "src/lib/internal/alerting/client/index.ts",
      "src/lib/internal/alerting/config.ts",
      "src/lib/internal/alerting/scheduler.ts",
    ],
    body: {
      size: 385,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_secure_session/session.ts": {
    id: "src/lib/fastify_secure_session/session.ts",
    adjacentTo: [
      "src/lib/fastify/register.ts",
      "src/lib/secrets.ts",
      "src/lib/fastify_secure_session/index.ts",
    ],
    body: {
      size: 1145,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_secure_session/index.ts": {
    id: "src/lib/fastify_secure_session/index.ts",
    adjacentTo: ["src/lib/fastify_secure_session/session.ts"],
    body: {
      size: 51,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/passport_azure_ad/settings.ts": {
    id: "src/lib/passport_azure_ad/settings.ts",
    adjacentTo: ["src/lib/env.ts"],
    body: {
      size: 1433,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/passport_azure_ad/index.ts": {
    id: "src/lib/passport_azure_ad/index.ts",
    adjacentTo: [
      "src/lib/fastify_passport/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
    ],
    body: {
      size: 1870,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/knex/index.ts": {
    id: "src/lib/knex/index.ts",
    adjacentTo: ["src/lib/env.ts"],
    body: {
      size: 3104,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/index.ts": {
    id: "src/index.ts",
    adjacentTo: [
      "src/apps/aware_application.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
      "src/lib/azure_identity/index.ts",
      "src/lib/azure_keyvault.ts",
      "src/lib/env.ts",
      "src/lib/fastify/index.ts",
      "src/lib/fastify_passport/index.ts",
      "src/lib/internal/alerting/index.ts",
      "src/lib/internal/logger/index.ts",
      "src/lib/internal_token.ts",
      "src/lib/secrets.ts",
      "src/server.ts",
      "src/server/http_server.ts",
      "src/server/settings.ts",
    ],
    body: {
      size: 2490,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_application.ts": {
    id: "src/apps/aware_application.ts",
    adjacentTo: [
      "src/lib/health_check.ts",
      "src/apps/aware_insights/index.ts",
      "src/apps/b2c_api_connector/index.ts",
      "src/apps/bulk/index.ts",
      "src/apps/logistic/index.ts",
      "src/apps/store_insights/index.ts",
    ],
    body: {
      size: 1489,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/index.ts": {
    id: "src/apps/aware_insights/index.ts",
    adjacentTo: ["src/apps/aware_insights/entrypoint.ts"],
    body: {
      size: 58,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/entrypoint.ts": {
    id: "src/apps/aware_insights/entrypoint.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/server/errors.ts",
      "src/apps/aware_application.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    ],
    body: {
      size: 1689,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts": {
    id: "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
    ],
    body: {
      size: 15829,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/reporting/settings.ts": {
    id: "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1549,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts": {
    id: "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
    adjacentTo: [],
    body: {
      size: 1070,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts": {
    id: "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    ],
    body: {
      size: 3931,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/index.ts": {
    id: "src/apps/b2c_api_connector/index.ts",
    adjacentTo: ["src/apps/b2c_api_connector/api.ts"],
    body: {
      size: 45,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/api.ts": {
    id: "src/apps/b2c_api_connector/api.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/apps/b2c_api_connector/b2c_user.ts",
      "src/apps/b2c_api_connector/fetch.ts",
    ],
    body: {
      size: 2078,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/b2c_user.ts": {
    id: "src/apps/b2c_api_connector/b2c_user.ts",
    adjacentTo: ["src/apps/b2c_api_connector/fetch.ts"],
    body: {
      size: 3299,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/fetch.ts": {
    id: "src/apps/b2c_api_connector/fetch.ts",
    adjacentTo: [
      "src/lib/env.ts",
      "src/lib/fastify/index.ts",
      "src/lib/internal/logger/index.ts",
      "src/lib/internal_token.ts",
      "src/lib/utils.ts",
    ],
    body: {
      size: 4735,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/index.ts": {
    id: "src/apps/bulk/index.ts",
    adjacentTo: ["src/apps/bulk/entrypoint.ts"],
    body: {
      size: 30,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/entrypoint.ts": {
    id: "src/apps/bulk/entrypoint.ts",
    adjacentTo: [
      "prisma/bulk/client/index.js",
      "src/lib/azure_identity/index.ts",
      "src/lib/azure_keyvault.ts",
      "src/lib/azure_resources.ts",
      "src/lib/env.ts",
      "src/lib/health_check.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/lib/prisma/index.ts",
      "src/apps/bulk/keys/keys.controller.ts",
      "src/apps/bulk/keys/keys.service.ts",
      "src/apps/bulk/knex.ts",
      "src/apps/bulk/parameters/index.ts",
      "src/apps/bulk/users/users.controller.ts",
      "src/apps/bulk/users/users.repository.ts",
    ],
    body: {
      size: 2410,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/keys/keys.controller.ts": {
    id: "src/apps/bulk/keys/keys.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/lib/internal/logger/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/keys/keys.service.ts",
    ],
    body: {
      size: 2347,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      adjacentTo: [
        "src/lib/internal/logger/index.ts",
        "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      ],
      body: {
        size: 1961,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      adjacentTo: [
        "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      ],
      body: {
        size: 1719,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/bulk/keys/keys.service.ts": {
    id: "src/apps/bulk/keys/keys.service.ts",
    adjacentTo: [
      "src/lib/azure_keyvault.ts",
      "src/lib/azure_resources.ts",
      "src/lib/env.ts",
    ],
    body: {
      size: 8074,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/knex.ts": {
    id: "src/apps/bulk/knex.ts",
    adjacentTo: ["src/lib/knex/index.ts"],
    body: {
      size: 271,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/index.ts": {
    id: "src/apps/bulk/parameters/index.ts",
    adjacentTo: [
      "src/apps/bulk/parameters/parameter.repository.ts",
      "src/apps/bulk/parameters/parameters.controller.ts",
      "src/apps/bulk/parameters/parameter.ts",
    ],
    body: {
      size: 110,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameter.repository.ts": {
    id: "src/apps/bulk/parameters/parameter.repository.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/knex/index.ts",
      "src/apps/bulk/parameters/parameter.ts",
    ],
    body: {
      size: 5495,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameter.ts": {
    id: "src/apps/bulk/parameters/parameter.ts",
    adjacentTo: [],
    body: {
      size: 3008,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameters.controller.ts": {
    id: "src/apps/bulk/parameters/parameters.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/parameters/parameter.ts",
      "src/apps/bulk/parameters/parameter.repository.ts",
    ],
    body: {
      size: 3744,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/users.controller.ts": {
    id: "src/apps/bulk/users/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/users/user.ts",
      "src/apps/bulk/users/users.repository.ts",
    ],
    body: {
      size: 3885,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/user.ts": {
    id: "src/apps/bulk/users/user.ts",
    adjacentTo: [
      "src/apps/bulk/users/permission.ts",
      "src/apps/bulk/users/role.ts",
    ],
    body: {
      size: 385,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/permission.ts": {
    id: "src/apps/bulk/users/permission.ts",
    adjacentTo: ["src/apps/bulk/users/role.ts"],
    body: {
      size: 775,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/role.ts": {
    id: "src/apps/bulk/users/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/users.repository.ts": {
    id: "src/apps/bulk/users/users.repository.ts",
    adjacentTo: [
      "prisma/bulk/client/index.js",
      "src/lib/internal/logger/index.ts",
      "src/lib/prisma/index.ts",
      "src/apps/bulk/users/permission.ts",
      "src/apps/bulk/users/user.ts",
    ],
    body: {
      size: 5187,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/index.ts": {
    id: "src/apps/logistic/index.ts",
    adjacentTo: ["src/apps/logistic/entrypoint.ts"],
    body: {
      size: 53,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/entrypoint.ts": {
    id: "src/apps/logistic/entrypoint.ts",
    adjacentTo: [
      "prisma/logistic/client/index.js",
      "src/lib/azure_b2c/index.ts",
      "src/lib/azure_identity/index.ts",
      "src/lib/azure_keyvault.ts",
      "src/lib/env.ts",
      "src/lib/health_check.ts",
      "src/lib/knex/index.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/lib/prisma/index.ts",
      "src/lib/secrets.ts",
      "src/apps/aware_application.ts",
      "src/apps/logistic/core/backoffice.service.ts",
      "src/apps/logistic/core/product/product.use_cases.ts",
      "src/apps/logistic/core/stock/stock.use_cases.ts",
      "src/apps/logistic/core/warehouse/warehouse.use_cases.ts",
      "src/apps/logistic/primary_adapters/http/product/product.controller.ts",
      "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts",
      "src/apps/logistic/primary_adapters/http/user/users.controller.ts",
      "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts",
      "src/apps/logistic/secondary_adapters/product/product.repository.ts",
      "src/apps/logistic/secondary_adapters/stock/stock.repository.ts",
      "src/apps/logistic/secondary_adapters/user/user.service.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts",
    ],
    body: {
      size: 5897,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/backoffice.service.ts": {
    id: "src/apps/logistic/core/backoffice.service.ts",
    adjacentTo: ["src/apps/logistic/secondary_adapters/user/user.service.ts"],
    body: {
      size: 2336,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user.service.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user.service.ts",
    adjacentTo: [
      "prisma/logistic/client/index.js",
      "src/lib/internal/logger/index.ts",
      "src/lib/prisma/index.ts",
      "src/apps/logistic/secondary_adapters/user/permission.ts",
      "src/apps/logistic/secondary_adapters/user/user.ts",
      "src/apps/logistic/secondary_adapters/user/user_creation.ts",
      "src/apps/logistic/secondary_adapters/user/user_update.ts",
    ],
    body: {
      size: 7017,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/permission.ts": {
    id: "src/apps/logistic/secondary_adapters/user/permission.ts",
    adjacentTo: ["src/apps/logistic/secondary_adapters/user/role.ts"],
    body: {
      size: 779,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/role.ts": {
    id: "src/apps/logistic/secondary_adapters/user/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user.ts",
    adjacentTo: [
      "src/apps/logistic/secondary_adapters/user/permission.ts",
      "src/apps/logistic/secondary_adapters/user/role.ts",
    ],
    body: {
      size: 254,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user_creation.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user_creation.ts",
    adjacentTo: [],
    body: {
      size: 140,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user_update.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user_update.ts",
    adjacentTo: [],
    body: {
      size: 135,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/product.use_cases.ts": {
    id: "src/apps/logistic/core/product/product.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/core/product/product.repository.ts",
    ],
    body: {
      size: 1137,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/product.ts": {
    id: "src/apps/logistic/core/product/product.ts",
    adjacentTo: [],
    body: {
      size: 732,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/product.repository.ts": {
    id: "src/apps/logistic/core/product/product.repository.ts",
    adjacentTo: ["src/apps/logistic/core/product/product.ts"],
    body: {
      size: 420,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/stock.use_cases.ts": {
    id: "src/apps/logistic/core/stock/stock.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/file.domain_service.ts",
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/ports/secondary.ts",
    ],
    body: {
      size: 1390,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/file.domain_service.ts": {
    id: "src/apps/logistic/core/stock/file.domain_service.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 3014,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/ports/primary.ts": {
    id: "src/apps/logistic/core/stock/ports/primary.ts",
    adjacentTo: [
      "src/apps/logistic/core/common/common.model.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 968,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/common/common.model.ts": {
    id: "src/apps/logistic/core/common/common.model.ts",
    adjacentTo: [],
    body: {
      size: 224,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/stock.ts": {
    id: "src/apps/logistic/core/stock/stock.ts",
    adjacentTo: [],
    body: {
      size: 1097,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/ports/secondary.ts": {
    id: "src/apps/logistic/core/stock/ports/secondary.ts",
    adjacentTo: [
      "src/apps/logistic/core/common/common.model.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 786,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/warehouse.use_cases.ts": {
    id: "src/apps/logistic/core/warehouse/warehouse.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/core/warehouse/warehouse.repository.ts",
    ],
    body: {
      size: 1226,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/warehouse.ts": {
    id: "src/apps/logistic/core/warehouse/warehouse.ts",
    adjacentTo: [],
    body: {
      size: 530,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/warehouse.repository.ts": {
    id: "src/apps/logistic/core/warehouse/warehouse.repository.ts",
    adjacentTo: ["src/apps/logistic/core/warehouse/warehouse.ts"],
    body: {
      size: 455,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/product/product.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/product/product.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/core/product/product.use_cases.ts",
    ],
    body: {
      size: 3222,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 6106,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/user/users.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/user/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/secondary_adapters/user/user.service.ts",
      "src/apps/logistic/secondary_adapters/user/user_creation.ts",
      "src/apps/logistic/secondary_adapters/user/user_update.ts",
    ],
    body: {
      size: 4286,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/core/warehouse/warehouse.use_cases.ts",
    ],
    body: {
      size: 3207,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.repository.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/knex/index.ts",
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/core/product/product.repository.ts",
      "src/apps/logistic/secondary_adapters/product/product.acl.ts",
    ],
    body: {
      size: 2149,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.acl.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.acl.ts",
    adjacentTo: [
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/secondary_adapters/stock/stock.model.ts",
    ],
    body: {
      size: 854,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.model.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.model.ts",
    adjacentTo: [],
    body: {
      size: 1465,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.repository.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/knex/index.ts",
      "src/apps/logistic/core/stock/ports/secondary.ts",
      "src/apps/logistic/core/stock/stock.ts",
      "src/apps/logistic/secondary_adapters/stock/stock.model.ts",
    ],
    body: {
      size: 6853,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts",
    adjacentTo: [
      "src/lib/internal/logger/index.ts",
      "src/lib/knex/index.ts",
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/core/warehouse/warehouse.repository.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts",
    ],
    body: {
      size: 2240,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts",
    adjacentTo: [
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    ],
    body: {
      size: 467,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    adjacentTo: [],
    body: {
      size: 250,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/index.ts": {
    id: "src/apps/store_insights/index.ts",
    adjacentTo: ["src/apps/store_insights/entrypoint.ts"],
    body: {
      size: 58,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/entrypoint.ts": {
    id: "src/apps/store_insights/entrypoint.ts",
    adjacentTo: [
      "prisma/store_insights/client/index.js",
      "src/lib/azure_b2c/index.ts",
      "src/lib/azure_identity/index.ts",
      "src/lib/azure_keyvault.ts",
      "src/lib/azure_resources.ts",
      "src/lib/azure_storage.ts",
      "src/lib/env.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/lib/health_check.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/lib/prisma/index.ts",
      "src/lib/secrets.ts",
      "src/apps/aware_application.ts",
      "src/apps/store_insights/application/controllers/store_insights.controller.ts",
      "src/apps/store_insights/application/controllers/users.controller.ts",
      "src/apps/store_insights/domain/backoffice.service.ts",
      "src/apps/store_insights/domain/store_insights.service.ts",
      "src/apps/store_insights/infrastructure/user.service.ts",
    ],
    body: {
      size: 5811,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/store_insights.controller.ts":
    {
      id: "src/apps/store_insights/application/controllers/store_insights.controller.ts",
      adjacentTo: [
        "src/lib/fastify/index.ts",
        "src/lib/fastify_azure_ad_b2c/index.ts",
        "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
        "src/apps/store_insights/domain/store_insights.service.ts",
      ],
      body: {
        size: 3960,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/domain/store_insights.service.ts": {
    id: "src/apps/store_insights/domain/store_insights.service.ts",
    adjacentTo: ["src/lib/azure_storage.ts", "src/lib/env.ts"],
    body: {
      size: 4806,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/users.controller.ts": {
    id: "src/apps/store_insights/application/controllers/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify/index.ts",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/store_insights/infrastructure/user.service.ts",
      "src/apps/store_insights/infrastructure/user_creation.ts",
      "src/apps/store_insights/infrastructure/user_update.ts",
    ],
    body: {
      size: 4352,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user.service.ts": {
    id: "src/apps/store_insights/infrastructure/user.service.ts",
    adjacentTo: [
      "prisma/store_insights/client/index.js",
      "src/lib/internal/logger/index.ts",
      "src/lib/prisma/index.ts",
      "src/apps/store_insights/infrastructure/permission.ts",
      "src/apps/store_insights/infrastructure/user.ts",
      "src/apps/store_insights/infrastructure/user_creation.ts",
      "src/apps/store_insights/infrastructure/user_update.ts",
    ],
    body: {
      size: 6930,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/permission.ts": {
    id: "src/apps/store_insights/infrastructure/permission.ts",
    adjacentTo: ["src/apps/store_insights/infrastructure/role.ts"],
    body: {
      size: 785,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/role.ts": {
    id: "src/apps/store_insights/infrastructure/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user.ts": {
    id: "src/apps/store_insights/infrastructure/user.ts",
    adjacentTo: [
      "src/apps/store_insights/infrastructure/permission.ts",
      "src/apps/store_insights/infrastructure/role.ts",
    ],
    body: {
      size: 254,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_creation.ts": {
    id: "src/apps/store_insights/infrastructure/user_creation.ts",
    adjacentTo: [],
    body: {
      size: 140,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_update.ts": {
    id: "src/apps/store_insights/infrastructure/user_update.ts",
    adjacentTo: [],
    body: {
      size: 135,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/domain/backoffice.service.ts": {
    id: "src/apps/store_insights/domain/backoffice.service.ts",
    adjacentTo: ["src/apps/store_insights/infrastructure/user.service.ts"],
    body: {
      size: 2339,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server.ts": {
    id: "src/server.ts",
    adjacentTo: [
      "src/apps/aware_application.ts",
      "src/lib/fastify/index.ts",
      "src/lib/fastify_passport/index.ts",
      "src/lib/fastify_secure_session/index.ts",
      "src/server/http_server.ts",
    ],
    body: {
      size: 762,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/setupTests.js": {
    id: "src/setupTests.js",
    adjacentTo: [],
    body: {
      size: 26,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.model.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.model.ts",
    adjacentTo: [],
    body: {
      size: 442,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.fake.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.fake.repository.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/ports/secondary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 5447,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.knex.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.knex.ts",
    adjacentTo: ["src/apps/logistic/secondary_adapters/stock/stock.model.ts"],
    body: {
      size: 350,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_verification.service.ts": {
    id: "src/apps/store_insights/infrastructure/user_verification.service.ts",
    adjacentTo: [],
    body: {
      size: 0,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/db_migrate.ts": {
    id: "src/db_migrate.ts",
    adjacentTo: [
      "src/lib/azure_identity/index.ts",
      "src/lib/env.ts",
      "src/lib/internal/alerting/index.ts",
      "src/lib/internal/logger/index.ts",
      "src/lib/prisma/index.ts",
    ],
    body: {
      size: 994,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/orphan.ts": {
    id: "src/orphan.ts",
    adjacentTo: [],
    body: {
      size: 994,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
};

export const realData = {
  "prisma/logistic/client/runtime/index.js": {
    id: "prisma/logistic/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: [
        "os",
        "tty",
        "util",
        "fs",
        "path",
        "child_process",
        "buffer",
        "string_decoder",
        "stream",
        "assert",
        "events",
        "punycode",
        "http",
        "url",
        "https",
        "zlib",
        "net",
        "tls",
        "crypto",
        "constants",
        "worker_threads",
        "stream/web",
        "perf_hooks",
        "util/types",
        "diagnostics_channel",
        "async_hooks",
        "console",
      ],
    },
  },
  "prisma/logistic/client/runtime/edge.js": {
    id: "prisma/logistic/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/logistic/client/runtime/index-browser.js": {
    id: "prisma/logistic/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/logistic/client/index.js": {
    id: "prisma/logistic/client/index.js",
    adjacentTo: ["prisma/logistic/client/runtime/index.js"],
    body: {
      size: 52839,
      thirdPartyDependencies: [],
      builtinDependencies: ["path", "fs"],
    },
  },
  "prisma/logistic/client/index-browser.js": {
    id: "prisma/logistic/client/index-browser.js",
    adjacentTo: ["prisma/logistic/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/runtime/index.js": {
    id: "prisma/bulk/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: [
        "os",
        "tty",
        "util",
        "fs",
        "path",
        "child_process",
        "buffer",
        "string_decoder",
        "stream",
        "assert",
        "events",
        "punycode",
        "http",
        "url",
        "https",
        "zlib",
        "net",
        "tls",
        "crypto",
        "constants",
        "worker_threads",
        "stream/web",
        "perf_hooks",
        "util/types",
        "diagnostics_channel",
        "async_hooks",
        "console",
      ],
    },
  },
  "prisma/bulk/client/runtime/edge.js": {
    id: "prisma/bulk/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/runtime/index-browser.js": {
    id: "prisma/bulk/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/bulk/client/index.js": {
    id: "prisma/bulk/client/index.js",
    adjacentTo: ["prisma/bulk/client/runtime/index.js"],
    body: {
      size: 52819,
      thirdPartyDependencies: [],
      builtinDependencies: ["path", "fs"],
    },
  },
  "prisma/bulk/client/index-browser.js": {
    id: "prisma/bulk/client/index-browser.js",
    adjacentTo: ["prisma/bulk/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/runtime/index.js": {
    id: "prisma/store_insights/client/runtime/index.js",
    adjacentTo: [],
    body: {
      size: 2623179,
      thirdPartyDependencies: [],
      builtinDependencies: [
        "os",
        "tty",
        "util",
        "fs",
        "path",
        "child_process",
        "buffer",
        "string_decoder",
        "stream",
        "assert",
        "events",
        "punycode",
        "http",
        "url",
        "https",
        "zlib",
        "net",
        "tls",
        "crypto",
        "constants",
        "worker_threads",
        "stream/web",
        "perf_hooks",
        "util/types",
        "diagnostics_channel",
        "async_hooks",
        "console",
      ],
    },
  },
  "prisma/store_insights/client/runtime/edge.js": {
    id: "prisma/store_insights/client/runtime/edge.js",
    adjacentTo: [],
    body: {
      size: 249852,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/runtime/index-browser.js": {
    id: "prisma/store_insights/client/runtime/index-browser.js",
    adjacentTo: [],
    body: {
      size: 64235,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "prisma/store_insights/client/index.js": {
    id: "prisma/store_insights/client/index.js",
    adjacentTo: ["prisma/store_insights/client/runtime/index.js"],
    body: {
      size: 52869,
      thirdPartyDependencies: [],
      builtinDependencies: ["path", "fs"],
    },
  },
  "prisma/store_insights/client/index-browser.js": {
    id: "prisma/store_insights/client/index-browser.js",
    adjacentTo: ["prisma/store_insights/client/runtime/index-browser.js"],
    body: {
      size: 3533,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  ".prettierrc.js": {
    id: ".prettierrc.js",
    adjacentTo: [],
    body: {
      size: 43,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  ".eslintrc.js": {
    id: ".eslintrc.js",
    adjacentTo: [],
    body: {
      size: 1800,
      thirdPartyDependencies: [
        "@rushstack/eslint-config/patch/modern-module-resolution",
      ],
      builtinDependencies: [],
    },
  },
  "knex/migrations/20220912134231_stocks.ts": {
    id: "knex/migrations/20220912134231_stocks.ts",
    adjacentTo: [],
    body: {
      size: 2136,
      thirdPartyDependencies: ["knex"],
      builtinDependencies: [],
    },
  },
  "knex/knexfile.ts": {
    id: "knex/knexfile.ts",
    adjacentTo: [],
    body: {
      size: 323,
      thirdPartyDependencies: ["knex"],
      builtinDependencies: [],
    },
  },
  "src/swagger/errors.ts": {
    id: "src/swagger/errors.ts",
    adjacentTo: [],
    body: {
      size: 188,
      thirdPartyDependencies: ["@effect-ts/system/Case"],
      builtinDependencies: [],
    },
  },
  "src/swagger/settings.ts": {
    id: "src/swagger/settings.ts",
    adjacentTo: ["src/lib/fastify_swagger/swagger.ts"],
    body: {
      size: 4844,
      thirdPartyDependencies: [
        "@aware/effect",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Has",
        "@fastify/swagger",
        "@fastify/swagger-ui",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_swagger/swagger.ts": {
    id: "src/lib/fastify_swagger/swagger.ts",
    adjacentTo: [],
    body: {
      size: 1431,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/system/Has",
        "@fastify/swagger",
        "@fastify/swagger-ui",
        "@fastify/type-provider-typebox",
      ],
      builtinDependencies: [],
    },
  },
  "src/server/errors.ts": {
    id: "src/server/errors.ts",
    adjacentTo: [],
    body: {
      size: 191,
      thirdPartyDependencies: ["@effect-ts/system/Case"],
      builtinDependencies: [],
    },
  },
  "src/server/settings.ts": {
    id: "src/server/settings.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1379,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
      ],
      builtinDependencies: [],
    },
  },
  "src/server/environment.ts": {
    id: "src/server/environment.ts",
    adjacentTo: [],
    body: {
      size: 1824,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/server/schema/root.schema.ts": {
    id: "src/server/schema/root.schema.ts",
    adjacentTo: [],
    body: {
      size: 281,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/schema/health.schema.ts": {
    id: "src/server/schema/health.schema.ts",
    adjacentTo: [],
    body: {
      size: 122,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/server/http_server.ts": {
    id: "src/server/http_server.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/lib/health_check.ts",
      "src/swagger/settings.ts",
      "src/server/schema/health.schema.ts",
      "src/server/schema/root.schema.ts",
    ],
    body: {
      size: 2857,
      thirdPartyDependencies: [
        "@aware/azure-identity",
        "@aware/fastify",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts": {
    id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts",
    ],
    body: {
      size: 84,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      adjacentTo: [],
      body: {
        size: 1921,
        thirdPartyDependencies: [
          "@effect-ts/core/Case",
          "@effect-ts/core/Effect",
          "@effect-ts/core/Effect/Layer",
          "@effect-ts/system/Has",
        ],
        builtinDependencies: [],
      },
    },
  "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts": {
    id: "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/setup.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
    ],
    body: {
      size: 2509,
      thirdPartyDependencies: [
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Has",
        "applicationinsights",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/health_check.ts": {
    id: "src/lib/health_check.ts",
    adjacentTo: ["src/scripts/create_application_metadata.ts"],
    body: {
      size: 7122,
      thirdPartyDependencies: [
        "@aware/azure-arm",
        "@aware/azure-b2c",
        "@aware/azure-storage",
        "@aware/effect",
        "@azure/msal-node",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
        "applicationinsights",
        "knex",
        "superagent",
        "@azure/identity",
        "@prisma/client",
      ],
      builtinDependencies: ["node:path"],
    },
  },
  "src/scripts/create_application_metadata.ts": {
    id: "src/scripts/create_application_metadata.ts",
    adjacentTo: [],
    body: {
      size: 1370,
      thirdPartyDependencies: [
        "@aware/effect",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
      ],
      builtinDependencies: ["node:child_process", "node:path"],
    },
  },
  "src/lib/fastify_azure_ad_b2c/organization.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/organization.guard.ts",
    adjacentTo: [],
    body: {
      size: 359,
      thirdPartyDependencies: ["fastify"],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/index.ts": {
    id: "src/lib/fastify_azure_ad_b2c/index.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/admin.guard.ts",
      "src/lib/fastify_azure_ad_b2c/organization.guard.ts",
      "src/lib/fastify_azure_ad_b2c/signin.ts",
      "src/lib/fastify_azure_ad_b2c/token.guard.ts",
    ],
    body: {
      size: 126,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/admin.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/admin.guard.ts",
    adjacentTo: ["src/lib/internal_token.ts"],
    body: {
      size: 746,
      thirdPartyDependencies: ["@aware/fastify", "@effect-ts/core/Effect"],
      builtinDependencies: [],
    },
  },
  "src/lib/internal_token.ts": {
    id: "src/lib/internal_token.ts",
    adjacentTo: ["src/lib/secrets.ts"],
    body: {
      size: 895,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
        "@effect-ts/system/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/secrets.ts": {
    id: "src/lib/secrets.ts",
    adjacentTo: [],
    body: {
      size: 2578,
      thirdPartyDependencies: [
        "@aware/azure-keyvault",
        "@aware/effect",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
        "date-fns",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/signin.ts": {
    id: "src/lib/fastify_azure_ad_b2c/signin.ts",
    adjacentTo: [],
    body: {
      size: 2984,
      thirdPartyDependencies: [
        "@aware/azure-b2c",
        "@aware/effect",
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify_azure_ad_b2c/token.guard.ts": {
    id: "src/lib/fastify_azure_ad_b2c/token.guard.ts",
    adjacentTo: ["src/lib/internal_token.ts"],
    body: {
      size: 1310,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@aware/fastify-passport",
        "@effect-ts/core/Effect",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/utils.ts": {
    id: "src/lib/utils.ts",
    adjacentTo: [],
    body: {
      size: 231,
      thirdPartyDependencies: [],
      builtinDependencies: ["crypto", "node:buffer"],
    },
  },
  "src/lib/basic_auth.ts": {
    id: "src/lib/basic_auth.ts",
    adjacentTo: ["src/lib/secrets.ts"],
    body: {
      size: 1375,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/passport_azure_ad/settings.ts": {
    id: "src/lib/passport_azure_ad/settings.ts",
    adjacentTo: [],
    body: {
      size: 1446,
      thirdPartyDependencies: [
        "@aware/effect",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
        "@effect-ts/system/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/lib/passport_azure_ad/index.ts": {
    id: "src/lib/passport_azure_ad/index.ts",
    adjacentTo: ["src/lib/passport_azure_ad/settings.ts"],
    body: {
      size: 1873,
      thirdPartyDependencies: [
        "@aware/fastify-passport",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/system/Has",
        "passport-azure-ad",
      ],
      builtinDependencies: [],
    },
  },
  "src/index.ts": {
    id: "src/index.ts",
    adjacentTo: [
      "src/apps/aware_application.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/settings.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
      "src/lib/basic_auth.ts",
      "src/lib/internal_token.ts",
      "src/lib/secrets.ts",
      "src/server.ts",
      "src/server/http_server.ts",
      "src/server/settings.ts",
      "src/swagger/settings.ts",
    ],
    body: {
      size: 2572,
      thirdPartyDependencies: [
        "@aware/azure-identity",
        "@aware/azure-keyvault",
        "@aware/effect",
        "@aware/fastify-passport",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Function",
        "@effect-ts/node/Runtime",
        "dotenv/config",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_application.ts": {
    id: "src/apps/aware_application.ts",
    adjacentTo: [
      "src/lib/health_check.ts",
      "src/apps/aware_insights/index.ts",
      "src/apps/b2c_api_connector/index.ts",
      "src/apps/bulk/index.ts",
      "src/apps/logistic/index.ts",
      "src/apps/store_insights/index.ts",
    ],
    body: {
      size: 1558,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/index.ts": {
    id: "src/apps/aware_insights/index.ts",
    adjacentTo: ["src/apps/aware_insights/entrypoint.ts"],
    body: {
      size: 58,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/entrypoint.ts": {
    id: "src/apps/aware_insights/entrypoint.ts",
    adjacentTo: [
      "src/server/errors.ts",
      "src/apps/aware_application.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts",
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    ],
    body: {
      size: 1662,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts": {
    id: "src/apps/aware_insights/bounded_contexts/backoffice/handlers.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/schema/backoffice.schema.ts",
      "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
    ],
    body: {
      size: 16251,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
        "@effect-ts/system/Has",
        "@fastify/http-proxy",
        "cookie",
        "superagent",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/reporting/settings.ts": {
    id: "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1549,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/backoffice/schema/backoffice.schema.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/backoffice/schema/backoffice.schema.ts",
      adjacentTo: [],
      body: {
        size: 147,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts": {
    id: "src/apps/aware_insights/bounded_contexts/backoffice/settings.ts",
    adjacentTo: [],
    body: {
      size: 1070,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts": {
    id: "src/apps/aware_insights/bounded_contexts/reporting/handlers.ts",
    adjacentTo: [
      "src/apps/aware_insights/bounded_contexts/reporting/settings.ts",
    ],
    body: {
      size: 3897,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/system/Has",
        "@fastify/cors",
        "@fastify/http-proxy",
        "cookie",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/index.ts": {
    id: "src/apps/b2c_api_connector/index.ts",
    adjacentTo: ["src/apps/b2c_api_connector/api.ts"],
    body: {
      size: 45,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/api.ts": {
    id: "src/apps/b2c_api_connector/api.ts",
    adjacentTo: [
      "src/apps/b2c_api_connector/build_user_attributes.ts",
      "src/apps/b2c_api_connector/check_user.ts",
    ],
    body: {
      size: 3138,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
        "fastify",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/build_user_attributes.ts": {
    id: "src/apps/b2c_api_connector/build_user_attributes.ts",
    adjacentTo: ["src/apps/b2c_api_connector/check_user.ts"],
    body: {
      size: 5090,
      thirdPartyDependencies: [
        "@effect-ts/core/Case",
        "@effect-ts/core/Collections/Immutable/Chunk",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Function",
        "@effect-ts/core/Has",
        "@effect-ts/core/Option",
        "@effect-ts/core/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/b2c_api_connector/check_user.ts": {
    id: "src/apps/b2c_api_connector/check_user.ts",
    adjacentTo: ["src/lib/internal_token.ts", "src/lib/secrets.ts"],
    body: {
      size: 7550,
      thirdPartyDependencies: [
        "@aware/azure-b2c",
        "@aware/effect",
        "@aware/error-utils",
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
        "@effect-ts/system/Utils",
        "undici",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/index.ts": {
    id: "src/apps/bulk/index.ts",
    adjacentTo: ["src/apps/bulk/entrypoint.ts"],
    body: {
      size: 30,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/entrypoint.ts": {
    id: "src/apps/bulk/entrypoint.ts",
    adjacentTo: [
      "prisma/bulk/client/index.js",
      "src/lib/health_check.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/apps/bulk/keys/keys.controller.ts",
      "src/apps/bulk/keys/keys.service.ts",
      "src/apps/bulk/knex.ts",
      "src/apps/bulk/parameters/index.ts",
      "src/apps/bulk/users/users.controller.ts",
      "src/apps/bulk/users/users.repository.ts",
    ],
    body: {
      size: 2399,
      thirdPartyDependencies: [
        "@aware/azure-arm",
        "@aware/azure-identity",
        "@aware/azure-keyvault",
        "@aware/effect",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/keys/keys.controller.ts": {
    id: "src/apps/bulk/keys/keys.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/keys/keys.service.ts",
      "src/apps/bulk/keys/schema/users/index.ts",
    ],
    body: {
      size: 2623,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      adjacentTo: [
        "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      ],
      body: {
        size: 1951,
        thirdPartyDependencies: [
          "@aware/effect",
          "@aware/fastify",
          "@effect-ts/core",
          "@effect-ts/core/Effect",
        ],
        builtinDependencies: [],
      },
    },
  "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts":
    {
      id: "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action_tracer.ts",
      adjacentTo: [
        "src/apps/aware_insights/bounded_contexts/customer_care/telemetry/index.ts",
      ],
      body: {
        size: 1719,
        thirdPartyDependencies: [
          "@effect-ts/core",
          "@effect-ts/core/Effect",
          "@effect-ts/core/Effect/Layer",
          "@effect-ts/core/Option",
          "@effect-ts/system/Case",
          "@effect-ts/system/Has",
        ],
        builtinDependencies: [],
      },
    },
  "src/apps/bulk/keys/keys.service.ts": {
    id: "src/apps/bulk/keys/keys.service.ts",
    adjacentTo: [],
    body: {
      size: 7999,
      thirdPartyDependencies: [
        "@aware/azure-arm",
        "@aware/azure-keyvault",
        "@aware/effect",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
        "@effect-ts/system/Ord",
        "@effect-ts/system/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/keys/schema/users/index.ts": {
    id: "src/apps/bulk/keys/schema/users/index.ts",
    adjacentTo: ["src/apps/bulk/keys/schema/users/get_keys.schema.ts"],
    body: {
      size: 53,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/keys/schema/users/get_keys.schema.ts": {
    id: "src/apps/bulk/keys/schema/users/get_keys.schema.ts",
    adjacentTo: [],
    body: {
      size: 253,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/knex.ts": {
    id: "src/apps/bulk/knex.ts",
    adjacentTo: [],
    body: {
      size: 267,
      thirdPartyDependencies: ["@aware/knex", "@effect-ts/core/Effect/Layer"],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/index.ts": {
    id: "src/apps/bulk/parameters/index.ts",
    adjacentTo: [
      "src/apps/bulk/parameters/parameter.repository.ts",
      "src/apps/bulk/parameters/parameters.controller.ts",
      "src/apps/bulk/parameters/parameter.ts",
    ],
    body: {
      size: 110,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameter.repository.ts": {
    id: "src/apps/bulk/parameters/parameter.repository.ts",
    adjacentTo: ["src/apps/bulk/parameters/parameter.ts"],
    body: {
      size: 5529,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/knex",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
        "@effect-ts/system/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameter.ts": {
    id: "src/apps/bulk/parameters/parameter.ts",
    adjacentTo: [],
    body: {
      size: 3008,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/parameters/parameters.controller.ts": {
    id: "src/apps/bulk/parameters/parameters.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/parameters/parameter.ts",
      "src/apps/bulk/parameters/parameter.repository.ts",
    ],
    body: {
      size: 3738,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/users.controller.ts": {
    id: "src/apps/bulk/users/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/bulk/users/DTO/user.dto.ts",
      "src/apps/bulk/users/schema/users/index.ts",
      "src/apps/bulk/users/users.repository.ts",
    ],
    body: {
      size: 4433,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/DTO/user.dto.ts": {
    id: "src/apps/bulk/users/DTO/user.dto.ts",
    adjacentTo: [],
    body: {
      size: 1355,
      thirdPartyDependencies: ["@sinclair/typebox"],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/index.ts": {
    id: "src/apps/bulk/users/schema/users/index.ts",
    adjacentTo: [
      "src/apps/bulk/users/schema/users/get_users.schema.ts",
      "src/apps/bulk/users/schema/users/delete_users.schema.ts",
      "src/apps/bulk/users/schema/users/get_users_by_email.schema.ts",
      "src/apps/bulk/users/schema/users/patch_users.schema.ts",
      "src/apps/bulk/users/schema/users/post_users.schema.ts",
    ],
    body: {
      size: 305,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/get_users.schema.ts": {
    id: "src/apps/bulk/users/schema/users/get_users.schema.ts",
    adjacentTo: ["src/apps/bulk/users/DTO/user.dto.ts"],
    body: {
      size: 344,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/delete_users.schema.ts": {
    id: "src/apps/bulk/users/schema/users/delete_users.schema.ts",
    adjacentTo: ["src/apps/bulk/users/DTO/user.dto.ts"],
    body: {
      size: 326,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/get_users_by_email.schema.ts": {
    id: "src/apps/bulk/users/schema/users/get_users_by_email.schema.ts",
    adjacentTo: ["src/apps/bulk/users/DTO/user.dto.ts"],
    body: {
      size: 380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/patch_users.schema.ts": {
    id: "src/apps/bulk/users/schema/users/patch_users.schema.ts",
    adjacentTo: ["src/apps/bulk/users/DTO/user.dto.ts"],
    body: {
      size: 424,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/schema/users/post_users.schema.ts": {
    id: "src/apps/bulk/users/schema/users/post_users.schema.ts",
    adjacentTo: ["src/apps/bulk/users/DTO/user.dto.ts"],
    body: {
      size: 384,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/users.repository.ts": {
    id: "src/apps/bulk/users/users.repository.ts",
    adjacentTo: [
      "prisma/bulk/client/index.js",
      "src/apps/bulk/users/DTO/user.dto.ts",
      "src/apps/bulk/users/permission.ts",
      "src/apps/bulk/users/user.ts",
    ],
    body: {
      size: 5354,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
        "@effect-ts/system/Utils",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/permission.ts": {
    id: "src/apps/bulk/users/permission.ts",
    adjacentTo: ["src/apps/bulk/users/role.ts"],
    body: {
      size: 775,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/role.ts": {
    id: "src/apps/bulk/users/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/bulk/users/user.ts": {
    id: "src/apps/bulk/users/user.ts",
    adjacentTo: [
      "src/apps/bulk/users/permission.ts",
      "src/apps/bulk/users/role.ts",
    ],
    body: {
      size: 254,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/index.ts": {
    id: "src/apps/logistic/index.ts",
    adjacentTo: ["src/apps/logistic/entrypoint.ts"],
    body: {
      size: 53,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/entrypoint.ts": {
    id: "src/apps/logistic/entrypoint.ts",
    adjacentTo: [
      "prisma/logistic/client/index.js",
      "src/lib/health_check.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/apps/aware_application.ts",
      "src/apps/logistic/core/backoffice.service.ts",
      "src/apps/logistic/core/product/product.use_cases.ts",
      "src/apps/logistic/core/stock/stock.use_cases.ts",
      "src/apps/logistic/core/warehouse/warehouse.use_cases.ts",
      "src/apps/logistic/primary_adapters/http/product/product.controller.ts",
      "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts",
      "src/apps/logistic/primary_adapters/http/user/users.controller.ts",
      "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts",
      "src/apps/logistic/secondary_adapters/product/product.repository.ts",
      "src/apps/logistic/secondary_adapters/stock/stock.repository.ts",
      "src/apps/logistic/secondary_adapters/user/user.service.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts",
    ],
    body: {
      size: 4924,
      thirdPartyDependencies: [
        "@aware/azure-identity",
        "@aware/effect",
        "@aware/knex",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Effect/Ref",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/backoffice.service.ts": {
    id: "src/apps/logistic/core/backoffice.service.ts",
    adjacentTo: ["src/apps/logistic/secondary_adapters/user/user.service.ts"],
    body: {
      size: 2336,
      thirdPartyDependencies: [
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user.service.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user.service.ts",
    adjacentTo: [
      "prisma/logistic/client/index.js",
      "src/apps/logistic/secondary_adapters/user/permission.ts",
      "src/apps/logistic/secondary_adapters/user/user.ts",
      "src/apps/logistic/secondary_adapters/user/user_creation.ts",
      "src/apps/logistic/secondary_adapters/user/user_update.ts",
    ],
    body: {
      size: 7177,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Case",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/permission.ts": {
    id: "src/apps/logistic/secondary_adapters/user/permission.ts",
    adjacentTo: ["src/apps/logistic/secondary_adapters/user/role.ts"],
    body: {
      size: 779,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/role.ts": {
    id: "src/apps/logistic/secondary_adapters/user/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user.ts",
    adjacentTo: [
      "src/apps/logistic/secondary_adapters/user/permission.ts",
      "src/apps/logistic/secondary_adapters/user/role.ts",
    ],
    body: {
      size: 254,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user_creation.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user_creation.ts",
    adjacentTo: [],
    body: {
      size: 140,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/user/user_update.ts": {
    id: "src/apps/logistic/secondary_adapters/user/user_update.ts",
    adjacentTo: [],
    body: {
      size: 135,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/product.use_cases.ts": {
    id: "src/apps/logistic/core/product/product.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/product/ports/primary.ts",
      "src/apps/logistic/core/product/ports/secondary.ts",
    ],
    body: {
      size: 699,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/ports/primary.ts": {
    id: "src/apps/logistic/core/product/ports/primary.ts",
    adjacentTo: ["src/apps/logistic/core/product/product.ts"],
    body: {
      size: 466,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Has",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/product.ts": {
    id: "src/apps/logistic/core/product/product.ts",
    adjacentTo: [],
    body: {
      size: 661,
      thirdPartyDependencies: ["@effect-ts/core/Case"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/product/ports/secondary.ts": {
    id: "src/apps/logistic/core/product/ports/secondary.ts",
    adjacentTo: ["src/apps/logistic/core/product/product.ts"],
    body: {
      size: 433,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Has",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/stock.use_cases.ts": {
    id: "src/apps/logistic/core/stock/stock.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/file.domain_service.ts",
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/ports/secondary.ts",
    ],
    body: {
      size: 1390,
      thirdPartyDependencies: [
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/file.domain_service.ts": {
    id: "src/apps/logistic/core/stock/file.domain_service.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 3014,
      thirdPartyDependencies: ["date-fns", "fast-csv"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/ports/primary.ts": {
    id: "src/apps/logistic/core/stock/ports/primary.ts",
    adjacentTo: [
      "src/apps/logistic/core/common/common.model.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 968,
      thirdPartyDependencies: ["@effect-ts/core/Effect", "@effect-ts/core/Has"],
      builtinDependencies: ["node:stream"],
    },
  },
  "src/apps/logistic/core/common/common.model.ts": {
    id: "src/apps/logistic/core/common/common.model.ts",
    adjacentTo: [],
    body: {
      size: 224,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/stock.ts": {
    id: "src/apps/logistic/core/stock/stock.ts",
    adjacentTo: [],
    body: {
      size: 1097,
      thirdPartyDependencies: ["@effect-ts/system/Case"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/stock/ports/secondary.ts": {
    id: "src/apps/logistic/core/stock/ports/secondary.ts",
    adjacentTo: [
      "src/apps/logistic/core/common/common.model.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 786,
      thirdPartyDependencies: ["@effect-ts/core/Effect", "@effect-ts/core/Has"],
      builtinDependencies: ["node:stream"],
    },
  },
  "src/apps/logistic/core/warehouse/warehouse.use_cases.ts": {
    id: "src/apps/logistic/core/warehouse/warehouse.use_cases.ts",
    adjacentTo: [
      "src/apps/logistic/core/warehouse/ports/primary.ts",
      "src/apps/logistic/core/warehouse/ports/secondary.ts",
    ],
    body: {
      size: 747,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/ports/primary.ts": {
    id: "src/apps/logistic/core/warehouse/ports/primary.ts",
    adjacentTo: ["src/apps/logistic/core/warehouse/warehouse.ts"],
    body: {
      size: 548,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Has",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/warehouse.ts": {
    id: "src/apps/logistic/core/warehouse/warehouse.ts",
    adjacentTo: [],
    body: {
      size: 592,
      thirdPartyDependencies: ["@effect-ts/core/Case"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/core/warehouse/ports/secondary.ts": {
    id: "src/apps/logistic/core/warehouse/ports/secondary.ts",
    adjacentTo: ["src/apps/logistic/core/warehouse/warehouse.ts"],
    body: {
      size: 523,
      thirdPartyDependencies: [
        "@effect-ts/core/Effect",
        "@effect-ts/core/Has",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/product/product.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/product/product.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/product/ports/primary.ts",
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/primary_adapters/http/product/schema/index.ts",
    ],
    body: {
      size: 3409,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/product/schema/index.ts": {
    id: "src/apps/logistic/primary_adapters/http/product/schema/index.ts",
    adjacentTo: [
      "src/apps/logistic/primary_adapters/http/product/schema/get_products.ts",
      "src/apps/logistic/primary_adapters/http/product/schema/get_product.ts",
    ],
    body: {
      size: 106,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/product/schema/get_products.ts": {
    id: "src/apps/logistic/primary_adapters/http/product/schema/get_products.ts",
    adjacentTo: [],
    body: {
      size: 244,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/product/schema/get_product.ts": {
    id: "src/apps/logistic/primary_adapters/http/product/schema/get_product.ts",
    adjacentTo: [],
    body: {
      size: 251,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/stock/stocks.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/stock/ports/primary.ts",
      "src/apps/logistic/core/stock/stock.ts",
      "src/apps/logistic/primary_adapters/http/stock/schema/index.ts",
    ],
    body: {
      size: 6499,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/stock/schema/index.ts": {
    id: "src/apps/logistic/primary_adapters/http/stock/schema/index.ts",
    adjacentTo: [
      "src/apps/logistic/primary_adapters/http/stock/schema/get_stocks.ts",
      "src/apps/logistic/primary_adapters/http/stock/schema/export_stocks.ts",
    ],
    body: {
      size: 106,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/stock/schema/get_stocks.ts": {
    id: "src/apps/logistic/primary_adapters/http/stock/schema/get_stocks.ts",
    adjacentTo: [],
    body: {
      size: 238,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/stock/schema/export_stocks.ts": {
    id: "src/apps/logistic/primary_adapters/http/stock/schema/export_stocks.ts",
    adjacentTo: [],
    body: {
      size: 255,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/user/users.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/user/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/secondary_adapters/user/user.service.ts",
      "src/apps/logistic/secondary_adapters/user/user_creation.ts",
      "src/apps/logistic/secondary_adapters/user/user_update.ts",
      "src/apps/logistic/primary_adapters/http/user/schema/users/index.ts",
    ],
    body: {
      size: 4924,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/user/schema/users/index.ts": {
    id: "src/apps/logistic/primary_adapters/http/user/schema/users/index.ts",
    adjacentTo: [
      "src/apps/logistic/primary_adapters/http/user/schema/users/get_users.schema.ts",
      "src/apps/logistic/primary_adapters/http/user/schema/users/delete_users.schema.ts",
      "src/apps/logistic/primary_adapters/http/user/schema/users/get_users_by_email.schema.ts",
      "src/apps/logistic/primary_adapters/http/user/schema/users/patch_users.schema.ts",
      "src/apps/logistic/primary_adapters/http/user/schema/users/post_users.schema.ts",
    ],
    body: {
      size: 305,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/user/schema/users/get_users.schema.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/user/schema/users/get_users.schema.ts",
      adjacentTo: [
        "src/apps/logistic/primary_adapters/http/user/DTO/user.dto.ts",
      ],
      body: {
        size: 504,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/user/DTO/user.dto.ts": {
    id: "src/apps/logistic/primary_adapters/http/user/DTO/user.dto.ts",
    adjacentTo: [],
    body: {
      size: 777,
      thirdPartyDependencies: ["@sinclair/typebox"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/user/schema/users/delete_users.schema.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/user/schema/users/delete_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 240,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/user/schema/users/get_users_by_email.schema.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/user/schema/users/get_users_by_email.schema.ts",
      adjacentTo: [],
      body: {
        size: 244,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/user/schema/users/patch_users.schema.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/user/schema/users/patch_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 239,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/user/schema/users/post_users.schema.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/user/schema/users/post_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 238,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts": {
    id: "src/apps/logistic/primary_adapters/http/warehouse/warehouse.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/logistic/core/warehouse/ports/primary.ts",
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/primary_adapters/http/warehouse/schema/index.ts",
    ],
    body: {
      size: 4285,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/warehouse/schema/index.ts": {
    id: "src/apps/logistic/primary_adapters/http/warehouse/schema/index.ts",
    adjacentTo: [
      "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouses.ts",
      "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouse.ts",
    ],
    body: {
      size: 114,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouses.ts":
    {
      id: "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouses.ts",
      adjacentTo: [],
      body: {
        size: 250,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouse.ts": {
    id: "src/apps/logistic/primary_adapters/http/warehouse/schema/get_warehouse.ts",
    adjacentTo: [],
    body: {
      size: 257,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.repository.ts",
    adjacentTo: [
      "src/apps/logistic/core/product/ports/secondary.ts",
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/secondary_adapters/product/product.acl.ts",
    ],
    body: {
      size: 2136,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/knex",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.acl.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.acl.ts",
    adjacentTo: [
      "src/apps/logistic/core/product/product.ts",
      "src/apps/logistic/secondary_adapters/product/product.model.ts",
    ],
    body: {
      size: 854,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/product/product.model.ts": {
    id: "src/apps/logistic/secondary_adapters/product/product.model.ts",
    adjacentTo: [],
    body: {
      size: 442,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.repository.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/ports/secondary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 7974,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/knex",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "date-fns",
        "ts-pattern",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.repository.ts",
    adjacentTo: [
      "src/apps/logistic/core/warehouse/ports/secondary.ts",
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    ],
    body: {
      size: 2984,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/knex",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.acl.ts",
    adjacentTo: [
      "src/apps/logistic/core/warehouse/warehouse.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    ],
    body: {
      size: 472,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts": {
    id: "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    adjacentTo: [],
    body: {
      size: 184,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/index.ts": {
    id: "src/apps/store_insights/index.ts",
    adjacentTo: ["src/apps/store_insights/entrypoint.ts"],
    body: {
      size: 58,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/entrypoint.ts": {
    id: "src/apps/store_insights/entrypoint.ts",
    adjacentTo: [
      "prisma/store_insights/client/index.js",
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/lib/health_check.ts",
      "src/lib/passport_azure_ad/index.ts",
      "src/lib/passport_azure_ad/settings.ts",
      "src/lib/secrets.ts",
      "src/apps/aware_application.ts",
      "src/apps/store_insights/application/controllers/store_insights.controller.ts",
      "src/apps/store_insights/application/controllers/users.controller.ts",
      "src/apps/store_insights/domain/backoffice.service.ts",
      "src/apps/store_insights/domain/store_insights.service.ts",
      "src/apps/store_insights/infrastructure/user.service.ts",
    ],
    body: {
      size: 5828,
      thirdPartyDependencies: [
        "@aware/azure-arm",
        "@aware/azure-b2c",
        "@aware/azure-identity",
        "@aware/azure-keyvault",
        "@aware/azure-storage",
        "@aware/effect",
        "@aware/prisma",
        "@azure/msal-node",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Effect/Ref",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/store_insights.controller.ts":
    {
      id: "src/apps/store_insights/application/controllers/store_insights.controller.ts",
      adjacentTo: [
        "src/lib/fastify_azure_ad_b2c/index.ts",
        "src/swagger/settings.ts",
        "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
        "src/apps/store_insights/domain/store_insights.service.ts",
        "src/apps/store_insights/application/controllers/schema/store_insights/index.ts",
      ],
      body: {
        size: 4420,
        thirdPartyDependencies: [
          "@aware/fastify",
          "@effect-ts/core",
          "@effect-ts/core/Effect",
          "@effect-ts/core/Option",
        ],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/domain/store_insights.service.ts": {
    id: "src/apps/store_insights/domain/store_insights.service.ts",
    adjacentTo: [],
    body: {
      size: 4755,
      thirdPartyDependencies: [
        "@aware/azure-storage",
        "@aware/effect",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Has",
        "date-fns",
      ],
      builtinDependencies: ["node:crypto", "node:path"],
    },
  },
  "src/apps/store_insights/application/controllers/schema/store_insights/index.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/store_insights/index.ts",
      adjacentTo: [
        "src/apps/store_insights/application/controllers/schema/store_insights/get_store_insights.schema.ts",
        "src/apps/store_insights/application/controllers/schema/store_insights/list_store_insights.schema.ts",
      ],
      body: {
        size: 148,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/schema/store_insights/get_store_insights.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/store_insights/get_store_insights.schema.ts",
      adjacentTo: [],
      body: {
        size: 295,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/schema/store_insights/list_store_insights.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/store_insights/list_store_insights.schema.ts",
      adjacentTo: [],
      body: {
        size: 287,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/users.controller.ts": {
    id: "src/apps/store_insights/application/controllers/users.controller.ts",
    adjacentTo: [
      "src/lib/fastify_azure_ad_b2c/index.ts",
      "src/swagger/settings.ts",
      "src/apps/aware_insights/bounded_contexts/customer_billing/customer_action.middleware.ts",
      "src/apps/store_insights/infrastructure/user.service.ts",
      "src/apps/store_insights/infrastructure/user_creation.ts",
      "src/apps/store_insights/infrastructure/user_update.ts",
      "src/apps/store_insights/application/controllers/schema/users/index.ts",
    ],
    body: {
      size: 5025,
      thirdPartyDependencies: [
        "@aware/fastify",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Option",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user.service.ts": {
    id: "src/apps/store_insights/infrastructure/user.service.ts",
    adjacentTo: [
      "prisma/store_insights/client/index.js",
      "src/apps/store_insights/infrastructure/permission.ts",
      "src/apps/store_insights/infrastructure/user.ts",
      "src/apps/store_insights/infrastructure/user_creation.ts",
      "src/apps/store_insights/infrastructure/user_update.ts",
    ],
    body: {
      size: 7096,
      thirdPartyDependencies: [
        "@aware/effect",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Case",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/core/Option",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/permission.ts": {
    id: "src/apps/store_insights/infrastructure/permission.ts",
    adjacentTo: ["src/apps/store_insights/infrastructure/role.ts"],
    body: {
      size: 785,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/role.ts": {
    id: "src/apps/store_insights/infrastructure/role.ts",
    adjacentTo: [],
    body: {
      size: 196,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user.ts": {
    id: "src/apps/store_insights/infrastructure/user.ts",
    adjacentTo: [
      "src/apps/store_insights/infrastructure/permission.ts",
      "src/apps/store_insights/infrastructure/role.ts",
    ],
    body: {
      size: 254,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_creation.ts": {
    id: "src/apps/store_insights/infrastructure/user_creation.ts",
    adjacentTo: [],
    body: {
      size: 140,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_update.ts": {
    id: "src/apps/store_insights/infrastructure/user_update.ts",
    adjacentTo: [],
    body: {
      size: 135,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/schema/users/index.ts": {
    id: "src/apps/store_insights/application/controllers/schema/users/index.ts",
    adjacentTo: [
      "src/apps/store_insights/application/controllers/schema/users/get_users.schema.ts",
      "src/apps/store_insights/application/controllers/schema/users/delete_users.schema.ts",
      "src/apps/store_insights/application/controllers/schema/users/get_users_by_email.schema.ts",
      "src/apps/store_insights/application/controllers/schema/users/patch_users.schema.ts",
      "src/apps/store_insights/application/controllers/schema/users/post_users.schema.ts",
    ],
    body: {
      size: 305,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/schema/users/get_users.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/users/get_users.schema.ts",
      adjacentTo: [
        "src/apps/store_insights/application/controllers/DTO/user.dto.ts",
      ],
      body: {
        size: 380,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/DTO/user.dto.ts": {
    id: "src/apps/store_insights/application/controllers/DTO/user.dto.ts",
    adjacentTo: [],
    body: {
      size: 795,
      thirdPartyDependencies: ["@sinclair/typebox"],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/application/controllers/schema/users/delete_users.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/users/delete_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 261,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/schema/users/get_users_by_email.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/users/get_users_by_email.schema.ts",
      adjacentTo: [],
      body: {
        size: 265,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/schema/users/patch_users.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/users/patch_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 260,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/application/controllers/schema/users/post_users.schema.ts":
    {
      id: "src/apps/store_insights/application/controllers/schema/users/post_users.schema.ts",
      adjacentTo: [],
      body: {
        size: 259,
        thirdPartyDependencies: [],
        builtinDependencies: [],
      },
    },
  "src/apps/store_insights/domain/backoffice.service.ts": {
    id: "src/apps/store_insights/domain/backoffice.service.ts",
    adjacentTo: ["src/apps/store_insights/infrastructure/user.service.ts"],
    body: {
      size: 2339,
      thirdPartyDependencies: [
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "@effect-ts/system/Case",
        "@effect-ts/system/Has",
      ],
      builtinDependencies: [],
    },
  },
  "src/server.ts": {
    id: "src/server.ts",
    adjacentTo: [
      "src/apps/aware_application.ts",
      "src/lib/secrets.ts",
      "src/server/http_server.ts",
    ],
    body: {
      size: 1676,
      thirdPartyDependencies: [
        "dotenv/config",
        "@aware/fastify",
        "@aware/fastify-passport",
        "@aware/fastify-secure-session",
        "@effect-ts/core/Effect",
        "@fastify/static",
      ],
      builtinDependencies: ["path"],
    },
  },
  "src/setupTests.js": {
    id: "src/setupTests.js",
    adjacentTo: [],
    body: {
      size: 26,
      thirdPartyDependencies: ["dotenv/config"],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.model.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.model.ts",
    adjacentTo: [],
    body: {
      size: 847,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/logistic/secondary_adapters/stock/stock.fake.repository.ts": {
    id: "src/apps/logistic/secondary_adapters/stock/stock.fake.repository.ts",
    adjacentTo: [
      "src/apps/logistic/core/stock/ports/secondary.ts",
      "src/apps/logistic/core/stock/stock.ts",
    ],
    body: {
      size: 5447,
      thirdPartyDependencies: [
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/core/Effect/Layer",
        "date-fns",
      ],
      builtinDependencies: ["stream"],
    },
  },
  "src/apps/logistic/logistic.knex.ts": {
    id: "src/apps/logistic/logistic.knex.ts",
    adjacentTo: [
      "src/apps/logistic/secondary_adapters/product/product.model.ts",
      "src/apps/logistic/secondary_adapters/stock/stock.model.ts",
      "src/apps/logistic/secondary_adapters/warehouse/warehouse.model.ts",
    ],
    body: {
      size: 517,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/apps/store_insights/infrastructure/user_verification.service.ts": {
    id: "src/apps/store_insights/infrastructure/user_verification.service.ts",
    adjacentTo: [],
    body: {
      size: 0,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/db_migrate.ts": {
    id: "src/db_migrate.ts",
    adjacentTo: [],
    body: {
      size: 943,
      thirdPartyDependencies: [
        "@aware/azure-identity",
        "@aware/effect",
        "@aware/prisma",
        "@effect-ts/core",
        "@effect-ts/core/Effect",
        "@effect-ts/node/Runtime",
        "dotenv/config",
      ],
      builtinDependencies: [],
    },
  },
};

export const graphDataWithCycles = {
  "src/server/errors.ts": {
    id: "src/server/errors.ts",
    adjacentTo: ["src/server/settings.ts"],
    body: {
      size: 191,
      thirdPartyDependencies: ["@effect-ts/core"],
      builtinDependencies: ["node:fs"],
    },
  },
  "src/server/settings.ts": {
    id: "src/server/settings.ts",
    adjacentTo: ["src/lib/fastify/index.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: ["dotenv"],
      builtinDependencies: [],
    },
  },
  "src/lib/fastify/index.ts": {
    id: "src/lib/fastify/index.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/index.ts": {
    id: "src/index.ts",
    adjacentTo: ["src/server/errors.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/main.ts": {
    id: "src/main.ts",
    adjacentTo: ["src/entrypoint.ts"],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
  "src/entrypoint.ts": {
    id: "src/entrypoint.ts",
    adjacentTo: [],
    body: {
      size: 1380,
      thirdPartyDependencies: [],
      builtinDependencies: [],
    },
  },
};

export const fakeCyclesData = [
  [
    "src/server/settings.ts",
    "src/lib/fastify/index.ts",
    "src/server/errors.ts",
  ],
];

export const fakeSkottData: SkottStructureWithCycles = {
  cycles: [],
  entrypoint: "src/lib/fastify/index.ts",
  files: Object.keys(graphDataWithCycles),
  graph: {
    ...graphDataWithCycles,
  },
};
