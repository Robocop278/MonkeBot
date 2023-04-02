"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util = require("./util");
async () => {
    const constantants = await util.readJsonPromise('../config.jsonc');
    const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
    client.once(discord_js_1.Events.ClientReady, (c) => {
        var _a;
        console.log(`Ready! Logged in as ${(_a = c.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    });
    client.login(constantants.PRIVATE_KEY);
};
//# sourceMappingURL=bot.js.map