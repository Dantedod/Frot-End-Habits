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
  //setTtile vai alterar o valor desse estado
  const [title, setTile] = useState('')

  ///aki é proa aletrar o valor do estado das semanas.
  //<number[]> mostrando qh eh um array q vai receber um number(array numerico)
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    //agr nosso formulario n faz mais o redirecionamento do usuario
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('/habits', {
      title,
      weekDays,
    })

    //fazendo isso, para que apos a pessoa criar o habit,as informações do input sairem automaticamente
    setTile('')
    setWeekDays([])

    alert('Hábito criado com sucesso')

  }

  //quandoeucrio um array no react, preciso falar que tipo de array que é, no caos um array de numeros, por isso botei  useState<number[]>([]) nalinha20
  //function para desselecionar o dia
  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      //no react a gente segue uma padronização chamada imutabilidade onde eu nunca faço modificações me variaveis, sempre substituo a variavel por completo com uma nova variavel, no react a gente cria um novo array para substituir.
      //criei um novo array , o filter edita o array e retorna o novo array a partir dele
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    }
    else {
      //nesse ...weekdays, vou cpoiar todos os elemtenos que eu tinah no array anteriormente usando spreed e vou adicionar meu novo item no final, que é o weekday(dia da semana que to recebendo como paramentro) e coloca na função setWeekDays(weekDaysWithAddOne)obs: tbm to criando um novo array ai em baixo
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

          //To colocando o index alem do weekday pq o index vai me trazer exatamente qual quer eh o dia da semana especifico
          //lembrando, quando faz um map, o primeiro elemento que vem aki dentro dele, precisa ter uma key com um valor unico dentro desse array
          return (
            <Checkbox.Root key={weekDay}
              //esse group, permite que eu consiga fazer estilizações baseadas em propriedades que o check.rrot tem, porem dentro de outros elementos internos a ele
              //na linha 45, eu usei o group-data, passando  ostate=checkled  para estilizar o checkbox(state=chekced aparece no f12, la nos dadso)
              className='flex items-center gap-3 group font-bold focus:outline-none'
              //esse checkbox vai estar checado caso a variavel weekdays(que eh meu estado) inclua este indice(index)
              checked={weekDays.includes(index)}
              //oq que vai ser executado qunado o usuario trocar o check desse checkbox
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