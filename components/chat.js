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
  ScrollView,
} from 'react-native';

const SUPABASE_URL = 'https://sorexwekduheaphbaste.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzk4OTkwMSwiZXhwIjoxOTU5NTY1OTAxfQ.wlsa4lsvscYYMDHNkHYAkHO6KRwvNfILgscedWFDjEE';
const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage({ route, navigation }) {
  const { username, otherParam } = route.params;
  const [mensagem, setMensagem] = React.useState('');
  const [listaMensagens, SetListaMensagens] = React.useState([]);
  React.useEffect(() => {
    SUPABASE_CLIENT.from('mensagens_duplicate')
      .select('*')
      .then(({ data }) => {
        SetListaMensagens(data);
      });
  }, []);
  function handleNovaMensagem(novaMensagem) {
    {
      if (novaMensagem != '' && novaMensagem != ' ' && novaMensagem != '  ') {
        const mensagem = {
          de: username,
          texto: novaMensagem,
        };
        SUPABASE_CLIENT.from('mensagens_duplicate')
          .insert([mensagem])
          .then(({ data }) => {
            SetListaMensagens([ ...listaMensagens,data[0]]);
          });
        setMensagem('');
      } else {
        setMensagem('');
      }
    }
  }
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <View
          style={{
            backgroundColor: 'transparent',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MessageList mensagem={listaMensagens} username={username} />
          <View style={styles.bodyBtn}>
            <TextInput
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              style={styles.input}
              placeholder="Insira sua mensagem aqui..."
            />
            <TouchableOpacity
              onPress={(event) => {
                handleNovaMensagem(mensagem);
              }}
              style={styles.btn}>
              <Text style={styles.txt}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function MessageList(props) {
  return (
    <ScrollView style={styles.lista}>
        {props.mensagem.map((mensagem) => {
            let _cor = '#001323'
            let _display = 'none'
            let _aling = 'flex-end'
            let _justify ='space-between'
            if(props.username != mensagem.de){
                _cor = '#0050ff'
                _display ='flex'
                _aling='flex-start'
                _justify='space-between'
            }
        return (
          <View 
            style={{ 
                justifyContent: _justify, 
                flexDirection: 'row', 
                marginBottom:'20px',
                backgroundColor:_cor,
                padding:'10px',
                borderRadius:'5px',
                alignItems:_aling,
                width:'190px'
             }}
            >
            <View>
              <Image
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                  display:_display
                }}
                source={{ uri: `https://github.com/${mensagem.de}.png` }}
              />
              <Text style={{display:_display}}>{mensagem.de}</Text>
              <Text
                style={{ fontSize: '10px', marginLeft: '8px', color: '#AAA' }}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
            {mensagem.texto}
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    width: '230px',
    height: '35px',
    borderStyle: 'solid',
    borderColor: '#FFF',
    borderRadius: '15px',
    borderWidth: '1px',
    padding: '10px',
    color: '#ABABAB',
    fontSize: '15px',
    backgroundColor: '#181F25',
    flexDirection: 'row',
  },
  bodyBtn: {
    width: '290px',
    height: '55px',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#61DAFB',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    borderRadius: '10px',
    padding: '10px',
    height: '35px',
    fontFamily: 'Segoe UI',
  },
  txt: {
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    fontFamily: 'Segoe UI',
    padding: '10px',
  },
  lista: {
    backgroundColor: '#181F25',
    width: '290px',
    height: '330px',
    color: '#fff',
    borderRadius: '5px',
    marginBottom: '15px',
    padding: '15px',
    fontFamily: 'Segoe UI',
    flexDirection: 'column-reverse',
  },
});
