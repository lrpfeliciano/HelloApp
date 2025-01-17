import React, {useEffect, useState} from 'react';
import { View, TextInput, Alert, Button, Text } from 'react-native';
import { addDoc, collection, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'; // Hoje
import { banco } from '../backend/FirebaseConfig';
import { useNavigation } from  '@react-navigation/native'; //Hoje

import { auth } from '../backend/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const CriarTarefa = ({route}) => {
    const[nome, setNome] = useState('');
    const[descricao, setDescricao] = useState('');
    
    const [userId, setUserId] = useState(null);

    const {idTarefa} = route.params;

    //const [documento, setDocumento] = useState(null);

    const consultarTarefa = async(id) => {
        try {
            if (id != ""){
                const tarefaRec = doc(banco, 'tarefas', id);
                //setDocumento(tarefaRec);
                const obj = await getDoc(tarefaRec);
                if (obj.exists){
                    const data = obj.data();
                    setNome(data.nome);
                    setDescricao(data.descricao);

                } else {
                    Alert.alert("Atenção", "Registro não encontrado.");
                }
            }
        } catch(error){
            Alert.alert("Erro ao consultar", error.message);            
        }
    }

    useEffect(() => {
        const usuario = onAuthStateChanged(auth, user => {
            if (user){
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
            consultarTarefa(idTarefa);
        });
        return () => usuario();
    }, []);

    const navegacao = useNavigation(); //Hoje
    const cadastrar = async () => {
        try {
            
            if (idTarefa == ""){
                await addDoc(collection(banco, 'tarefas'),
                    {
                    nome, descricao, 
                    'userId': userId,
                    'data_criacao': Timestamp.now() //Hoje
                    }
                );
                Alert.alert('Sucesso',"Tarefa cadastrada com sucesso"); //Hoje
            } else {
                const tarefaRec = doc(banco, 'tarefas', idTarefa);

                await updateDoc(tarefaRec, {
                    nome, descricao,
                    'data_atualizacao': Timestamp.now() 
                });
               Alert.alert('Sucesso',"Tarefa alterada com sucesso"); 
            }
            navegacao.navigate("Interna"); //Hoje
        } catch(error){
            Alert.alert("Erro", error.message);
        }

    }
    return (
        <View>
            <Text>{idTarefa}</Text>
            <TextInput placeholder='Nome da Tarefa' value={nome} onChangeText={setNome} />
            <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
            <Button title={idTarefa == "" ? 'Cadastrar': 'Alterar'} onPress={cadastrar} />
        </View>
    );
}

export default CriarTarefa;

