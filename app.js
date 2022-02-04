const app = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produtoUnico: false,
    carrinho: [],
    alerta: false,
    carrinhoAtivo: false,
    parcelas: 10,
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
      if (target === currentTarget) {
        this.produtoUnico = false;
        this.alerta = false;
      }
    },
    clickForaCarrinho({ target, currentTarget }) {
      if (target === currentTarget) {
        this.carrinhoAtivo = false;
      }
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
      this.alerta = true;
      setTimeout(() => {
        this.alerta = false;
      }, 1500);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    router() {
      const hash = document.location.hash.replace("#", "");
      this.fetchProduto(hash);
    },
    compararEstoque() {
      const totalItems = this.carrinho.filter(({ id }) => {
        // aqui estou verificando se o id do produto que está no carrinho é igual ao produto que estou acessando no momento
        if (id === this.produtoUnico.id) {
          return true;
        }
      });
      // aqui eu estou subtraindo do estoque do produto que estou vendo no momento com a quantidade do mesmo que existe no carrinho
      this.produtoUnico.estoque -= totalItems.length;
    },
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
    produtoUnico() {
      document.title = this.produtoUnico.nome || "Techno";

      //alterando a url
      const hash = this.produtoUnico.id || "";
      history.pushState(null, null, `#${hash}`);
      if (this.produtoUnico) {
        this.compararEstoque();
      }
    },
  },
  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
    this.router();
  },
});
