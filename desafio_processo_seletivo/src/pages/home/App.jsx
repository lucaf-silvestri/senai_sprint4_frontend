import '../../assets/css/style.css';
import { Component } from 'react/cjs/react.production.min';

export default class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUsuario: "",
      listaRepositories: [],
      idUser: 0,
      titulo: '',
      descricao: '',
      dataCriacao: '',
      tamanho: 0
    }
  }

  NomeUsuario = async (event) => {
    await this.setState({
      nomeUsuario: event.target.value
    });
  }

  Buscar = async (busca) => {
    console.log('Buscando')
    fetch(`https://api.github.com/users/${this.state.nomeUsuario}/repos`)
      .then(resposta => resposta.json())
      .then(dados => this.setState({ listaRepositories: dados }))
      .catch(erro => console.log(erro))
    await console.log(this.state.listaRepositories)
    busca.preventDefault()
  }

  render() {
    return (
      <div>

        <main className='mainGIT'>

          <section className='sectionGIT'>
            <h1 className='tituloGIT'>Buscar um usuário</h1>
            <form onSubmit={this.Buscar} className='sectionGIT'>
              <input onChange={this.NomeUsuario} type="text" placeholder="Insira um usuário" />
              <button type="submit" disable={this.state.nomeUsuario === '' ? 'none' : ''}>Buscar</button>
            </form>
          </section>
          <section className="sectionGIT2">
            <table className='tableGIT'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data de criação</th>
                  <th>Tamanho</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.listaRepositories.map((userRepo) => {
                    return (
                      <tr key={userRepo.id}>
                        <td>{userRepo.id}</td>
                        <td>{userRepo.name}</td>
                        <td>{userRepo.description}</td>
                        <td>{userRepo.created_at}</td>
                        <td>{userRepo.size}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </section>

        </main>

      </div>
    )
  }
}
