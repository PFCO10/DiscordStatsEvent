import express from 'express';
import dotenv from 'dotenv';
import memberBot from './memberBot.js';
import messageBot from './messageBot.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let serverStats = {
  memberCount: 0,
  onlineCount: 0,
  messageCount: {
    today: 0,
    week: 0,
  },
  topMembers: []
};

memberBot.init((memberData) => {
  serverStats.memberCount = memberData.total;
  serverStats.onlineCount = memberData.online;
});

messageBot.init((msgData) => {
  serverStats.messageCount = msgData.counts;
  serverStats.topMembers = msgData.topMembers;
});

app.get('/api/discord-server-info', (req, res) => {
  res.json(serverStats);
});
app.get('/', (req, res) => {
  res.send('API de estadísticas de Discord funcionando 🚀');
});
app.get('/api/stats', (req, res) => {
  res.json({
    messageCount: serverStats.messageCount,
    topMembers: serverStats.topMembers
  });
});

app.get('/api/members', (req, res) => {
  res.json({
    memberCount: serverStats.memberCount,
    onlineCount: serverStats.onlineCount
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
