import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = (state.currentCycle + 1) % 9 || 1;
  const nextCycleType = determineNextCycleType(nextCycle);
  console.log(nextCycleType);

  function determineNextCycleType(currentCycle: number): TaskModel['type'] {
    if (currentCycle % 8 === 0) return 'longBreakDuration';
    if (currentCycle % 2 === 0) return 'shortBreakDuration';

    return 'focusDuration';
  }

  function handleStartNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa!');
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
    const secondsRemaining = newTask.duration * 60;
    setState(prev => {
      return {
        ...prev,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: `${Math.floor(secondsRemaining / 60)
          .toString()
          .padStart(2, '0')}:${(secondsRemaining % 60)
          .toString()
          .padStart(2, '0')}`,
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  function handleStopTask() {
    setState(prev => {
      return {
        ...prev,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
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
        <p>Próximo ciclo é de {state.config[nextCycleType]}min</p>
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
