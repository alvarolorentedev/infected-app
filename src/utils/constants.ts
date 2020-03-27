import Constants from 'expo-constants'

let ENV = Constants.manifest.extra.prod

if(__DEV__)
    ENV = Constants.manifest.extra.dev

export default ENV