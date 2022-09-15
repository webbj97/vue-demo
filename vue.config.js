const path = require("path");

function resolve(targetPath) {
    return path.resolve(__dirname, targetPath);
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
            },
        },
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             data: `
    //         @import "~@/style/variables.scss";
    //         @import "~@/style/mixin.scss";
    //     `,
    //         },
    //     },
    // },
};
