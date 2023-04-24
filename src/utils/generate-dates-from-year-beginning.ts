import dayjs from "dayjs"

/*export  function generateDatesFromYearBeginning(){
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear 
  //isbefore é do dayjs, e to usando ali o todate, para converter para js, ja que se nao fizer isso, vai enviar um objeto do dayjs
  while (compareDate.isBefore(today)){
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1,'day')
    return dates
  }
}
*/

export function generateRangeDatesFromYearStart() {
  const startDate = dayjs().startOf('year')
  const endDate = new Date()
  let dateRange = []
  let compareDate = startDate

  while (compareDate.isBefore(endDate))//enquanto a data for anterior a hoje, eu vou continuar fazendo while e no while
   {
    dateRange.push(compareDate.toDate())
    //aki tipo, começa em 2023-01-01 ai vai pushando, depois que da push nisso, essa parte ai de baixo adiciona mais 1 dia, ate o while encerrar, que ele encerra qunado chega no dia atual.
    //toDate para converter a um objeto js, ja que assim esta como dayjs
    compareDate = compareDate.add(1, 'day')
    //vai adicionar 1 dia no compare date para cada rotação do while e no final retorno tudo

    
  
  }
 
  return dateRange
  
}
