
import getConfig from 'next/config'

let config = {}
if (getConfig()) {
    const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

    config = {
        api_server: publicRuntimeConfig.API_SERVER || serverRuntimeConfig.API_SERVER,

    }
}

export default config
