import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo repositório ${Date.now()}`,
      "url": "http://github.com/...",
      "techs": ["Node.js", "ReactJS"]
    })

    const newRepository = response.data

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    const deletedIndex = repositories.findIndex(repository => id === repository.id)

    repositories.splice(deletedIndex, 1)

    setRepositories(repositories.filter(repository => (
      repository.id !== id
    )));
  }

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, []);

  console.log(repositories)

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
