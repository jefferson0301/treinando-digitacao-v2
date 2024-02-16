

const texto = document.querySelector('.texto')
const resultado = document.querySelector('.resultado')
const divCronometro = document.querySelector('.cronometro')
const btnMudarFrase = document.querySelector('.btn-mudar-frase')
const textArea = document.querySelector('.container-main__textarea')
const btnEnviar = document.querySelector('.btn-enviar') 
let valorTextArea = textArea.value


let bdFrases = JSON.parse(localStorage.getItem('frases'))
//console.log(bdFrases.length)
let data = []
// ["O rato roeu a roupa do rei de Roma",
// "Viva a vida com qualidade",
// "O dia amanheceu belo",
// "Sem dor sem ganho",
// "Ultrapasse seus limites"]
for(i=0;i<bdFrases.length;i++ ){
    //console.log(bdFrases[i].frase)
    data.push(bdFrases[i].frase)
} 
    


const TEMPOCONTADOR = 20
let cronometro = TEMPOCONTADOR //tempo para cada palavra em segundos
let intervaloId = null
let contador = 0
let dado = data[contador]

texto.innerHTML = data[contador]

btnMudarFrase.addEventListener('click', () =>{
    iniciarOuPausar()
    mudarFrase()
})

function mudarFrase(){
    textArea.innerHTML = ''
    contador++
    if(contador === data.length){
        contador = 0
    }
        
        dado = data[contador]
        texto.innerHTML = data[contador]
        resultado.innerHTML = ''//clear caso tenha acertado
        textArea.value = '' //altera o valor do input 
        
        cronometro = TEMPOCONTADOR
        iniciarOuPausar()
        divCronometro.innerHTML = `Tempo restante: ${cronometro}`
    
    
}


function lerTeclado(tecla){
    let array = ['Alt','Backspace', 'Tab', 'CapsLock', 'Dead', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp' ]
    if(array.includes(tecla)){// .includes retorna true se tiver dentro do array
        if(tecla === 'Backspace'){
            valorTextArea = valorTextArea.slice(0, -1)//elimina a ultima string
        }
    }
    else{//adiciona  a string
        valorTextArea += tecla
        console.log(valorTextArea)
    }
    
}


 textArea.addEventListener('keydown', (evento) => {
     console.log(evento.key)
     lerTeclado(evento.key)
    
 })

btnEnviar.addEventListener('click', () => {

    if(valorTextArea === dado){
        valorTextArea = ''
        Acertou()
        setTimeout(function() {
            mudarFrase()
        }, 1000);
       
    }
    else{
        Errou()
    }
})

function Acertou(){
    resultado.innerHTML = '<span class="acertou" > Acertou </span>'
    iniciarOuPausar()
}

function Errou(){
    resultado.innerHTML = '<span class="errou" > Errou </span>'
    console.log(valorTextArea)
}

const contagemRegressiva = () => {
    if(cronometro<=0){   
            tempoEsgotado()
            setTimeout(function() {
               mudarFrase()
            }, 1000);
         
         //console.log(intervaloId)
        zerar()
        
        //console.log(intervaloId)
        return
    }else{
        cronometro -= 1
        //console.log(cronometro)
        mostrarCronometro()
    }
}

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        return
    }
    else{
        intervaloId = setInterval(contagemRegressiva, 1000) //setInterval seta um intervalo e fica rodando
        //setTimeout cria 1 delay conforme um dado intervalo
    }
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarCronometro(){
    //formatando uma data 
    const tempo = new Date(cronometro*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    divCronometro.innerHTML = `Tempo restante: ${tempoFormatado}`
}

function tempoEsgotado(){
    divCronometro.innerHTML = 'Tempo Esgotado'
}

iniciarOuPausar()





