import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { toastAdapter } from '../../adapters/toastAdapter';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = (state.currentCycle + 1) % 9 || 1;
  const nextCycleType = determineNextCycleType(nextCycle);

  function determineNextCycleType(currentCycle: number): TaskModel['type'] {
    if (currentCycle % 8 === 0) return 'longBreakDuration';
    if (currentCycle % 2 === 0) return 'shortBreakDuration';

    return 'focusDuration';
  }

  function handleStartNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toastAdapter.dismiss();
    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastAdapter.warning('Digite o nome da tarefa!');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    toastAdapter.success('Tarefa iniciada');
  }

  function handleStopTask() {
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    });
  }

  return (
    <form onSubmit={handleStartNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          id='inputTask'
          labelText='Task'
          placeholder='Type something'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        ></DefaultInput>
      </div>

      <div className='formRow'>
        {!state.activeTask ? (
          <p>
            <b>Próximo ciclo é de {state.config[nextCycleType]}min</b>
          </p>
        ) : (
          <p>
            <b>
              {state.activeTask.type === 'focusDuration'
                ? 'Foque '
                : 'Descanse '}
              por {state.activeTask.duration}min
            </b>
          </p>
        )}
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            aria-label='Interromper tarefa'
            title='Interromper tarefa'
            type='button'
            color='red'
            onClick={handleStopTask}
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </form>
  );
}
