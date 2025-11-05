document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav ul li a");

  // Função para carregar páginas via fetch
  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao carregar a página");
      const html = await response.text();
      content.innerHTML = html;

      // Inicializa máscaras/validações se houver formulário
      initMasks();
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar o conteúdo: ${error.message}</p>`;
    }
  }

  // Intercepta clique nos links do menu
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");
      history.pushState(null, null, url); // Atualiza URL sem recarregar
      loadPage(url);
    });
  });

  // Permite navegação com botões voltar/avançar do navegador
  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });

  // Máscaras de input para formulário
  function initMasks() {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) {
      cpf.addEventListener("input", () => {
        cpf.value = cpf.value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      });
    }

    if (telefone) {
      telefone.addEventListener("input", () => {
        telefone.value = telefone.value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      });
    }

    if (cep) {
      cep.addEventListener("input", () => {
        cep.value = cep.value
          .replace(/\D/g, "")
          .replace(/(\d{5})(\d{3})/, "$1-$2");
      });
    }
  }

  // Carrega a página inicial
  loadPage("index.html");
});
