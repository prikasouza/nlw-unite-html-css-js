// const partcipante = {
//     nome: "Priscila Souza",
//     email: "prikasouza@gmail.com",
//     dataInscricao: new Date(2024, 2, 22, 19, 20),
//     dataCheckIn: new Date (2024, 2, 25, 22, 0)

// }

let participantes = [
    {
        nome: "Priscila Souza",
        email: "prikasouza@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date (2024, 2, 25, 22, 0)
    },
    {
        nome: "Carol Madi",
        email: "carol.madi@gmail.com",
        dataInscricao: new Date(2024, 0, 31, 9, 20),
        dataCheckIn: new Date (2024, 1, 5, 13, 30)
    },
    // Adicione mais participantes conforme necessário
    {
        nome: "José Silva",
        email: "jose.silva@example.com",
        dataInscricao: new Date(2024, 1, 15, 14, 30),
        dataCheckIn: null
    },
    {
        nome: "Ana Pereira",
        email: "ana.pereira@example.com",
        dataInscricao: new Date(2024, 2, 5, 11, 45),
        dataCheckIn: new Date (2024, 2, 10, 16, 15)
    },
    {
        nome: "Pedro Santos",
        email: "pedro.santos@example.com",
        dataInscricao: new Date(2024, 2, 10, 8, 0),
        dataCheckIn: null
    },
    {
        nome: "Mariana Oliveira",
        email: "mariana.oliveira@example.com",
        dataInscricao: new Date(2024, 0, 10, 16, 10),
        dataCheckIn: new Date (2024, 0, 15, 9, 30)
    },
    {
        nome: "Rafaela Fernandes",
        email: "rafaela.fernandes@example.com",
        dataInscricao: new Date(2024, 1, 1, 10, 30),
        dataCheckIn: new Date (2024, 1, 6, 14, 20)
    },
    {
        nome: "Lucas Almeida",
        email: "lucas.almeida@example.com",
        dataInscricao: new Date(2024, 0, 25, 17, 50),
        dataCheckIn: new Date (2024, 1, 1, 8, 15)
    },
    {
        nome: "Juliana Lima",
        email: "juliana.lima@example.com",
        dataInscricao: new Date(2024, 1, 5, 12, 15),
        dataCheckIn: null
    },
    {
        nome: "Gustavo Costa",
        email: "gustavo.costa@example.com",
        dataInscricao: new Date(2024, 2, 1, 9, 0),
        dataCheckIn: new Date (2024, 2, 6, 15, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)

    if(participante.dataCheckIn == null){
        dataCheckIn = `
        <button 
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)">
        Confirmar Check-in
        </button>
        `
    }
    
    return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null  
    }

    //verificar se o participante já existe
    const partcipanteExixte = participantes.find(
        (p) => p.email == participante.email
    )

    if(partcipanteExixte) {
        alert('Email já cadastrado')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }

  const fazerCheckIn = (event)=> {
    //confirmar se realmente quer fazer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer ocheck-in?'
    if(confirm(mensagemConfirmacao) == false){
        return
    }
    
    //encontrar o participante dentro da lista
    const participante = participantes.find((p)=> p.email == event.target.dataset.email
    )
    // Outra maneira de deixar a função
    // const participante = participantes.find((p)=>{
    //     return p.email == event.target.dataset.email
    // })

    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //atualizar a lista de participante
    atualizarLista(participantes)
  }