const app = new Vue({
  el: "#app",
  data: {
    produtos: [],
  },
  methods: {
    fetchProdutos() {
      fetch("/api/produtos.json")
        .then((response) => response.json())
        .then((dados) => (this.produtos = dados));
    },
  },
  created() {
    this.fetchProdutos();
  },
});
