import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from './src/pages/Landing';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

//Importando as fontes do google
//Componente de carregamento
import { AppLoading } from 'expo';
//Vamos continuar mostrando a splash screen do a´pp ate as fontes estarem carregadas
export default function App() {
  //fontloaded vai trocar para true quando as fontes forem carregadas com sucesso
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold

  });

  //enquanto as fontes nao estiverem carregadas mostrarei o apploading
  if (!fontsLoaded) {
    return <AppLoading />
  } else {

    return (
      //<>fragment: como se fosse uma view, div poem não é repassada para o html, para o resultado gerado
      <>
        <AppStack />
        {/* Configura como a status bar ira se comportar */}
        <StatusBar style="light" />
      </>

    );
  }

}