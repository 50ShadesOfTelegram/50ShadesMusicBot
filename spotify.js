/**
 * Spotify module
 */
const SpotifyWebApi = require("spotify-web-api-node");
const readline = require("readline");

/**
 * Spotify Class Object
 */
module.exports = class Spotify {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: "https://spotify.com"
    });

    this.authenticate_API(this.spotifyApi);
  }
  /**
   * Add valid spotify url to playlist
   * @param {string} track
   */
  addMusicToPlaylist(track, ctx) {
    ctx.reply(`Adding ${track} to playlist...`);
    this.spotifyApi
      .addTracksToPlaylist(`${process.env.SPOTIFY_PLAYLIST}`, [
        `spotify:track:${track}`
      ])
      .then(
        function(data) {
          console.log("Added tracks to playlist!");
          ctx.reply(`Success!`);
        },
        function(err) {
          console.log("Something went wrong!", err);
          ctx.reply(`Uh Oh UwU`);
        }
      );
  }

  /**
   * Authenticate Spotify module
   * @param {SpotifyWebApi} spotifyApi
   */
  authenticate_API(spotifyApi) {
    //Obtaining Auth Code and access token
    var scopes = [
      "user-read-private",
      "user-read-email",
      "playlist-modify-private",
      "playlist-read-collaborative"
    ];
    var state = "auth";

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    console.log(authorizeURL);

    // Get auth code from input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter auth code: ", SPOTIFY_AUTH_CODE => {
      /**
       * Receive valid access token
       */
      spotifyApi.authorizationCodeGrant(SPOTIFY_AUTH_CODE).then(
        function(data) {
          spotifyApi.setAccessToken(data.body["access_token"]);
          spotifyApi.setRefreshToken(data.body["refresh_token"]);
          console.log("Successfully Authenticated!");
        },
        function(err) {
          console.log("Something went wrong!", err);
        }
      );
      rl.close();
    });
  }
};
