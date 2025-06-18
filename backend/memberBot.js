import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

function init(onUpdate) {
  client.once('ready', async () => {
    console.log('Member Bot listo');
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    await guild.members.fetch();

    const total = guild.memberCount;
    const online = guild.members.cache.filter(m => m.presence?.status === 'online').size;

    onUpdate({ total, online });
  });

  client.login(process.env.MEMBER_BOT_TOKEN);
}

export default { init };
