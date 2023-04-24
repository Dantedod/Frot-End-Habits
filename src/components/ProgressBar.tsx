interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {

  return (
    <div className='h-3 rounded-xl  bg-zinc-700 w-full mt-4'>
      <div className='h-3 rounded-xl bg-violet-600 transition-all'
        role='progressbar'
        aria-label='Progesso de hábitos completados nesse dia'
        aria-valuenow={props.progress}
        //essa segunda chave, eh indicando q eu quero colocar uma variavel js, ai to passando um objeto
        //uma para indicar que to colocando js e outra para indicar que eh uma objeto

        style={{ width: `${props.progress}%` }}
      />
    </div>
  )
}