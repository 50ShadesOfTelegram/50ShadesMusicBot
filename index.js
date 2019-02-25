require("dotenv").config();
const Spotify = require("./spotify.js");
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const spotify = new Spotify();

bot.hears("botty", ctx => ctx.reply("Yes sir"));

/**
 * Auto-Listen for spotify URl's
 */
bot.hears(/^https:\/\/open\.spotify\.com\/track\/([a-z0-9]+)/i, ctx =>
  spotify.addMusicToPlaylist(ctx.match[1], ctx)
);

bot.launch();
