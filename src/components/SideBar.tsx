import { useAppSelector } from "../hooks";
import { setName, setBoards } from "../features/boardSlice";
import { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { createBoard, getAllBoards } from "../api/boardsApi";
import { toast } from 'react-toastify';
import { Board, ErrorJson } from "../types";

const SideBar = () => {
  const context = useAppSelector((state) => state.app);
  const boardState = useAppSelector((state) => state.boards);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllBoards(context.url)
      .then(resp => {
        const j = resp.data;

        if (j.error == 0) {
          dispatch(setBoards(j.boards));
        } else {
          toast.warn(j.msg);
        }
      })
      .catch((err: ErrorJson) => toast.error(err.message));
  };

  const uploadNewBoard = () => {
    const board: Pick<Board, 'name'> = {
      name: boardState.name
    }
    createBoard(context.url, board)
      .then(resp => {
        const j = resp.data;
        if (j.error == 0) {
          getData();
        } else {
          toast.warn(j.msg);
        }
      })
      .catch((err: ErrorJson) => toast.error(err.message));
  };

  const handleClick = () => {
    if (boardState.name.length == 0) {
      toast.warn("Please enter a name");
      return;
    }

    // default
    uploadNewBoard();
  };

  const calculateDimensions = (): Pick<DOMRect, 'x' | 'y'| 'height' | 'width' | 'top' | 'left'> => {
    const div = document.querySelector('[query-id="create-form"]');

    if (div) {
      const box = div.getBoundingClientRect();

      return {
        left: box.left,
        x: box.x,
        y: box.y,
        top: box.top,
        height: box.height,
        width: box.width
      }
    }

    return {height: 0, width: 0, x: 0, y: 0, top: 0, left: 0};
  };

  const getHeight = () => {
    const {top, height} = calculateDimensions();
    return window.innerHeight - (top + height) - 25;
  };

  return (
    <div className="w-[300px] max-w-[300px]">
      <div>Sidebar</div>
      <div query-id="create-form" className="px-4 py-4">
        <input
        className="border-none rounded-lg py-1 px-2
        ring-0 outline-none focus:outline-purple-500
        transition-all duration-500 w-full text-black"
        type="text"
        value={boardState.name}
        onChange={(e) => dispatch(setName(e.target.value))}
        />
        <div className="rounded-lg shadow-md px-6 py-2
        bg-slate-400 text-black mt-2
        hover:bg-slate-500 transition-all duration-500 w-full
        cursor-pointer text-center font-medium"
        onClick={handleClick}>
          Submit
        </div>
      </div>

      <div
        ref={ref}
        style={{height: `${getHeight()}px`}}
        className="board-t mt-4 border-r rounded-r-lg"
        >
        {boardState.boards.length == 0
        ?
        (<div>There are no boards</div>)
        :
        (
          <div>
            {boardState.boards.map((board, idx) => (
              <div
              key={`board-${idx}`}
              className="rounded-lg shadow-md px-2 py-2 boarder mb-2
              uppercase font-medium cursor-pointer
              hover:bg-slate-200 transition-all duration-500 hover:text-black"
              >
                {board.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar