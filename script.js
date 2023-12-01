document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");
  const lista = document.createElement("ul");
  const limparCamposBtn = document.createElement("button");
  const excluirTodosBtn = document.createElement("button");
  const pesquisaInput = document.createElement("input");
  const pesquisaBtn = document.createElement("button");

  limparCamposBtn.textContent = "Limpar Campos";
  excluirTodosBtn.textContent = "Excluir Todos";
  pesquisaInput.placeholder = "Pesquisar...";
  pesquisaBtn.textContent = "Pesquisar";

  document.body.appendChild(lista);
  document.body.appendChild(limparCamposBtn);
  document.body.appendChild(excluirTodosBtn);
  document.body.appendChild(pesquisaInput);
  document.body.appendChild(pesquisaBtn);

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const dataEnvio = new Date().toLocaleString();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${dataEnvio}</strong> - Nome: ${nome}, Email: ${email}, Assunto: ${assunto}`;

    lista.appendChild(listItem);

    formulario.reset();

    const formData = {
      dataEnvio,
      nome,
      email,
      assunto,
    };

    const storedData = JSON.parse(localStorage.getItem("form_data")) || [];
    storedData.push(formData);
    localStorage.setItem("form_data", JSON.stringify(storedData));
  });

  limparCamposBtn.addEventListener("click", function () {
    formulario.reset();
  });

  excluirTodosBtn.addEventListener("click", function () {
    lista.innerHTML = "";
    localStorage.removeItem("form_data");
  });

  pesquisaBtn.addEventListener("click", function () {
    const termoPesquisa = pesquisaInput.value.toLowerCase();

    Array.from(lista.children).forEach(function (item) {
      const textoItem = item.textContent.toLowerCase();
      item.style.display = textoItem.includes(termoPesquisa) ? "block" : "none";
    });
  });
});
