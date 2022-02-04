const app = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produtoUnico: false,
    carrinho: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        total = this.carrinho.reduce((acumulador, preco) => {
          return acumulador + preco.preco;
        }, 0);
      }
      return total;
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
    adicionarItem() {
      this.produtoUnico.estoque--;
      //desestruturar
      const { id, nome, preco } = this.produtoUnico;
      this.carrinho.push({
        id,
        nome,
        preco,
      });
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
  },
  created() {
    this.fetchProdutos();
  },
});
