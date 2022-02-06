import * as React from "react";
import {
  Button,
  SafeAreaView,
  FlatList,
  SafeAreaSafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

function PaginaInicial({navigation}) {
  const [username, setUsername] = React.useState("React");
  const [foto, setFoto] = React.useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );

  return (
    <SafeAreaView style={DarkTheme,styles.body}>
      <Text style={styles.titulo}>Bem Vindo</Text>
      <Text style={styles.subtitulo}>{`Olá, ${username}`}</Text>
      <SafeAreaView>
        <SafeAreaView>
          {/* Formulário */}

          <SafeAreaView style={styles.bodyBtn}>
            <TextInput
              style={styles.input}
              placeholder={username}
              onChange={function (event) {
                if (event.target.value != "") {
                  const valor = event.target.value;
                  setUsername(valor);
                  setFoto(`https://github.com/${valor}.png`);
                } else {
                  setUsername("React");
                  setFoto("https://reactnative.dev/img/tiny_logo.png");
                }
              }}
            />
            <TouchableOpacity 
              style={styles.btn}
              onPress={()=>{navigation.navigate('ChatPage', {
                username: username,
                otherParam: 'anything you want here',
              });}}
            >
              <Image
                source={{
                  uri: "https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_telegram_Airplane_Air_plane_paper_airplane-33-256.png",
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  alignItems: "center",
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
          </SafeAreaView>
          {/* Formulário */}

          {/* Photo Area */}
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.bodyImg}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: foto,
          }}
        />
      </SafeAreaView>
      <Text style={styles.defaultName}>{username}</Text>
      {/* Photo Area */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    height: "130px",
    width: "130px",
    borderRadius: "50%",
    textAlign: "center",
    alignItems: "center",
    borderWidth:'1px',
    borderStyle:'solid',
  },
  body: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: "#20232A",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  titulo: {
    color: "#CCCCCC",
    fontSize: "30px",
    marginBottom: "",
  },
  input: {
    margin: "10px",
    width: "365px",
    height: "45px",
    borderStyle: "solid",
    borderColor: "#FFF",
    borderRadius: "15px",
    borderWidth: "1px",
    padding: "10px",
    color: "#ABABAB",
    fontSize: "15px",
    marginBottom: "10px",
  },
  subtitulo: {
    color: "#ABABAB",
    fontSize: "20px",
    textAlign: "center",
  },
  bodyBtn: {
    width: "385px",
    alignItems: "flex-end",
    padding: "3px",
    marginBottom: "50px",
  },
  bodyImg: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#181F25",
    height: "195px",
    width: "146px",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: "10px",
    borderWidth:'1px',
    borderStyle:'solid',
  },
  defaultName: {
    color: "#ABABAB",
    fontSize: "20px",
    textAlign: "center",
  },
  btn: {
    width: "36px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#61DAFB",
    textAlign: "center",
    margin:'9px'
  },
});

export default PaginaInicial;
