import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../libs/axios";

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sabado',
]
export function NewHabitForm() {

  const [title, setTile] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('/habits', {
      title,
      weekDays,
    })

    setTile('')
    setWeekDays([])

    alert('Hábito criado com sucesso')

  }


  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {

      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    }
    else {
      const weekDaysWithAddOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddOne)
    }
  }

  return (

    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento
      </label>

      <input type="text"
        id="title"
        placeholder="Ex.: Exercicios, dormir bem, etc..."
        className="p-4 rounded-lg  mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        //toda vez que o usuario digitar qualquer ocisa nessa imput, ele vai anotar na variavel title do nosso estado
        onChange={event => {
          setTile(event.target.value)
        }}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-3">
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {availableWeekDays.map((weekDay, index) => {


          return (
            <Checkbox.Root key={weekDay}

              className='flex items-center gap-3 group font-bold focus:outline-none'
              checked={weekDays.includes(index)}
              onCheckedChange={() => {
                handleToggleWeekDay(index)
              }}
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                <Checkbox.Indicator>
                  <Check className='text-white' />
                </Checkbox.Indicator>
              </div>

              <span className=' text-white leading-tight '>
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button type="submit" className="mt-6  rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600  hover:bg-green-400 transition-colors  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>

  )
}