const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    // ...
    webpack: {
        alias: {
            "@pages": resolvePath("./src/pages"),
            "@components": resolvePath("./src/components"),
            "@ui": resolvePath("./src/components/ui"),
            "@ui-pages": resolvePath("./src/components/ui/pages"),
            "@utils-types": resolvePath("./src/utils/types"),
            "@api": resolvePath("./src/utils/burger-api.ts"),
            "@slices": resolvePath("./src/services/slices"),
            "@selectors": resolvePath("./src/services/selectors")
        }
    },
  // ...
}