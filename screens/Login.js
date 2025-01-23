import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import { auth, signInWithEmailAndPassword } from '../backend/FirebaseConfig';
import { useNavigation } from  '@react-navigation/native';
import { validacaoFormularioUsuario, exibirMensagemValidacao } from '../util/Validacao';
import { styles } from '../util/Estilos';

const LoginScreen = () => {
    const navegacao = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');    

    const executarLogin = async () => {
        try {
            let validacaoErro = validacaoFormularioUsuario(email, senha);
            if ( validacaoErro.length > 0){
                exibirMensagemValidacao(validacaoErro);
            } else {
                await signInWithEmailAndPassword(auth, email, senha);
                Alert.alert("Sucesso", 'Logado com sucesso' );
                navegacao.navigate("Interna");
            }
        } catch(error) {
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <View style={styles.tela}>
            <Text style={styles.texto}>E-mail</Text>
            <TextInput style={styles.campos} value={email} onChangeText={setEmail} />
            <Text style={styles.texto}>Senha</Text>
            <TextInput style={styles.campos} value={senha} onChangeText={setSenha} secureTextEntry />

            <Button style={styles.botaoAcesso} title="Entrar" onPress={executarLogin}/>
        </View>

    );

};

export default LoginScreen;