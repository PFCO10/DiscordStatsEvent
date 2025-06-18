import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://TU_BACKEND_RENDER_URL/api/discord-server-info")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Estadísticas del servidor</h1>
      <p>Miembros: {data.memberCount}</p>
      <p>En línea: {data.onlineCount}</p>
      <p>Mensajes hoy: {data.messageCount.today}</p>
      <h2>Top 5 miembros</h2>
      <ul>
        {data.topMembers.map(m => (
          <li key={m.id}>{m.username} - {m.messageCount} mensajes</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
