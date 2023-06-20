import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
`;

interface IBoardProps {
  toDos: ITodo[];
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

const Form = styled.form`
  width: 100%;
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <h1>{boardId}</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="tex"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
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
              <DragabbleCard
                key={todo.id}
                index={index}
                toDoId={todo.id}
                toDoText={todo.text}
              />
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
