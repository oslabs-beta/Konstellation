const production = {
  // url: `http://${process.env.DOMAIN}:${process.env.PORT}`, //For testing purposes only
  url: `http://${process.env.DOMAIN}:${process.env.PORT}`,
};

const development = {
  url: `http://${process.env.DOMAIN}:${process.env.PORT}`,
};

export const config = (() => {
  if (process.env.NODE_ENV === 'production') {
    return production;
  } else {
    return development;
  }
})();
