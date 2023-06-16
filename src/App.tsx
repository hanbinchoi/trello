import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  // atom으로 부터 todo list를 가져온다
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // drag가 끝날때 실행되는 함수
    if (!destination) return;
    setToDos((oldToDos) => {
      // Copy [1,2,3,4] => [1,2,3,4]
      const copyToDos = [...oldToDos];
      // 1) delete item on source.index
      // [1,2,3,4], source.index=0 => [1]
      copyToDos.splice(source.index, 1);
      // 2) put back the item on the destination.index
      // [2,3,4], dragabbleId=1, destination.index=3 => [2,3,4,1]
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    // react18과 호환 문제로 strict mode를 꺼서 진행하자

    // ContextAPI의 Provider처럼 DND의 상태를 제공해주는 컴포넌트.
    // onDragEnd 이벤트 처리도 여기서 한다.
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <div>
            {/* 드롭할 수 있는 영역을 명시 */}
            <Droppable droppableId="one">
              {(magic) => (
                // ref - 라이브러리에서 컴포넌트 DOM을 조작하기 위해 필수로 등록해줘야 한다.
                // droppableProps - 우리가 전달한 prop를 라이브러리에서 사용할 수 있는 형태로 DOM data에 등록시켜줌
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((todo, index) => (
                    // 드래그 할 수 있는 컴포넌트
                    <DragabbleCard key={todo} index={index} todo={todo} />
                  ))}
                  {/* drop될 때 공간을 만들기 위해서 필요 */}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </div>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
