module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      // Will only be available on the server side
      API_SERVER: process.env.API_SERVER,

  },
  publicRuntimeConfig: {
      // Will be available on both server and client
      API_SERVER: process.env.API_SERVER,
  },
}
