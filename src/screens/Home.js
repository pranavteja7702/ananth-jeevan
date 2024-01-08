import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import {Picker} from '@react-native-picker/picker';
import Micon from 'react-native-vector-icons/MaterialIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SModal from 'react-native-modal';
import Loader from '../Loader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: '',
      username: '',
      loading: false,
      tabSelected: 'Appointment',
      subjects: [
        {
          name: 'Subject A',
        },
        {
          name: 'Subject B',
        },
        {
          name: 'Subject C',
        },
        {
          name: 'Subject D',
        },
        {
          name: 'Subject e',
        },
        {
          name: 'Subject e',
        },
      ],
      selectedSubject: '',
      selectedMode: '',
      place: '',
      Modes: [
        {
          name: 'Mode A',
        },
        {
          name: 'Mode B',
        },
        {
          name: 'Mode C',
        },
        {
          name: 'Mode D',
        },
        {
          name: 'Mode e',
        },
        {
          name: 'Mode e',
        },
      ],
      isModalVisible: false,
      dateTime: false,
      seletedTime: new Date(),
      decription: '',
    };
    try {
      AsyncStorage.getItem('USER')
        .then(async value => {
          if (value != '' && value != null) {
            var user = JSON.parse(value);
            this.setState({
              Token: user.accessToken,
              username: user.name,
            });
          }
        })
        .done();
    } catch (error) {
      console.log(error);
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  _setSubject = subject => {
    this.setState({
      selectedSubject: subject,
    });
  };

  _setMode = mode => {
    this.setState({
      selectedMode: mode,
    });
  };

  _setDatetime = (event, date) => {
    const datetime =
      date || moment(this.state.seletedTime).format('DD/MM/YYYY');

    this.setState({
      seletedTime: datetime,
    });
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#f0f4ff', flex: 1}}>
        <View style={{backgroundColor: '#fff', elevation: 6}}>
          <Image
            source={require('../assets/login.png')}
            resizeMode="contain"
            style={{
              maxWidth: width * 0.55,
              height: 70,
              alignSelf: 'center',
            }}
          />
        </View>
        <ScrollView style={{paddingBottom: 60}}>
          <View
            style={{
              marginTop: '4%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#212F3D',
              }}>
              {this.state.username}
            </Text>
          </View>

          <View
            style={[
              {
                width: width,
                flexDirection: 'row',
                borderColor: '#ccc',
                justifyContent: 'space-evenly',
                alignSelf: 'center',
                marginTop: '5%',
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.setState({tabSelected: 'Appointment'})}>
              <Text
                style={[
                  this.state.tabSelected == 'Appointment'
                    ? styles.activeTab
                    : styles.tabstyle,
                  ,
                  {},
                ]}>
                Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({tabSelected: 'Emergency'})}>
              <Text
                style={[
                  this.state.tabSelected == 'Emergency'
                    ? styles.activeTab
                    : styles.tabstyle,
                ]}>
                Emergency
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.tabSelected == 'Appointment' ? (
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: width * 0.9,
              }}>
              <TouchableOpacity
                style={{
                  //   borderWidth: 0.5,
                  marginTop: '4%',
                  //   borderColor: '#ccc',
                }}>
                <Picker
                  selectedValue={this.state.selectedSubject}
                  mode="dropdown"
                  onValueChange={itemValue => this._setSubject(itemValue)}
                  style={{
                    ...styles.value,
                    textAlign: 'center',
                    color: '#000',
                    backgroundColor: '#fff',
                  }}>
                  <Picker.Item label="Select A Subject" value="" />
                  {this.state.subjects.map((item, index) => (
                    <Picker.Item label={item.name} value={item.name} />
                  ))}
                </Picker>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  //   borderWidth: 0.5,
                  marginTop: '4%',
                  //   borderColor: '#ccc',
                }}>
                <Picker
                  selectedValue={this.state.selectedMode}
                  mode="dropdown"
                  onValueChange={itemValue => this._setMode(itemValue)}
                  style={{
                    ...styles.value,
                    textAlign: 'center',
                    color: '#000',
                    backgroundColor: '#fff',
                  }}>
                  <Picker.Item label="Mode of Counselling" value="" />
                  {this.state.Modes.map((item, index) => (
                    <Picker.Item label={item.name} value={item.name} />
                  ))}
                </Picker>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({dateTime: true})}
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  marginTop: '4%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    paddingLeft: 20,
                    fontSize: 16,
                    color: '#000',
                    padding: 14,
                  }}>
                  {moment(this.state.seletedTime.toString()).format(
                    'DD/MM/YYYY',
                  )}
                </Text>
                <Micon
                  name="calendar-month"
                  size={20}
                  style={{paddingRight: 10}}
                />
              </TouchableOpacity>

              {this.state.dateTime ? (
                <RNDateTimePicker
                  mode="date"
                  value={this.state.seletedTime}
                  onChange={this._setDatetime}
                />
              ) : null}

              <TextInput
                placeholder="Enter Place"
                onChangeText={text => this.setState({place: text})}
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  marginTop: '4%',
                  paddingLeft: 20,
                  fontSize: 16,
                  color: '#000',
                }}
              />

              <TextInput
                placeholder="Briefly tell us your problem..."
                onChangeText={text => this.setState({decription: text})}
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  marginTop: '4%',
                  paddingLeft: 20,
                  fontSize: 16,
                  color: '#000',
                }}
              />

              {this.state.selectedMode != '' &&
              this.state.selectedSubject != '' &&
              this.state.place != '' ? (
                <TouchableOpacity
                  style={{...styles.btnView, marginTop: '5%'}}
                  onPress={() => this.setState({isModalVisible: true})}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ScrollView>

        <SModal
          testID="modal"
          animationInTiming={500}
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => console.log('Outof box pressed')}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={{
            justifyContent: 'center',
            margin: 0,
            width: width * 0.8,
            alignSelf: 'center',
            borderRadius: 4,
          }}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          onBackButtonPress={() => this.setState({isModalVisible: false})}>
          <View
            style={{backgroundColor: '#fff', borderRadius: 12, padding: 15}}>
            <View
              style={{
                marginTop: '2%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Micon
                name="check"
                size={50}
                color={'green'}
                // style={{paddingRight: 10}}
              />

              <Text style={{...styles.value, fontSize: 20}}>
                Appointment created successfully
              </Text>
            </View>

            <View style={{marginTop: '2%'}}>
              <Text style={{...styles.sideHeader}}>Subject</Text>
              <Text style={{...styles.value}}>
                {this.state.selectedSubject}
              </Text>
            </View>

            <View style={{marginTop: '2%'}}>
              <Text style={{...styles.sideHeader}}>Mode of Counselling</Text>
              <Text style={{...styles.value}}>{this.state.selectedMode}</Text>
            </View>

            <View style={{marginTop: '2%'}}>
              <Text style={{...styles.sideHeader}}>Time</Text>
              <Text style={{...styles.value}}>
                {moment(this.state.seletedTime.toString()).format(
                  'DD/MM/YYYY HH:MM',
                )}{' '}
              </Text>
            </View>

            <View style={{marginTop: '2%'}}>
              <Text style={{...styles.sideHeader}}>Place</Text>
              <Text style={{...styles.value}}>{this.state.place}</Text>
            </View>

            <View style={{marginTop: '2%'}}>
              <Text style={{...styles.sideHeader}}>Description</Text>
              <Text style={{...styles.value}}>{this.state.decription}</Text>
            </View>

            <TouchableOpacity
              style={{...styles.btnView, marginTop: '5%'}}
              onPress={() =>
                this.setState({
                  isModalVisible: false,
                  selectedMode: '',
                  selectedSubject: '',
                  place: '',
                  decription: '',
                })
              }>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </SModal>
        <Loader loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

export default Home;
