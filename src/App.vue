<template>
  <div id="app">
    <nav>
      <router-link to="/gerenciar">
        <button>Adicionar Produto</button>
      </router-link>
      <router-link to="/produto">
        <button>Listar Produtos</button>
      </router-link>
      <router-link to="/movimentacao">
        <button>Listar Movimentação</button>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
