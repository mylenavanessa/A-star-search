const allDistances = [
  [0, 10, 18.5, 24.8, 36.4, 38.8, 35.8, 25.4, 17.6, 9.1, 16.7, 27.3, 27.6, 29.8], 
  [10, 0, 8.5, 14.8, 26.6, 29.1, 26.1, 17.3, 10, 3.5, 15.5, 20.9, 19.1, 21.8], 
  [18.5, 8.5, 0, 6.3, 18.2, 20.6, 17.6, 13.6, 9.4, 10.3, 19.5, 19.1, 12.1, 16.6], 
  [24.8, 14.8, 6.3, 0, 12, 14.4, 11.5, 12.4, 12.6, 16.7, 23.6, 18.6, 10.6, 15.4], 
  [36.4, 26.6, 18.2, 12, 0, 3, 2.4, 19.4, 23.3, 28.2, 34.2, 24.8, 14.5, 17.9], 
  [38.8, 29.1, 20.6, 14.4, 3, 0, 3.3, 22.3, 25.7, 30.3, 36.7, 27.6, 15.2, 18.2], 
  [35.8, 26.1, 17.6, 11.5, 2.4, 3.3, 0, 20, 23, 27.3, 34.2, 25.7, 12.4, 15.6], 
  [25.4, 17.3, 13.6, 12.4, 19.4, 22.3, 20, 0, 8.2, 20.3, 16.1, 6.4, 22.7, 27.6], 
  [17.6, 10, 9.4, 12.6, 23.3, 25.7, 23, 8,2, 0, 13.5, 11.2, 10.9, 21.2, 26.6], 
  [9.1, 3.5, 10.3, 16.7, 28.2, 30.3, 27.3, 20.3, 13.5, 0, 17.6, 24.2, 18.7, 21.2], 
  [16.7, 15.5, 19.5, 23.6, 34.2, 36.7, 34.2, 16.1, 11.2, 17.6, 0, 14.2, 31.5, 35.5], 
  [27.3, 20.9, 19.1, 18.6, 24.8, 27.6, 25.7, 6.4, 10.9, 24.2, 14.2, 0, 28.8, 33.6], 
  [27.6, 19.1, 12.1, 10.6, 14.5, 15.2, 12.4, 22.7, 21.2, 18.7, 31.5, 28.8, 0, 5.1], 
  [29.8,  21.8, 16.6, 15.4, 17.9, 18.2, 15.6, 27.6, 26.6, 21.2, 35.5, 33.6, 5.1, 0] 
] 

const distances = [ 
  [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [10, 0, 8.5, 0, 0, 0, 0, 0, 10, 3.5, 0, 0, 0, 0], 
  [0, 8.5, 0, 6.3, 0, 0, 0, 0, 9.4, 0, 0, 0, 18.7, 0], 
  [0, 0, 6.3, 0, 13, 0, 0, 15.3, 0, 0, 0, 0, 12.8, 0], 
  [0, 0, 0, 13, 0, 3, 2.4, 30, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 2.4, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 15.3, 30, 0, 0, 0, 9.6, 0, 0, 6.4, 0, 0], 
  [0, 10, 9.4, 0, 0, 0, 0, 9.6, 0, 0, 12.2, 0, 0, 0], 
  [0, 3.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 12.2, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 6.4, 0, 0, 0, 0, 0, 0], 
  [0, 0, 18.7, 12.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5.1], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5.1, 0] 
] 

// 1- linha amarela
// 2- linha azul 
// 3- linha verde 
// 4- linha vermelha
const stations = [[2], [1,2], [2,4], [2,3], [1,2], [2], [1], [1, 3], [1, 4], [1], [4], [3], [3, 4], [3]] 

const trainSpeed = 30

let start = null
let end = null
let stationsOpen = []
let aux = []
let actualStationLine = null
let stationsClose = []

// Inicio
init(1, 14)

function init(initial, destiny) {
  if(initial > 14 || destiny > 14) return console.log('Estação inicial ou final não existe')

  start = [initial - 1];
  end = destiny-1;

  AStar(start)
}

function AStar(root) {
  if(root.length === 1 && root[0] === end) return formatString([root, 0])

  // retornar filhos
  let waySize = root.length === 1 ? root.length - 1 : root[0].length - 1
  let indexDistances = root.length === 1 ? root[waySize] : root[0][waySize]
  let rootOriginal = root.length === 1 ? root : root[0]
  distances[indexDistances].map((item, index) => item !== 0 && index).forEach(item => (item || item === 0) && stationsOpen.push([ ...rootOriginal , item]))

  // f(n) = g(n) + h(n) + adicionais de 4 minutos por troca de linha
  aux = stationsOpen.map(way => {
    if(Array.isArray(way[0])) return ([...way])
      
    let calculateG = way.reduce((total, item, index, wayOriginal) => {
      if(!wayOriginal[index - 1] && wayOriginal[index - 1] !== 0) return total
        
      let station1 = wayOriginal[index - 1]
      let station2 = wayOriginal[index]
        
      let adiction = changeStationLine(station1, station2) ? 4 : 0
      
      return total + adiction + kmToTime(distances[station1][station2]) + kmToTime(allDistances[station1][station2])
    }, 0)

    actualStationLine = null

    return ([[...way], calculateG.toFixed(1)])
  })
    
    // ordenar desc
    aux.sort((a, b) => b[1] - a[1])

    // pegar ultimo nó
    let auxSize = aux.length

    let smallCost = aux[auxSize - 1]

    let smallCostSize = smallCost[0].length

    let actualRoot = smallCost[0][smallCostSize - 1]

    // retorna o caminho se o menor custo for o nó final
    if (actualRoot === end) return formatString(smallCost)

    // se o nó final não for atual fecha nó e chama função recursiva
    stationsOpen = aux
    let newRoot = stationsOpen.pop()
    stationsClose.push(newRoot)
    // Função recursiva
    AStar(newRoot)
}


function kmToTime(km){
  // calcular tempo gasto para troca de estações
  return (km/trainSpeed * 60)
}


function changeStationLine(station1, station2) {
  // função retorna true se a estação mudar
  let a = stations[station1].find(x => stations[station2].includes(x))

  if(!actualStationLine){
    actualStationLine = a;
    return false
  }

  return actualStationLine !== a
}

function formatString(finalWay) {
  //O texto final
  let stationOriginal = finalWay[0].map(item => item + 1)

  let frase =`Caminho: ${stationOriginal.join(' -> ')} | Tempo: ${finalWay[1]}m`

  console.log(frase)
}