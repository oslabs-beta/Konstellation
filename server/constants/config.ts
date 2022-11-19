const production = {
  proxyUrl: `http://${process.env.PROXY_DOMAIN}:${process.env.PROXY_URL}`,
  serverUrl: `http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`,
};

const development = {
  proxyUrl: `http://${process.env.PROXY_DOMAIN}:${process.env.PROXY_URL}`,
  serverUrl: `http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`,
};

export const config = (() => {
  if (process.env.NODE_ENV === 'production') {
    return production;
  } else {
    return development;
  }
})();
