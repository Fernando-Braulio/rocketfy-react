import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container, Label } from './styles';

const Card = ({data, index, listIndex}) => {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef ] = useDrag({
    item: { type: 'CARD', index, id: data.id, content: data.content, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor){
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      //console.log(item.id); //PARA PEGAR O ID DO CARD QUE ESTOU ARRASTANDO
      //console.log(data.id); //PARA PEGAR O ID DO CARD EM QUE ESTÁ RECEBENDO

      const draggedIndex = item.index; //INDEX DO ITEM QUE ESTÁ SENDO ARRASTADO
      const targetIndex = index; //QUAL O ALVO QUE ESTÁ ARRASTANDO

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect(); //PARA PEGAR O TAMANHO DO ELEMENTO
      const targetCenter = (targetSize.bottom - targetSize.top) / 2; //PEGAR O PONTO CENTRAL DO CARD
      const draggedOffset = monitor.getClientOffset(); //PEGAR O QUANTO DO ITEM EU ARRASTEI, QUAL FOI O PONTO QUE ARRASTEI
      const draggedTop = draggedOffset.y - targetSize.top; //PEGAR A DISTANCIA QUE UM CARD ENTROU DENTRO DO OUTRO CARD
      
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      { data.user && <img src={data.user} alt="" /> }
    </Container>
  );
}

export default Card;