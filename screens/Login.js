import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import { auth, signInWithEmailAndPassword } from '../backend/FirebaseConfig';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const executarLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            Alert.alert("Sucesso", 'Logado com sucesso' );
        } catch(error) {
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <View>
            <Text>E-mail</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Senha</Text>
            <TextInput value={senha} onChangeText={setSenha} secureTextEntry />

            <Button title="Entrar" onPress={executarLogin}/>
        </View>

    );

};

export default LoginScreen;