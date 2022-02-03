const app = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produtoUnico: false,
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
        .then((dados) => (this.produtoUnico = dados));
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) this.produtoUnico = false;
    },
  },
  created() {
    this.fetchProdutos();
  },
});
