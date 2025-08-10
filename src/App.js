import React, { useState } from "react";

export default function App() {
  const defaultPlayers = [
    { id: 1, name: "Michele D. 🧪", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 2, name: "Steven 🤡", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 3, name: "Giacomo 😴", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 4, name: "Michele N. 💰", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 5, name: "Guardiano 🔵⚪", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 6, name: "Filippo Culo 🤡", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 7, name: "Giorgia 👗", image: null, guessed: 0, attempted: 0, score: 0 },
    { id: 8, name: "Veronica 💅", image: null, guessed: 0, attempted: 0, score: 0 },
  ];

  const [players, setPlayers] = useState(defaultPlayers);
  const [showOptions, setShowOptions] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("");

  function updateScore(playerId, guessedIncrement, scoreIncrement) {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const newScore = Math.max(0, p.score + scoreIncrement);
          return {
            ...p,
            guessed: p.guessed + guessedIncrement,
            attempted: p.attempted + 1,
            score: newScore,
          };
        }
        return p;
      })
    );
    setShowOptions(null);
  }

  function markNotGuessed(playerId) {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, attempted: p.attempted + 1, score: Math.max(0, p.score - 0.25) }
          : p
      )
    );
  }

  function resetPlayer(playerId) {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId ? { ...p, guessed: 0, attempted: 0, score: 0 } : p
      )
    );
  }

  function addPlayer() {
    if (newPlayerName.trim() === "") return;
    const newId = players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1;
    setPlayers([
      ...players,
      { id: newId, name: newPlayerName.trim(), image: null, guessed: 0, attempted: 0, score: 0 },
    ]);
    setNewPlayerName("");
  }

  function removePlayer(playerId) {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    if (showOptions === playerId) setShowOptions(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white p-4 font-mono">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-pink-500 drop-shadow-lg">
        Sarabanda Ferragosto — Punteggi
      </h1>

      {/* Aggiungi giocatore */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto px-2">
        <input
          type="text"
          placeholder="Nome nuovo giocatore"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="px-3 py-2 rounded border border-purple-600 bg-black text-white focus:outline-none focus:border-pink-500 w-full sm:w-auto flex-grow"
        />
        <button
          onClick={addPlayer}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded shadow-lg transition-all w-full sm:w-auto"
        >
          Aggiungi giocatore
        </button>
      </div>

      <div className="grid gap-5 max-w-4xl mx-auto">
        {players.map((p) => (
          <div
            key={p.id}
            className="bg-black/70 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-lg border border-purple-600 transition-transform transform hover:scale-[1.02] hover:shadow-pink-500/50"
          >
            <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-0 flex-wrap sm:flex-nowrap">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400 border border-pink-500/40 shrink-0">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <span>Img</span>
                )}
              </div>
              <input
                value={p.name}
                onChange={(e) =>
                  setPlayers((prev) =>
                    prev.map((pl) => (pl.id === p.id ? { ...pl, name: e.target.value } : pl))
                  )
                }
                className="bg-transparent border-b border-purple-400 focus:outline-none text-lg text-white min-w-[140px] flex-grow"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-wrap justify-end">
              <div className="px-4 py-2 bg-purple-800/60 rounded-lg border border-purple-500 text-center min-w-[100px] shrink-0">
                <div className="text-sm text-gray-300">Punteggio</div>
                <div className="text-xl font-bold text-pink-400">{p.score.toFixed(2)}</div>
              </div>
              <div className="text-lg shrink-0 min-w-[140px]">
                {p.guessed} indovinate su {p.attempted} tentate
              </div>
              {showOptions === p.id ? (
                <div className="flex gap-2 flex-wrap justify-center animate-fadeIn">
                  <button
                    onClick={() => updateScore(p.id, 1, 2)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded shadow-lg hover:shadow-green-400/50 transition-all"
                  >
                    Canzone + Album (+2)
                  </button>
                  <button
                    onClick={() => updateScore(p.id, 1, 1)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded shadow-lg hover:shadow-blue-400/50 transition-all"
                  >
                    Canzone (+1)
                  </button>
                  <button
                    onClick={() => updateScore(p.id, 0, 0.5)}
                    className="px-3 py-2 bg-yellow-600 hover:bg-yellow-500 rounded shadow-lg hover:shadow-yellow-400/50 transition-all"
                  >
                    Album (+0.5)
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setShowOptions(p.id)}
                    className="px-3 py-2 bg-pink-600 hover:bg-pink-500 rounded shadow-lg hover:shadow-pink-400/50 transition-all"
                  >
                    Canzone indovinata
                  </button>
                  <button
                    onClick={() => markNotGuessed(p.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded shadow-lg hover:shadow-red-400/50 transition-all"
                  >
                    Canzone non indovinata
                  </button>
                </div>
              )}
              <button
                onClick={() => resetPlayer(p.id)}
                className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm shadow-lg hover:shadow-gray-400/50 transition-all shrink-0"
              >
                Reset
              </button>
              <button
                onClick={() => removePlayer(p.id)}
                className="px-3 py-2 bg-red-700 hover:bg-red-600 rounded text-sm shadow-lg hover:shadow-red-500/50 transition-all shrink-0"
              >
                Rimuovi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
