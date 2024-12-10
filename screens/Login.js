import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const executarLogin = () => {
        Alert.alert("Olá", 'Usuário: '+ email );
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