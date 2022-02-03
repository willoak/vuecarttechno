const app = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
  },
  methods: {
    fetchProdutos() {
      fetch("/api/produtos.json")
        .then((response) => response.json())
        .then((dados) => (this.produtos = dados));
    },
    fetchProduto(id) {
      fetch(`/api/produtos/${id}/dados.json`)
        .then((r) => r.json())
        .then((dados) => (this.produto = dados));
    },
  },
  created() {
    this.fetchProdutos();
  },
});
