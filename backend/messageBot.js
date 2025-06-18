import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel]
});

const messageStats = {};
const messageCounts = { today: 0, week: 0 };

function init(onUpdate) {
  client.on('messageCreate', (msg) => {
    if (!msg.guild || msg.author.bot) return;

    const id = msg.author.id;
    messageStats[id] = (messageStats[id] || 0) + 1;
    messageCounts.today++;
    messageCounts.week++;

    const top = Object.entries(messageStats)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topMembers = top.map(({ id, count }) => {
      const user = msg.guild.members.cache.get(id)?.user;
      return {
        id,
        username: user?.username || "Desconocido",
        avatar: user?.displayAvatarURL(),
        messageCount: count
      };
    });

    onUpdate({ counts: messageCounts, topMembers });
  });

  client.login(process.env.MESSAGE_BOT_TOKEN);
}

export default { init };
