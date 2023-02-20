const { dependencies } = require("./package.json")

let documentsUrl = "documents@http://localhost:3002/remoteEntry.js"
if (process.env.NODE_ENV === "production") {
    documentsUrl = "documents@https://ionic-documents.vercel.app/remoteEntry.js"
}

module.exports = {
    name: "base",
    filename: "remoteEntry.js",
    exposes: {
        "./Bootstrap": "./src/bootstrap.tsx",
    },
    remotes: {
        documents: documentsUrl,
    },
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies["react"],
            eager: true,
        },
        "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
            eager: true,
        },
    },
}
