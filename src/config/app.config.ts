import * as packageJson from '.../../package.json'

export default () => ({
  /*
  |--------------------------------------------------------------------------
  | Application Meta Data
  |--------------------------------------------------------------------------
  |
  | This values are defined in the package.json.
  |
  */
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,

  /*
  |--------------------------------------------------------------------------
  | Application Port
  |--------------------------------------------------------------------------
  |
  | This value define on witch port the application is available. Default is
  | the standard port 8080
  |
  */

  port: parseInt(process.env.PORT, 10) || 3000,

  /*
  |--------------------------------------------------------------------------
  | Client URL
  |--------------------------------------------------------------------------
  |
  | This value defines the url to our web client.
  |
  */
  clientUrl: process.env.CLIENT_URL || 'http://localhost:8080/tournament',
})
