export function checkValidFormUser({ nome, email, senha, confirmacaoSenha }) {
  const validSenha = () => {
    if (confirmacaoSenha === senha) {
      return true;
    }
    return false;
  };

  if (nome && email && validSenha()) {
    return true;
  }
  return false;
};

export function checkValidFormRegister({ valor, data, descricao }) {
  if (valor && data && descricao) {
    return true;
  }
  return false;
};


