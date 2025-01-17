import React, {useState, useEffect}  from "react";
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, banco } from '../backend/FirebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
const InternaScreen = ({navigation}) => {
    const [userId, setUserId] = useState(null);
    const [tarefas, setTarefas] = useState(null);

    const buscarTarefas = async () => {
        try {
            const q = query(collection(banco, "tarefas"), where("userId", "==", userId));
            const snapshot = await getDocs(q);
            const dados = snapshot.docs.map(doc => ({...doc.data(), id:doc.id}));

            setTarefas(dados);
        } catch(error) {
            Alert.alert("Erro: ", error.message);
        }
    };

    useEffect(() => {
        const usuario = onAuthStateChanged(auth, user =>{
            if (user){
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
            buscarTarefas();
        });

        return () => usuario();
        
    }, []);

    const excluirTarefa = (id) => {
        try {
            Alert.alert("Atenção", "Deseja excluir?",
                [
                {text: 'Sim',
                  onPress: () => executarExclusao(id),
                }, 
                {text: "Não",
                    onPress: () => ""
                }]
            );

        } catch(e) {
            Alert.alert("Erro ao excluir: ", e);
        }
    };

    const executarExclusao = async (id) => {
        const tarefa = doc(banco, "tarefas", id);
        await deleteDoc(tarefa);
        buscarTarefas();

    };

    const abrirEdicao = (id) => {
        navigation.navigate("CriarTarefa", {idTarefa: id});
    };
    const navegacao = useNavigation();
    return (
        <View>
            <Text>Bem vindo</Text>
            <Button title="Nova Tarefa" onPress={() => navigation.navigate('CriarTarefa', {idTarefa: ''})} />
        
            <FlatList data={tarefas} renderItem={ ({ item }) => (
                <View>
                    <Text>{ item.nome }</Text>
                    <Text>{ item.descricao }</Text>
                    <Button title="Editar" onPress={() => abrirEdicao(item.id)} />
                    <Button title="Excluir" onPress={() => excluirTarefa(item.id)} />
                </View>
                )}                    
            />
        </View>
    );
};

export default InternaScreen;


