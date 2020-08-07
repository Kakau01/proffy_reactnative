import React, { useState} from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import PageHeader from "../../componentes/PageHeader";
import TeacherItem, { Teacher } from "../../componentes/TeacherItem";
import { useFocusEffect } from "@react-navigation/native";


import styles from './styles';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {

        //retorno do bando de dados
        AsyncStorage.getItem('favorites').then(response => {
            //so posso salvar dados em texto, no caso de querem usar uma lista de favoritos temos que converter para JSON
            //vai no banco de dados, busca a lista de favorites e salva dentro do estado acima
            if (response) {

                const favoritedTeachers = JSON.parse(response);
           

                setFavorites(favoritedTeachers);
            }

        });
    }

     //carregar assim que o usuario entrar na tela
     //vai se executado toda vez que a tela entrar em foco
     useFocusEffect(() => {
        loadFavorites();
    });
    

   
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            {/* Dar scroll na tela */}
            <ScrollView
                style={styles.teacherList}
                // Consigo aplicar estilos por conteudo da scrollview,s endo melhor para aplicar padding
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
            
            {favorites.map((teacher: Teacher) => {
                return(
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        //Como todos ja sao favoritos posso deixar como true
                        favorited
                    
                    />
                )
            })}

            </ScrollView>
        </View>
        

        
    )
}

export default Favorites;