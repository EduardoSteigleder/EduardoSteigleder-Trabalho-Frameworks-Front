<template>
    <div class="movimentacoes-list">
      <h1>Listagem de Movimentações</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID do Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
            <td>{{ movimentacao.id }}</td>
            <td>{{ movimentacao.produto_id }}</td>
            <td>{{ movimentacao.tipo }}</td>
            <td>{{ movimentacao.quantidade }}</td>
            <td>{{ movimentacao.descricao }}</td>
            <td>{{ formatData(movimentacao.data) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MovimentacoesList',
    data() {
      return {
        movimentacoes: []
      };
    },
    created() {
      this.carregarMovimentacoes();
    },
    methods: {
      carregarMovimentacoes() {
        axios.get('http://localhost:3000/api/movimentacoes')
          .then(response => {
            this.movimentacoes = response.data;
          })
          .catch(error => {
            console.error("Erro ao carregar movimentações: ", error);
          });
      },
      formatData(data) {
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit'
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));
}

    }
  };
  </script>
  
  <style scoped>
  .movimentacoes-list {
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
  </style>
  