// LoginPage.js
import React, {Component} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
const {height, width} = Dimensions.get('window');
var base64 = require('base-64');
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleLogin = () => {
    console.log('1');
    const {username, password} = this.state;

    var token = base64.encode(username + ':' + password);

    var obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token,
        Origin: 'https://intranet.greenkogroup.com',
      },
    };

    var url =
      'https://k8s011kyf3.execute-api.ap-south-1.amazonaws.com/prod/api/login';
    console.log(url, obj);
    fetch(url, obj)
      .then(res => {
        return res.json();
      })
      .then(async json => {
        if (json?.res) {
          this.setState({loading: false});
          await AsyncStorage.setItem('USER', JSON.stringify(json.res['data']));
          this.props.navigation.push('AppStack', {
            screen: 'Home',
          });
        } else {
          this.setState({loading: false});

          var error = json?.errors[0].message;
          Alert.alert('Alert !', error);
        }
      })
      .catch(error => {
        this.setState({loading: false});

        console.error('Error:', error);
      });
  };

  render() {
    return (
      <LinearGradient
        colors={['#EBDEF0', '#C39BD3', '#76448A']}
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <KeyboardAwareScrollView
            scrollEnabled={true}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: width * 0.9,
              }}>
              <Image
                source={require('../assets/login.png')}
                resizeMode="contain"
                style={{
                  maxWidth: width * 0.55,
                  alignSelf: 'center',
                  marginBottom: '4%',
                }}
              />

              <TextInput
                style={styles.input}
                label="Username"
                onChangeText={username => this.setState({username})}
                value={this.state.username}
                Type="outlined"
              />

              <TextInput
                style={styles.input}
                label="Password"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
                Type="outlined"
              />

              <TouchableOpacity
                style={styles.btnView}
                disabled={
                  this.state.username == '' && this.state.password == ''
                }
                onPress={() => this.handleLogin()}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                  paddingTop: 18,
                }}>
                Forgot Password ?
              </Text>

              <TouchableOpacity style={{...styles.btnView, marginTop: '5%'}}>
                <Text style={styles.btnText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.btnView,
                  marginTop: '5%',
                  backgroundColor: '#D2B4DE',
                  margin: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/search.png')}
                  resizeMode="contain"
                  style={{
                    maxWidth: width * 0.1,
                    alignSelf: 'center',
                    height: 20,
                  }}
                />
                <Text style={{...styles.btnText, color: '#76448A'}}>
                  Login with gmail
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default Login;
