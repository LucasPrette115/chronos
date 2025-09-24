import { PlayCircleIcon } from 'lucide-react';
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

  return (
    <form onSubmit={handleStartNewTask} className='form'>
      <div className='formRow'>
        <DefaultInput
          id='inputTask'
          labelText='Task'
          placeholder='Type something'
          ref={taskNameInput}
        ></DefaultInput>
        <Cycles />
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
