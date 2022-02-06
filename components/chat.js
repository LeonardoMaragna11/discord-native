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
        <View style={{backgroundColor:'#fff'}}>
                  <Text>username: {username}</Text>
            <View>
                <View  style={{backgroundColor: '#000', color:'#fff'}}>
                    {/* <MessageList mensagem={listaMensagens} />    */}
                    <View >
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

function Header() {
    return (
        <>
            <View>
                <Text>
                    Chat
                </Text>
                <TouchableOpacity/>
            </View>
        </>
    )
}

function MessageList(props) {
    return (
        <View>
            {props.mensagem.map((mensagem)=>{
                return(
                <View key={mensagem.id}>
                    <View>
                        <Image
                            src={`https://github.com/${mensagem.de}.png`}
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
            
        </View>
        
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
      flex:1,
      marginBottom: "5px",
      marginTop: "5px",
      marginLeft: "5px",
      width: "300px",
      height: "45px",
      borderStyle: "solid",
      borderColor: "#FFF",
      borderRadius: "15px",
      borderWidth: "1px",
      padding: "10px",
      color: "#ABABAB",
      fontSize: "15px",
      marginBottom: "10px",
      backgroundColor:'#181F25'
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
      width: "50px",
      height: "40px",
      borderRadius: "10px",
      backgroundColor: "#61DAFB",
      textAlign: "center",
      margin:'9px',
      alignItems:  'center',
    },
    txt:{
        textAlign: "center",
        justifyContent: 'center', 
        flex:1,
        alignItems: 'center'
    },
    divMsg:{
        alignItems:'center',
        flex:1,
        justifyContent: 'center'
    }
  });
  