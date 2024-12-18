import React, {useState} from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { banco } from '../backend/FirebaseConfig';

const CriarTarefa = () => {
    const[nome, setNome] = useState('');
    const[descricao, setDescricao] = useState('');

    const cadastrar = async () => {
        try {
//            Alert.alert("Data", new Date().getTime().toString());
            await addDoc(collection(banco, 'tarefas'),
                {
                nome, descricao, 
                'data_criacao': new Date().getTime().toString()
                }
            );
            
        } catch(error){
            Alert.alert("Erro", error);
        }

    }
    return (
        <View>
            <TextInput placeholder='Nome da Tarefa' value={nome} onChangeText={setNome} />
            <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
            <Button title="Cadastrar" onPress={cadastrar} />
        </View>
    );
}

export default CriarTarefa;

