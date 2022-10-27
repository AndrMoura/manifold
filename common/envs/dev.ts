import { EnvConfig, PROD_CONFIG } from './prod'

// export const DEV_CONFIG: EnvConfig = {
//   ...PROD_CONFIG,
//   domain: 'dev.manifold.markets',
//   firebaseConfig: {
//     apiKey: 'AIzaSyBoq3rzUa8Ekyo3ZaTnlycQYPRCA26VpOw',
//     authDomain: 'dev-mantic-markets.firebaseapp.com',
//     projectId: 'dev-mantic-markets',
//     region: 'us-central1',
//     storageBucket: 'dev-mantic-markets.appspot.com',
//     messagingSenderId: '134303100058',
//     appId: '1:134303100058:web:27f9ea8b83347251f80323',
//     measurementId: 'G-YJC9E37P37',
//   },
//   cloudRunId: 'w3txbmd3ba',
//   cloudRunRegion: 'uc',
//   amplitudeApiKey: 'fd8cbfd964b9a205b8678a39faae71b3',
//   twitchBotEndpoint: 'https://dev-twitch-bot.manifold.markets',
//   sprigEnvironmentId: 'Tu7kRZPm7daP',
// }

export const DEV_CONFIG: EnvConfig = {
  ...PROD_CONFIG,
  domain: 'fir-c43a4.web.app',
  firebaseConfig: {
    apiKey: 'AIzaSyBouJalPXghPEkvW-LP5AwGIFDnACett0s',
    authDomain: 'fir-c43a4.firebaseapp.com',
    projectId: 'fir-c43a4',
    storageBucket: 'fir-c43a4.appspot.com',
    messagingSenderId: '474823447934',
    appId: '1:474823447934:web:494ea218d0a846eb210f2f',
    measurementId: 'G-SB3ZQ6L4LE',
  },
  cloudRunId: 'w3txbmd3ba',
  cloudRunRegion: 'uc',
  amplitudeApiKey: 'fd8cbfd964b9a205b8678a39faae71b3',
  twitchBotEndpoint: 'https://dev-twitch-bot.manifold.markets',
  sprigEnvironmentId: 'Tu7kRZPm7daP',
}
