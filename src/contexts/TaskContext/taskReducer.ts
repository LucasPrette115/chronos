import type { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.duration * 60;
      const nextCycle = (state.currentCycle + 1) % 9 || 1;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: `${Math.floor(secondsRemaining / 60)
          .toString()
          .padStart(2, '0')}:${(secondsRemaining % 60)
          .toString()
          .padStart(2, '0')}`,
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTask?.id)
            task.interruptedDate = Date.now();
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: `${Math.floor(
          action.payload.secondsRemaining / 60,
        )
          .toString()
          .padStart(2, '0')}:${(action.payload.secondsRemaining % 60)
          .toString()
          .padStart(2, '0')}`,
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTask?.id) task.completedDate = Date.now();
          return task;
        }),
      };
    }
  }
  return state;
}
