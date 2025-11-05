document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");

  // Função para carregar páginas via fetch
  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Página não encontrada");
      const html = await response.text();
      content.innerHTML = html;
      initMasks(); // Inicializa máscaras e validações sempre que o conteúdo muda
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
    }
  }

  // Intercepta os cliques nos links do menu
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      loadPage(href);
      history.pushState({ page: href }, "", href);
    });
  });

  // Suporte ao botão "Voltar" do navegador
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      loadPage("index.html");
    }
  });

  // Inicializa máscaras de formulário
  function initMasks() {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) {
      cpf.addEventListener("input", () => {
        cpf.value = cpf.value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      });
    }

    if (telefone) {
      telefone.addEventListener("input", () => {
        telefone.value = telefone.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      });
    }

    if (cep) {
      cep.addEventListener("input", () => {
        cep.value = cep.value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
      });
    }

    // Validação de formulário (exemplo)
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          alert("Por favor, preencha todos os campos corretamente!");
        }
      });
    }
  }

  // Carrega a página inicial
  loadPage("index.html");
});
