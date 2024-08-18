<template>
  <div class="produtos-list">
    <h1>Listagem de Produtos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.descricao }}</td>
          <td>{{ formatPreco(produto.preco) }}</td>
          <td>{{ produto.quantidade }}</td>
          <td>
            <button @click="abrirModal(produto)" class="btn btn-edit">Editar</button>
            <button @click="deletarProduto(produto.id)" class="btn btn-delete">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="fecharModal">
      <div class="modal-content" @click.stop>
        <h2>Editar Produto</h2>
        <form @submit.prevent="atualizarProduto">
          <input v-model="produtoAtualizado.nome" placeholder="Nome do Produto" required>
          <input v-model="produtoAtualizado.descricao" placeholder="Descrição" required>
          <input v-model="produtoAtualizado.preco" placeholder="Preço" required>
          <input v-model="produtoAtualizado.quantidade" placeholder="Quantidade" required>
          <button type="submit">Atualizar</button>
          <button type="button" @click="fecharModal" class="btn btn-cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProdutosList',
  data() {
    return {
      produtos: [],
      showModal: false,
      produtoAtualizado: {
        id: null,
        nome: '',
        descricao: '',
        preco: '',
        quantidade: ''
      }
    };
  },
  created() {
    this.carregarProdutos();
  },
  methods: {
    carregarProdutos() {
      axios.get('http://localhost:3000/api/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error("Erro ao carregar produtos: ", error);
        });
    },
    abrirModal(produto) {
      this.produtoAtualizado = { ...produto };
      this.showModal = true;
    },
    fecharModal() {
      this.showModal = false;
      this.produtoAtualizado = {
        id: null,
        nome: '',
        descricao: '',
        preco: '',
        quantidade: ''
      };
    },
    atualizarProduto() {
      axios.put(`http://localhost:3000/api/produtos/${this.produtoAtualizado.id}`, this.produtoAtualizado)
        .then(() => {
          this.carregarProdutos();
          this.fecharModal();
        })
        .catch(error => {
          console.error("Erro ao atualizar produto: ", error);
        });
    },
    deletarProduto(id) {
      axios.delete(`http://localhost:3000/api/produtos/${id}`)
        .then(() => {
          this.carregarProdutos();
        })
        .catch(error => {
          console.error("Erro ao deletar produto: ", error);
        });
    },
    formatPreco(preco) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
    }
  }
};
</script>

<style scoped>
.produtos-list {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f4f4f4;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
}

.btn-edit {
  background-color: #4CAF50;
}

.btn-delete {
  background-color: #f44336;
}

.btn-cancel {
  background-color: #9e9e9e;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-delete:hover {
  background-color: #e53935;
}

.btn-cancel:hover {
  background-color: #757575;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-content button {
  margin-top: 10px;
}
</style>
