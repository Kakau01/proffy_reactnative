import React, { useState } from "react";
import { View, Image, Text, Linking, AsyncStorage } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';


import styles from './styles';
import api from "../../services/api";

//para eu conseguir passar propriedades para o teacher item
export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

//componente que tem um propriedade chamada teacher que recebe todos os dados do professor
//para conseguir mostrar o avatar, o nome... 
interface TeacherItemProps {
    teacher: Teacher;
    //preciso passar se o teacher ja ta favoritado ou nao
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    //valor inicial vai ser o que receber da propriedade favorited
    const [isFavorited, setIsFavorited] = useState(favorited);
    //fazer o whatsaap funcionar
    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id,
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    //favoritar um usuario
    async function handleToggleFavorite() {
        //buscando todos os favoritos
        const favorites = await AsyncStorage.getItem('favorites');

        //converter em um array
        let favoritesArray = [];

        //verificar se o professor ja estiver favoritado preciso remover dos favoritos caso contrario adicionar
        if (favorites) {
            favoritesArray = JSON.parse(favorites);

        }

        if (isFavorited) {
            //varre todos os favoritos procurando qual a posicao que o teacher esta dentro da array
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            //remover
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);

        } else {

            //push com o novo itemq ue quero favoritar
            favoritesArray.push(teacher);

            //quando eu for salvar no estado eu defino o setisfavorited como tru
            setIsFavorited(true);
            //salvar no storage
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

    }

    return (

        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    //URL vinda de ambiente externo
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>


                </View>

            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {},
                        ]}
                    >

                        {isFavorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />

                        }
                    </RectButton>
                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>

                    </RectButton>
                </View>
            </View>


        </View>
    )
}

export default TeacherItem;