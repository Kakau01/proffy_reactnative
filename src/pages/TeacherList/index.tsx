import React, { useState } from "react";
import { View, ScrollView, Text, AsyncStorage } from "react-native";
import PageHeader from "../../componentes/PageHeader";
import TeacherItem, { Teacher } from "../../componentes/TeacherItem";
import { TextInput, BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import styles from './styles';
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    //carregar os usuarios que sao os favoritos
    //favorites é um array numerico
    const [favorites, setFavorites] = useState<number[]>([]);

    //mostrar e esconder o filtro
    //criando estado - comecando como falso
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    // anotar o valor dos inputs
    //um estado para armazenar cada valor
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    //carregar a lista de favoritos toda vez que filtrar
    function loadFavorites() {
        //retorno do bando de dados
        AsyncStorage.getItem('favorites').then(response => {
            //so posso salvar dados em texto, no caso de querem usar uma lista de favoritos temos que converter para JSON
            //vai no banco de dados, busca a lista de favorites e salva dentro do estado acima
            if (response) {

                const favoritedTeachers = JSON.parse(response);
                //array de ids de professores
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }

        });
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    // //pegar todos os professores que o usuario ja favoritou
    // useEffect(() => {
    //     loadFavorites();
    // }, []);

    //funcao para aparecer e sumir os filtros
    function handleToggleFiltersVisible() {
        //Se tiver falso vai setar como tru e vice virsa
        setIsFiltersVisible(!isFiltersVisible);
    }

    //funcao disparada quando o usuario clicar em filtrar
    async function handleFilterSubmit() {
        // QUANDO ELE FIZER O FILTRO EXECUTO A LOADFAVORITES
        loadFavorites();
        //chamando a api e pegando informacoes
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        //vamos usar esses dados para fazer um filtro para buscar na api
        // console.log({
        //     subject,
        //     week_day,
        //     time
        // })
        // console.log(response.data);

        //fechar o form depois que der o submit
        setIsFiltersVisible(false);
        //dados armazenados na variavel teachers do estado
        setTeachers(response.data);

    }


    return (


        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {/* //mostrar e esconder o filtro
                //criando estado - comecando como falso */}
                {/* Se isfilterfor true o que vier depois sera executado */}
                {isFiltersVisible && (
                    // {/* Onde colocarei o filtro */}
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            //recebe o texto digitado -text
                            onChangeText={text => { setSubject(text) }}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => { setWeekDay(text) }}

                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"

                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => { setTime(text) }}

                                    placeholder="Qual a hora?"
                                    placeholderTextColor="#c1bccc"

                                />
                            </View>

                        </View>

                        <RectButton
                            onPress={handleFilterSubmit}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>

                        </RectButton>

                    </View>
                )}
            </PageHeader>
            {/* Dar scroll na tela */}
            <ScrollView
                style={styles.teacherList}
                // Consigo aplicar estilos por conteudo da scrollview,s endo melhor para aplicar padding
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {/* faco teachers.map e para cada teacher eu coloco um teacher item */}
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            //verificar s eno array de favorites tem incluso o id desse professor especifico
                            favorited={favorites.includes(teacher.id)}
                        />

                    )
                })}


            </ScrollView>
        </View>
    )
}

export default TeacherList;