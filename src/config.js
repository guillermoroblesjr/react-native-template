

export const DEBUG = __DEV__;
export const DEV = __DEV__;
// export const ENV = __DEV__ ? `dev` : `prod`
// export const configPath = `../config/${ENV}.js`
// export default require('../config/' + __DEV__ ? `dev` : `prod` + '.js').default
// export default require('../config/dev').default

export default {
  get: () => {
    return require('../config/dev').default
  }
}