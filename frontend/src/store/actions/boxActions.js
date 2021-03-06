import { boxService } from "../../services/boxService"
import { socketService } from "../../services/socketService";

export function loadBox(boxId) {
  return async dispatch => {
    const currBox = await boxService.getById(boxId);
    dispatch({ type: 'SET_CURR_BOX', currBox })
  };
}

export function loadBoxes() {
  return async dispatch => {
    const boxes = await boxService.query();
    dispatch({ type: 'SET_BOXES', boxes })
  };
}

export function saveBox(box) {
  return async dispatch => {
    const newBox = await boxService.save(box);
    dispatch({ type: 'ADD_BOX', box: newBox });
    return newBox;
  };
}

export function setFilter(query) {
  return dispatch => {
    dispatch({ type: 'SET_FILTER', filter: query });
  };
}

export function updateBox(currBox) {
  return dispatch => {
    boxService.update(currBox);
    socketService.emit('set currBox', currBox);
    dispatch({ type: 'UPDATE_BOX', currBox })
  };
}

export function removeBox(boxId) {
  return async dispatch => {
    await boxService.remove(boxId)
    dispatch({ type: 'REMOVE_BOX', boxId })
  };
}

// UPDATES FROM SOCKET:
export function gotBoxUpdate(currBox) {
  return dispatch => {
    dispatch({ type: 'UPDATE_BOX', currBox })
  };
}

export function setBoxStatus({ msgs, currSong }) {
  return (dispatch, getState) => {
    const { currBox } = getState().boxReducer;
    if (!currSong.id) currSong = (currBox.songs.length) ? { id: currBox.songs[0].id, isPlaying: true, secPlayed: 0 } : null;
    dispatch({ type: 'SET_CURR_SONG', currSong });
    dispatch({ type: 'SET_MSGS', msgs });
    dispatch({ type: 'SET_UNREAD', unread: msgs.length });
  }
}

export function setActiveBoxes(activeBoxes) {
  return dispatch => {
    dispatch({ type: 'SET_ACTIVE_BOXES', activeBoxes })
  }
}

export function setIsTouch(isTouch) {
  return dispatch => {
    dispatch({ type: 'SET_IS_TOUCH', isTouch })
  }
}

export function setIsMobile(isMobile) {
  return dispatch => {
    dispatch({ type: 'SET_IS_MOBILE', isMobile })
  }
}