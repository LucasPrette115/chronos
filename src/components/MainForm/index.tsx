import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  return (
    <form className='form'>
      <div className='formRow'>
        <DefaultInput
          id='id'
          labelText='Task'
          placeholder='Type something'
        ></DefaultInput>
        <Cycles />
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
