import React, { ReactNode } from "react";
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
    //posso receber um componente como uma propriedade
    headerRight?: ReactNode;
}

//children é os elementos que eu mostro dentro do page header
const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {

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

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>


            {children}

        </View>

    )
}

export default PageHeader;