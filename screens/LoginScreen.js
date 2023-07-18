import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Switch, Platform, TouchableWithoutFeedback, Text, Keyboard, Image, SafeAreaView, TouchableHighlight, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInModal, setSignInModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogin = async () => { //로그인 로직
    const storedUsername = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');

    if (ID === storedUsername && password === storedPassword) {
      setLoginModal(true);
    } else {
      setEmail('');
      setPassword('');
      Alert.alert('Invalid credentials');
    }
  };

  const handleRegister = async () => {
    navigation.navigate('Register'); // 회원가입 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: './free-icon-login-7856337.png' }} />
          </View>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <View style={styles.switchView}>
            <Text style={styles.switchText}>자동 로그인</Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={isEnabled}
              trackColor={{ true: 'blue' }}
              onValueChange={toggleSwitch}
            />
          </View>
          <TouchableHighlight onPress={handleLogin}>
            <View style={styles.btnContainer}>
              <Text style={styles.textStyle}>Log In</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginTop: 15 }} onPress={handleRegister}>
            <View style={styles.btnContainer}>
              <Text style={styles.textStyle}>Sign In</Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType='slide'
        transparent={true}
        visible={signInModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>준비중 입니다.</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setSignInModal(!signInModal);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={loginModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{ID === '' ? 'Error!' : `Welcome ${ID}!`}</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setLoginModal(!loginModal);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageView: {
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
  },
  inner: {
    padding: 24,
    flex: 1
  },
  textinput: {
    marginTop: 20,
    height: 40,
    borderColor: 'orange',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  switchText: {
    marginTop: 6,
    fontSize: 14
  },
  switchView: {
    marginBottom: 15,
    flexDirection: 'row'
  },
  btnContainer: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    borderColor: 'black',
    borderWidth: 1

  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});

export default LoginScreen;
