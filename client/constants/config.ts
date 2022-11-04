import { env } from '../../lib/env'

const production = {
  url: `http://${process.env.BASE_URL_PROD}:${process.env.PORT_PROD}`
}

const development = {
  url: `http://${process.env.BASE_URL_DEV}:${process.env.PORT_DEV}`
}

export const config = (() => {
  if (process.env.NODE_ENV === "production") {
    return production;
  }
  else {
    return development;
  }
})();
