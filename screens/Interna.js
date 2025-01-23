import React, {useState, useEffect}  from "react";
import { View, Text, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, banco } from '../backend/FirebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { styles } from '../util/Estilos';
import Button from 'react-native-button';

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
        <View style={styles.tela}>
            <Text style={styles.texto}>Bem vindo</Text>
            <Button  style={styles.botaoNovo}
                onPress={() => navigation.navigate('CriarTarefa', {idTarefa: ''})} >
                Nova Tarefa
            </Button>    
        
            <FlatList data={tarefas}  keyExtractor={item => item.id} 
                renderItem={ ({ item }) => (
                <View>
                    <Text style={styles.texto}>{ item.nome }</Text>
                    <Text>{ item.descricao }</Text>
                    <View style={styles.lado_a_lado}>
                        <Button style={styles.botaoAlterar} 
                                onPress={() => abrirEdicao(item.id)}>Editar</Button>
                        <Button style={styles.botaoExcluir}  
                                onPress={() => excluirTarefa(item.id)} >Excluir</Button>

                    </View>        
                </View>
                
                )}                    
            />
        </View>
    );
};

export default InternaScreen;


