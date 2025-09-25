import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.css';

const cycleDescriptionMap = {
  focusDuration: 'Foco',
  shortBreakDuration: 'Descanso',
  longBreakDuration: 'Descanso Longo',
};

export function Cycles() {
  const { state } = useTaskContext();

  return (
    state.tasks.length != 0 && (
      <div className={styles.cycles}>
        <span>Ciclos: </span>
        <div className={styles.cycleDots}>
          {state.tasks.slice(-8).map(task => (
            <span
              key={task.id}
              className={`${styles.cycleDot} ${styles[task.type]}`}
              aria-label={cycleDescriptionMap[task.type]}
              title={cycleDescriptionMap[task.type]}
            ></span>
          ))}
        </div>
      </div>
    )
  );
}
