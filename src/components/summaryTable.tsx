import { useEffect, useState } from "react"
import { generateRangeDatesFromYearStart } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"
import { api } from "../libs/axios"
import dayjs from "dayjs"

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number
}>

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateRangeDatesFromYearStart()

const minimunSummaryDateSizes = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimunSummaryDateSizes - summaryDates.length

console.log(amountOfDaysToFill)




// ali , qunado eu passo o weekDay no map, eu poderia colocar qualqquer nome, so teria q passar isso dps  onde ttem <div key={`${weekDay}-${i}`} e {weekday}
export function SummaryTable() {
  //uma função que ldia com efeitos colaterais, eu passo qual q eh a função q vai executar e o segundo parametro é quando, que é um array e nesse array pode colocar variaveis dentro. Toda vez que o valor da variavel mudar, o react vai executar o codigo da função. Mas se eu deixo o array vazio, o codigo dessa função, executa apenas umas unica vez, no momento que meu componente for exibido a primeira vez. Ou seja, usamos o useEffect para fazer a chamada a api uma unica vez.                       fiz um type para passar que tipo de dados vao ter dentro do array do useState.
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('/summary').then(Response => {
      //para a gente ligar com essas variaveis, tralhar com isso dentro do nosso componente, eh preciso colocar isso dentro deu m estado, unico local onde podemos colocar informações dentro do react e que ele vai conseguir reagir e mostrar as informações em tela da maneira correta.
      setSummary(Response.data)
    })
  }, [])
  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">

        {weekDays.map((weekDay, i) => {
          return (
            //key é algo que o react usa qual a informação unica q eu tenho apra cada dia da semana 
            <div key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold" >
              {weekDay}
            </div>
          )
        })}

      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {/* se sumary.leght for > 0, ele executa o map. */}
        {summary.length > 0 && summaryDates.map(date => {//<---- aki ta fala ndo que para cada data, eu quero mostrar um habit day, assim que ta funcionando esse map
          const dayInSummary = summary.find(day => {
            //Estou validando se a data que ta sendo percorrida desde o dia 1 de janeiro eh igual a alguma data presente dentro do nosso resume. Esse isSame checa tudo(anos,segundos,hoars,milesimos tudo certinho, mas so quero checar se eh o msm dai por isso passo o ,'day'. Isso faz ele checar so o ano, mes dia. Quando chega em hora para de checar)
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}//aki to passando so date, pq to usando o date la de cima, pq assim ele sempre vai existir e ele ja eh um date do js
              //Esse ponto de interrogação fala: Se o dayinsumaryu n tiver nullo, ai sim procura o amount la dentro.
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
            //passei o date para string, pq a key nao aceita o date, por isso tem q virar string
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {//passando indice para colocar na key
          //array,from é para criar um array a partir de um tamanho pre determinado, por isso apssei  tamanho do array, o map ta percorrendo ess enovo array criado

          return (
            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed "></div>

          )
        })}
      </div>
    </div>
  )
}