import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import API_URL from '../../config/api';

function Teste() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Faça uma solicitação à sua API para recuperar os dados do usuário
    // Substitua 'API_URL' pela URL da sua API e 'userId' pelo ID do usuário
    fetch(API_URL + `api/v1/user/7`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(userData.imageProfile) // Define os dados do usuário no estado
      })
      .catch((error) => {
        console.error('Erro ao recuperar os dados do usuário:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Image source={{ uri: `${API_URL}${userData.imageProfile}` }} style={styles.image} />
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
          {/* Outros campos de dados do usuário */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default Teste;
