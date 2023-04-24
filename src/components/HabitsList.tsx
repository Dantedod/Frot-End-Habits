import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../libs/axios'
import dayjs from 'dayjs'

interface HabitsListProps {
  date: Date
  onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string,
    title: string,
    created_at: string
  }>,
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>/*aki fala que vai ser no formato desse HabitsInfo passando ele dentro disso <>  */()
  //ele vai executar esse codigo somente qunado o suuario abrir o popover, pq esse conponente n existe me tela antes e o useEfect ele so executa qunado o componente eh exebido em tela.
  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data)

    })
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)
    //esse ! fala pro ts que essa informação VAI existir nesse momento
    //validando que dentro de habitsinfo.completedhabits esta incluso o habitid
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      //remover da lsita
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

    } else {
      //adicionar na lista
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })
    onCompletedChange(completedHabits.length)
  }

  const isDateInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date())

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          //como o checkbox.root eh o primeiro elemento que vem dentro do map, ele precisa obrigatoriamente de uma key unica, ai botei habit.id pq n vao ter habitos duplicados
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => {
              handleToggleHabit(habit.id) //passando habit.id que eh a unica informação que precisa para chamar a api
            }}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}//desabilitando a pessoa poder clicar na checkbox em datas passadas
            //esse group, permite que eu consiga fazer estilizações baseadas em propriedades que o check.rrot tem, porem dentro de outros elementos internos a ele
            //na linha 45, eu usei o group-data, passando  ostate=checkled  para estilizar o checkbox(state=chekced aparece no f12, la nos dadso)
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
          >

            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>

            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}


    </div>
  )
}