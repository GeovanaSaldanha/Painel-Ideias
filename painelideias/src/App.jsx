import { useState } from 'react';
import './App.css';

export default function App() {
  const [ideias, setIdeias] = useState([
    { id: 1, texto: 'Site de portfolio com React', concluida: true },
    { id: 2, texto: 'App de lista de tarefas para o curso técnico', concluida: false },
    { id: 3, texto: 'Jogo da velha para jogar com meu irmão', concluida: false },
  ]);

  const [novaIdeia, setNovaIdeia] = useState('');

  // Função que envia o formulário (onSubmit + preventDefault)[cite: 2]
  function handleAdicionarIdeia(e) {
    e.preventDefault();
    if (!novaIdeia.trim()) return;

    const itemNovo = {
      id: Date.now(),
      texto: novaIdeia,
      concluida: false,
    };

    setIdeias([...ideias, itemNovo]);
    setNovaIdeia('');
  }

  // Alterna o estado de conclusão da ideia através do checkbox[cite: 2]
  function handleToggleConcluida(id) {
    setIdeias(
      ideias.map((ideia) =>
        ideia.id === id ? { ...ideia, concluida: !ideia.concluida } : ideia
      )
    );
  }

  // Remove a ideia da lista utilizando métodos de array (.filter)[cite: 16]
  function handleRemoverIdeia(id) {
    setIdeias(ideias.filter((ideia) => ideia.id !== id));
  }

  const totalIdeias = ideias.length;
  const totalConcluidas = ideias.filter((ideia) => ideia.concluida).length;

  return (
    <div className="painel-container">
      <h1>Painel de Ideias!</h1>
      <p className="subtitulo">Suas ideias de projeto, guardadas antes que fujam da mente.</p>

      {/* Input controlado (value + onChange juntos)[cite: 2] */}
      <form onSubmit={handleAdicionarIdeia} className="form-ideia">
        <input
          type="text"
          placeholder="Ex: app de receitas para o TCC"
          value={novaIdeia}
          onChange={(e) => setNovaIdeia(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="lista-ideias">
        {ideias.map((ideia) => (
          <li key={ideia.id} className="item-ideia">
            <label className="label-ideia">
              {/* Checkbox que marca a ideia como concluída (texto riscado)[cite: 2] */}
              <input
                type="checkbox"
                checked={ideia.concluida}
                onChange={() => handleToggleConcluida(ideia.id)}
              />
              <span className={ideia.concluida ? 'texto-concluido' : 'texto-normal'}>
                {ideia.texto}
              </span>
            </label>

            {/* Botão X que remove a ideia da lista[cite: 2] */}
            <button 
              type="button" 
              onClick={() => handleRemoverIdeia(ideia.id)}
              className="btn-remover"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Contador em tempo real: total de ideias e concluídas[cite: 2] */}
      <div className="contador">
        <p>
          {totalIdeias} ideia{totalIdeias === 1 ? '' : 's'} no painel • {totalConcluidas} concluída{totalConcluidas === 1 ? '' : 's'}[cite: 2]
        </p>
      </div>
    </div>
  );
}