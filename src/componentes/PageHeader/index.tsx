import React from "react";
import { View, Image, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import backIcon from "../../assets/images/icons/back.png";
import logoImg from "../../assets/images/logo.png";

import styles from './styles';
import { useNavigation } from "@react-navigation/native";

//ter titulos diferentes
// uso a interface para poder dar um tipo ao parametro que vou manipular na funcao, pois ele tera mais de um conteudo para ser manipulado em telas diferentes
interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({title}) => {
 
    //forçar a navegacao a voltar para a landing page
    const { navigate } = useNavigation();
    
    function handleGoBack() {
               
    navigate('Landing');
    }

    return (
        
        <View style={styles.container}>
            {/* Botao de voltar da header */}
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode='contain' />
                </BorderlessButton>

                <Image source={logoImg} resizeMode='contain' />
            </View>

            <Text style={styles.title}>{title}</Text>
        </View>

    )
}

export default PageHeader;