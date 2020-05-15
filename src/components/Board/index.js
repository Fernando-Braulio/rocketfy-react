import React, { useState } from 'react';
import { loadLists } from '../../services/api';
import BoardContext from './context';
import List from '../List';
import { Container } from './styles';

const data = loadLists();

const Board = () => {
  const [lists, setLists] = useState(data);

  function move(from, to){
    //PAREI AQUI - VIDEO EM 59:37
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map(list => <List key={list.title} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}

export default Board;