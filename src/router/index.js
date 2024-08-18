import { createRouter, createWebHistory } from'vue-router';
import ProdutosList from'../views/ProdutosList.vue';
import GerenciarProdutoView from'../views/GerenciarProdutoView.vue';
import MovimentacoesList from'../views/MovimentacoesList.vue';

const routes = [
  {
    path: '/produto',
    name: 'ProdutosList',
    component: ProdutosList
  },
  {
    path: '/gerenciar',
    name: 'GerenciarProdutoView',
    component: GerenciarProdutoView
  },
  {
    path: '/movimentacao',
    name: 'MovimentacoesList',
    component: MovimentacoesList
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
