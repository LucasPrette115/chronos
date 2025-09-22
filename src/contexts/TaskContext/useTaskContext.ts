import { useContext } from 'react';
import { TaskContext } from '.';

export function useTaskContext() {
  return useContext(TaskContext);
}
