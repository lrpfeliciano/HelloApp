import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    campos: {
        borderColor: '#000',
        borderWidth: 2,
        marginBottom: 20,
//        marginTop: 20,
    },
    tela: {
        margin: 20,
    },
    botaoAcesso: {
        marginTop: 30
    },
    texto: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    }, 
    botaoNovo:{
        backgroundColor: '#00f',
        color: '#fff',
        height: 40,
        verticalAlign: 'middle'
    },
    botaoAlterar: {
        width: 150,
        backgroundColor: '#0f0',
        color: '#fff',
        height: 40,
        verticalAlign: 'middle'
    },
    botaoExcluir: {
        backgroundColor: '#f00',
        width: 150,
        color: '#fff',
        height: 40,
        verticalAlign: 'middle'
    },
    lado_a_lado: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


export { styles };