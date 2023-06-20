import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

interface IDragabbleCardProps {
  todo: string;
  index: number;
}

function DragabbleCard({ todo, index }: IDragabbleCardProps) {
  return (
    // index는 리스트의 순서대로 입력해야 한다
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          //  라이브러리에서 DOM 조작을 위해 필요한 코드
          ref={magic.innerRef}
          // drag 스타일을 등록해주는 역할. 없으면 엘리먼트가 드래그 되지 않는다.
          // drag 할때 움직여야될 범위
          {...magic.draggableProps}
          // 실제 drag 할수있는 element를 지정
          {...magic.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
