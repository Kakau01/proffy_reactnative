import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
//Adapta o efeito do click ao sistema operacional que o usuario estiver utilizando, portanto trocarei pelo TouchableOpacity
import { RectButton } from "react-native-gesture-handler";


//Fazer a navegacao quando o usar clicar em dar aulas
import { useNavigation } from "@react-navigation/native";


import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';



function Landing() {
    const { navigate } = useNavigation();

    //carregar o total de conexoes
    const [totalConnections, setTotalConnections] = useState();

    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;

            setTotalConnections(total);
            // console.log(total);

        })
    }, []);

    //Fazer a navegacao quando o usar clicar em dar aulas
    function handleNavigateToGiveClassesPage() {
        //passo o nome da rota, para onde quero enviar o usuario, é o noe que esta dentro de names
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigate('Study');
    }

    return (

        <View style={styles.container}>

            <Image source={landingImg} style={styles.banner} />
            <Text style={styles.title} >
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                {/* Passando dois estilos diferentes, porque quero que os botoes tenham cores diferentes*/}
                <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                {/* Passando dois estilos diferentes, porque quero que os botoes tenham cores diferentes*/}
                <RectButton 
                    onPress={handleNavigateToGiveClassesPage} 
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={giveClassIcon} />

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            {/* total de conexoes */}
            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>

    );
}

export default Landing;