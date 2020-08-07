//Rotas separadas por tabs da parte de estudar

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";
//para ios
import { Platform } from "react-native";
//importando icones
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            // Estilo do container das abas 
            tabBarOptions={{
                style: {
                    //sombras
                    elevation: 0,
                    shadowOpacity: 0,
                    height: Platform.OS === 'ios' ? 84 : 64,
                    
            
                },
                tabStyle :{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
                },

                safeAreaInsets: {
                    bottom: 0,
                },

                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: Platform.OS === 'ios' ? 24: 20,
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                // A cor de fundo da aba quando ela nao esta selecioanda
                inactiveBackgroundColor:  '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d',
            }}

        
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList} 
                options={{
                    //texto que a screen tera dentro da aba
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({color, size, focused}) => {
                        return (
                           
                                <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
                           
                        );
                    }

                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites} 
                options={{
                    //texto que a screen tera dentro da aba
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({color, size, focused}) => {
                        return (
                                //se tiver selecionado uso a cor senao uso a padrao
                                <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                           
                        );
                    }

                }}
            />
            

        </Navigator>
    )
}

export default StudyTabs;