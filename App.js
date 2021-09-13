import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';
import DatePicker from 'react-native-date-picker';

/*npx react-native run-android */

export default function App() {
  const [nombre, guardarInputTexto] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  /*const [apellido, guardarInputTexto] = useState('');
  const [correo, guardarInputTexto] = useState('');
  const [usuario, guardarInputTexto] = useState('');
  const [fecha, guardarInputTexto] = useState('');
  const [contra, guardarInputTexto] = useState('');*/
  const [lista, guardarlista] = useState([]);

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDato = async () => {
    try {
      const nombrealumno = {nombre};
      nombrealumno.id = shortid.generate();

      const listanombres = [...lista, nombrealumno];
      guardarlista(listanombres);
      const datos = JSON.stringify(listanombres);
      await AsyncStorage.setItem('listaalumnos', datos);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      const nombreStorage = await AsyncStorage.getItem('listaalumnos');
      if (nombreStorage) {
        guardarlista(JSON.parse(nombreStorage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDato = id => {
    try {
      const nombresFiltrados = lista.filter(nombre => nombre.id !== id);
      guardarlista(nombresFiltrados);
      guardarDato();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.contenedor}>
        <TextInput
        placeholderTextColor="black"
          placeholder="Escribe tu Nombre"
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />

        <TextInput
        placeholderTextColor="black"
          placeholder="Escribe tu Apellido"
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />

        <TextInput
        placeholderTextColor="black"
          placeholder="Escribe tu Correo"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />

        <TextInput
        placeholderTextColor="black"
          placeholder="Escribe tu Usuario"
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <TextInput
        placeholderTextColor="black"
          placeholder="Escribe tu contraseña"
          autoCompleteType="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={texto => guardarInputTexto(texto)}
        />

        <Button title="Guardar" color="#333" onPress={() => guardarDato()} />

        <Text style={styles.titulo}>
          {lista.length > 0 ? 'Lista de alumnos' : 'No hay alumnos, agrega uno'}
        </Text>

        <FlatList
          style={styles.item}
          data={lista}
          renderItem={({item}) => <Text>{item.nombre} </Text>}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 3,
    color: "black",
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
