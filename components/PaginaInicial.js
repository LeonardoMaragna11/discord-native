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


function PaginaInicial({navigation}) {
  const [username, setUsername] = React.useState("React");
  const [foto, setFoto] = React.useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.titulo}>Bem Vindo </Text>
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
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    textAlign: "center",
    alignItems: "center",
    borderWidth:'1px',
    borderStyle:'solid',
  },
  body: {
    minWidth: "250px",
    height: "100%",
    backgroundColor: "#20232A",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
  },
  titulo: {
    color: "#CCCCCC",
    fontSize: "25px",
  },
  input: {
    width: "230px",
    height: "35px",
    borderStyle: "solid",
    borderColor: "#FFF",
    borderRadius: "15px",
    borderWidth: "1px",
    padding: "10px",
    color: "#ABABAB",
    fontSize: "15px",
  },
  bodyBtn: {
    width: "280px",
    alignItems: "center",
    padding: "3px",
    flexDirection:'row',
    marginBottom:'15px',
    justifyContent:'space-between',
  },
  bodyImg: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#181F25",
    height: "150px",
    width: "105px",
    flexDirection: "row",
    borderRadius: "10px",
    borderWidth:'1px',
    borderStyle:'solid',
    justifyContent:'center',
    elevation:30,
    shadowColor:'#222',
    shadowOffset:{
      width:'3px',
      height:'3px'
    }
  },
  defaultName: {
    color: "#ABABAB",
    fontSize: "15px",
    textAlign: "center",
  },
  btn: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#61DAFB",
    textAlign: "center",
    alignItems:'center',
    justifyContent:'space-between',
  },
});

export default PaginaInicial;
