import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "ionic-base",
    webDir: "build",
    bundledWebRuntime: false,
    server: {
        url: "http://localhost:3003",
    },
}

export default config
