const areaFrases = document.querySelector(".area__frases")
const textAreaFrase = document.querySelector('#frase')
const btnCriar = document.querySelector('.btn__criar')


 

let bdFrases = JSON.parse(localStorage.getItem('frases')) || []
//

//bdFrases = JSON.stringify(bdFrases)


function atualizarFrases(){
    localStorage.setItem('frases', JSON.stringify(bdFrases))
}

function criarFrase(valorTextArea){
    const frase = {
        id: bdFrases.length,
        frase: valorTextArea
    }
    bdFrases.push(frase)
    //localStorage.setItem('frases', JSON.stringify(bdFrases))
    atualizarFrases()
}

btnCriar.addEventListener('click', () => {
    criarFrase(textAreaFrase.value)
    mostrarFrases()
})

 function mostrarFrases(){
    areaFrases.innerHTML = ''
    let count = 0
    bdFrases.forEach(frase => {
        areaFrases.innerHTML += `<p> ${frase.frase} </p> <div> <button id=${count} class='btn__remover botao' >Remover</button>  <button class='btn__editar ${count} botao' >Editar</button> </div>` 
        const btnEditar = document.querySelector('.btn__editar') 
        // btnEditar.onclick = () =>{
        //         const novaFrase = prompt('Digite a nova frase')//recebe o valor digitado no teclado
                
        //         frase.frase = novaFrase
        //         atualizarFrases()
        //     }
            
        
        count++
    })
 }

  mostrarFrases()
  const listaBtnRemover = document.querySelectorAll('.btn__remover')
 
  for(let i = 0; i<listaBtnRemover.length ; i++){
    
     listaBtnRemover[i].addEventListener('click', () => {
         removerFrase(listaBtnRemover[i].id)
         
     })
  }

  function removerFrase(chave){
    
     let auxBdFrases = []
    
     bdFrases.forEach(frase => {
         if(frase.id == chave){
           
         }
         else{
            auxBdFrases.push(frase)
         }
     })
     bdFrases = auxBdFrases
     //atualizar os ids
     let count = 0
     auxBdFrases.forEach(frase =>{
        frase.id = count
        count++
     })
     
     atualizarFrases()
     mostrarFrases()
     
   }

//editar 
const listaBtnEditar = document.querySelectorAll('.btn__editar')

 listaBtnEditar.forEach(btnEditar => {
     btnEditar.onclick = () =>{
         const novaFrase = prompt('Digite a nova frase')//recebe o valor digitado no teclado
        
         bdFrases[btnEditar.classList[1]].frase = novaFrase
         atualizarFrases()
         mostrarFrases()
     }
    
 })

 //export default {bdFrases} 


