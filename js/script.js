document.addEventListener("DOMContentLoaded", () => {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  // Função para trocar o conteúdo da página
  const loadPage = (page) => {
    fetch(page)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
      });
  };

  // Inicialização do SPA (alterar o conteúdo inicial)
  loadPage("index.html");

  // Evento para o clique no menu
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = link.getAttribute("href");
      loadPage(page);
    });
  });

  // Máscaras de input
  cpf.addEventListener("input", () => {
    cpf.value = cpf.value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  });

  telefone.addEventListener("input", () => {
    telefone.value = telefone.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  });

  cep.addEventListener("input", () => {
    cep.value = cep.value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
  });
});
