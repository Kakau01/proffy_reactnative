import React from "react";
//ImageBackground - componente para colocar uma imagem de fundo
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';


function GiveClasses() {
    //navigate-volta para landing - goback- volta pra pagina anterior
    const {goBack} = useNavigation();

    //Fazer com que o botao volte para a pagina anterior
    function handlerNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            {/*resizeMode -f conteudo conter no tamanho do elemento */}
            <ImageBackground
                resizeMode='contain'
                source={giveClassesBgImage}
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web</Text>


            </ImageBackground>

            <RectButton onPress={handlerNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    Tudo bem
                </Text>
                
            </RectButton>
        </View>
    )


}

export default GiveClasses;