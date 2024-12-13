import {Alert} from 'react-native';

export const validacaoFormularioUsuario = (email, senha) => {
    let erros = [];

    if (!email) {
        erros.push("E-mail inválido.");
    }

    if (!senha) {
        erros.push("Senha inválida");
    }

    return erros;
}

export const exibirMensagemValidacao = (erros) => {
    let msg = "";
    for (let index = 0; index < erros.length; index++) {
        msg = msg + erros[index] + "\n";
    }
    Alert.alert("Erro", msg);
}