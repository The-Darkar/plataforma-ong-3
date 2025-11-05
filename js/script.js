document.addEventListener("DOMContentLoaded", () => {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

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
