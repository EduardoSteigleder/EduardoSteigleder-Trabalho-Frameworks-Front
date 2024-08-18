<template>
  <div>
    <h1>{{ produto.id ? 'Editar Produto' : 'Adicionar Produto' }}</h1>
    <form @submit.prevent="salvarProduto">
      <input v-model="produto.nome" placeholder="Nome do Produto" required>
      <input v-model="produto.descricao" placeholder="Descrição" required>
      <input v-model="produto.preco" placeholder="Preço" required>
      <input v-model="produto.quantidade" placeholder="Quantidade" required>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produto: {
        nome: '',
        descricao: '',
        preco: '',
        quantidade: ''
      }
    };
  },
  created() {
    if (this.$route.params.produtoId) {
      this.carregarProduto(this.$route.params.produtoId);
    }
  },
  methods: {
    carregarProduto(id) {
      axios.get(`http://localhost:3000/api/produtos/${id}`)
        .then(response => {
          this.produto = response.data;
        })
        .catch(error => {
          console.error("Erro ao carregar produto: ", error);
        });
    },
    salvarProduto() {
      if (this.produto.id) {
        axios.put(`http://localhost:3000/api/produtos/${this.produto.id}`, this.produto)
          .then(() => {
            this.limparCampos();
            this.$router.push({ name: 'Produtos' });
          })
          .catch(error => {
            console.error("Erro ao salvar produto: ", error);
          });
      } else {
        axios.post('http://localhost:3000/api/produtos', this.produto)
          .then(() => {
            this.limparCampos();
            this.$router.push({ name: 'Produtos' });
          })
          .catch(error => {
            console.error("Erro ao salvar produto: ", error);
          });
      }
    },
    limparCampos() {
      this.produto = {
        nome: '',
        descricao: '',
        preco: '',
        quantidade: ''
      };
    }
  }
};
</script>
