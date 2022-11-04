

const production = {
  url: `http://${process.env.BASE_URL_PROD}:${process.env.PORT_PROD}`
}

const development = {
  url: `http://${process.env.BASE_URL_DEV}:${process.env.PORT_DEV}`
}

export const config = (() => {
  console.log("CONFIG SEES ENV AS: " + process.env.NODE_ENV)
  if (process.env.NODE_ENV === "production") {
    return production;
  }
  else {
    return development;
  }
})();
