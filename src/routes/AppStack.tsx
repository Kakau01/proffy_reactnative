import React from "react";
//Como se fosse o browser router
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importar a primeira tela do app
import Landing from '../pages/Landing';
//Tela Dar Aulas
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from "./StudyTabs";

//retorna o navigator e screen
//createStackNavigator: automaticamente cria um cabecalho
const { Navigator,Screen } = createStackNavigator();

function AppStack() {
    return(
        // NavigatorContainer so precisa aparecer 1vez por volta do nosso app todo
        //Tabs vao ser chamadas de dentro de uma rota do stack
        <NavigationContainer>
            {/* Navegacao em Pilha */}
            {/* Desabilitar o cabecalho screeOptions */}
            <Navigator screenOptions={{headerShown: false}}>
                {/* Cada tela da app sera uma screen */}
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />

            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;