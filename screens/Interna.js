import React, {useState}  from "react";
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InternaScreen = () => {
    const navegacao = useNavigation();
    return (
        <View>
            <Text>Bem vindo</Text>
            <Button title="Nova Tarefa" onPress={() => navegacao.navigate('CriarTarefa')} />
        </View>
    );
};

export default InternaScreen;


