import React from 'react';
import { createClient } from '@supabase/supabase-js';
import {
    Button,
    View,
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
  } from "react-native";


const SUPABASE_URL ='https://sorexwekduheaphbaste.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzk4OTkwMSwiZXhwIjoxOTU5NTY1OTAxfQ.wlsa4lsvscYYMDHNkHYAkHO6KRwvNfILgscedWFDjEE'
const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export default function ChatPage({ route, navigation }) {


    // const { username, otherParam } = route.params;
    const username = ''
    const [mensagem, setMensagem] = React.useState('')
    const [listaMensagens, SetListaMensagens] = React.useState([])
    React.useEffect(()=>{
        SUPABASE_CLIENT
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data })=>{
            SetListaMensagens(data)
        })
    }, []) 
    function handleNovaMensagem(novaMensagem){{
            if(novaMensagem != '' && novaMensagem != ' ' && novaMensagem != '  '){
                const mensagem = {
                    de: username,
                    texto: novaMensagem,
                }
                SUPABASE_CLIENT
                    .from('mensagens')
                    .insert([
                        mensagem
                    ])
                    .then(({ data })=>{
                        SetListaMensagens([
                            data[0],
                            ...listaMensagens
                        ])
                    })
                setMensagem('')
            }else{
                setMensagem('')
            }
        }
    }
    return (
        <View style={{backgroundColor:'transparent', alignItems:'center', justifyContent:'center'}}>
            <View>
                <View  style={{backgroundColor: 'transparent', color:'#fff',alignItems:'center', justifyContent:'center'}}>
                    <MessageList mensagem={listaMensagens} />   
                    <View style={styles.bodyBtn}>
                        <TextInput
                            value={mensagem}
                            onChange={(event)=>{
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(event)=>{
                                if(event.key === 'Enter'){
                                    event.preventDefault()
                                    handleNovaMensagem(mensagem)
                                }
                            }}
                            style={styles.input}
                            placeholder="Insira sua mensagem aqui..."/>
                            <TouchableOpacity 
                                onPress={(event)=>{
                                        handleNovaMensagem(mensagem)
                                }}
                                style={styles.btn}
                            >
                                <Text style={styles.txt}>Enviar</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

function MessageList(props) {
    return (
        <ScrollView style={styles.lista}>
            {props.mensagem.map((mensagem)=>{
                return(
                <View style={{justifyContent:'center', flexDirection:'column'}}>
                    <View>
                        <Image
                            source={{uri:`https://github.com/${mensagem.de}.png`}}
                        />
                        <Text>
                            {mensagem.de}
                        </Text>
                        <Text>
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </View>
                    {mensagem.texto}
                </View>)
            })}
        </ScrollView>
    )   
}
const styles = StyleSheet.create({
    tinyLogo: {
      height: "130px",
      width: "130px",
      borderRadius: "50%",
      textAlign: "center",
      alignItems: "center",
      flex:1
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
      width: "300px",
      height: "45px",
      borderStyle: "solid",
      borderColor: "#FFF",
      borderRadius: "15px",
      borderWidth: "1px",
      padding: "10px",
      color: "#ABABAB",
      fontSize: "15px",
      backgroundColor:'#181F25',
      flexDirection:'row'
    },
    subtitulo: {
      color: "#ABABAB",
      fontSize: "20px",
      textAlign: "center",
    },
    bodyBtn: {
      width: "360px",
      height: "55px",
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    bodyImg: {
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#333",
      height: "195px",
      width: "146px",
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: "10px",
    },
    defaultName: {
      color: "#ABABAB",
      fontSize: "20px",
      textAlign: "center",
    },
    btn: {
      backgroundColor: "#61DAFB",
      alignItems:'center',
      justifyContent:'center',
      width:'50px',
      borderRadius:'10px',
      padding:'10px',
      height:'45px'
    },
    txt:{
        textAlign: "center",
        justifyContent: 'center', 
        flex:1,
        alignItems: 'center',

        padding:'10px',
    },
    divMsg:{
        alignItems:'center',
        flex:1,
        justifyContent: 'center'
    },
    lista:{
        backgroundColor:'#181F25',
        width:'350px', 
        height:'450px', 
        color:'#fff',
        borderRadius:'5px',
        marginBottom:'15px',
        padding:'15px'
    }
  });
  