import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <h1>{boardId}</h1>
      {/* 드롭할 수 있는 영역을 명시 */}
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          // ref - 라이브러리에서 컴포넌트 DOM을 조작하기 위해 필수로 등록해줘야 한다.
          // droppableProps - 우리가 전달한 prop를 라이브러리에서 사용할 수 있는 형태로 DOM data에 등록시켜줌
          <Area
            // 현재 선택된 Draggable이 특정 Draggable위에 드래깅 되고 있는지 여부
            isDraggingOver={snapshot.isDraggingOver}
            //  현재 Draoppable에서 벗어난 드래깅되고 있는 Draggable ID
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              // 드래그 할 수 있는 컴포넌트
              <DragabbleCard key={todo} index={index} todo={todo} />
            ))}
            {/* drop될 때 공간을 만들기 위해서 필요 */}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
