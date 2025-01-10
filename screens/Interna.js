import React, {useState, useEffect}  from "react";
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, banco } from '../backend/FirebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
const InternaScreen = () => {
    const [userId, setUserId] = useState(null);
    const [tarefas, setTarefas] = useState(null);

    const buscarTarefas = async () => {
        const q = query(collection(banco, "tarefas"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const dados = snapshot.docs.map(doc => ({...doc.data(), id:doc.id}));

        setTarefas(dados);
    };

    useEffect(() => {
        const usuario = onAuthStateChanged(auth, user =>{
            if (user){
                setUserId(user.uid);
                buscarTarefas();
            } else {
                setUserId(null);
            }
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
        navegacao.navigate("CriarTarefa");
    };
    const navegacao = useNavigation();
    return (
        <View>
            <Text>Bem vindo</Text>
            <Button title="Nova Tarefa" onPress={() => navegacao.navigate('CriarTarefa')} />
        
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


