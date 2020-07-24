import React, { Component, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../constants/image';
import styles from './information/information-style';
import { Icon } from 'native-base';
import NavigationService from '../../../navigation/NavigationService';
import Dimension from '../../../constants/dimensions';
import Menu from 'react-native-material-menu';
import TeachingCard from '../components/subcomponents/TeachingCard';
import Colors from '../../../constants/color';
import moment from 'moment';
import Tabs from './information/Tabs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'

const _format = 'ddd, MMM DD, YYYY';
const _today = moment();
const timer = [
  { id: 1, time: '09:00 am to 11:00 am' },
  { id: 2, time: '10:00 am to 12:00 pm' },
  { id: 3, time: '11:00 am to 01:00 pm' },
  { id: 4, time: '12:00 pm to 02:00 pm' },
  { id: 5, time: '01:00 pm to 03:00 pm' },
  { id: 6, time: '02:00 pm to 04:00 pm' },
  { id: 7, time: '03:00 pm to 05:00 pm' },
];
let _menu = null;
const showMenu = () => {
  _menu.show();
};
const hideMenu = () => {
  _menu.hide();
};


const BookNow = ({ navigation: { state: { params: { coach } } } }) => {
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

  const [profile] = useGlobalState('profile')

  const [date, setDate] = useState(_today)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState()
  const [time, setTime] = useState()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState()

  const [availableTimePerCoach, getUserData] = useAxios({
    url: '/Users/GetAvailableTimeByCoachId',
    method: 'POST',
    data: {
      "coachID": coach.Id,
      "date": date.toDate().toISOString()
    }
  })

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topContain}>
        <View style={[styles.orgView, { height: Dimension.px200 - 25 }]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon
              onPress={() => NavigationService.goBack()}
              name="close"
              type="MaterialIcons"
              style={{ fontSize: 25, color: 'white', padding: 10 }}
            />
            <TouchableOpacity
              onPress={() => NavigationService.navigate('PaymentConcent', { coach, selectedLocation })}>
              <Text style={{ color: 'white', fontSize: 18, padding: 10 }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <Image source={Images.MessiPlayer} style={styles.userImg} />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 15 }}>
              {profile.FullName}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={(d) => {
              setDate(moment(date))
              setIsDatePickerVisible(false)
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
          <TouchableOpacity
            onPress={() => setIsDatePickerVisible(true)}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18 }}>{date.format(_format)}</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{ fontSize: 30, color: 'white' }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.whenView}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>When?</Text>
          <Menu
            ref={(ref) => (_menu = ref)}
            style={{ maxHeight: 225 }}
            button={
              <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => {
                  showMenu();
                }}>
                <Text style={{ fontSize: 15 }}>
                  {time ? time : 'Select Time'}
                </Text>
                <Icon
                  name="arrow-drop-down"
                  type="MaterialIcons"
                  style={{ fontSize: 30, color: 'lightgray' }}
                />
              </TouchableOpacity>
            }>
            <ScrollView showsVerticalScrollIndicator={false}>
              {timer.map((objs, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({ time: objs.time });
                      hideMenu();
                    }}
                    style={{
                      width: Dimension.deviceWidth - 75,
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      borderBottomWidth: 0.5,
                      borderColor: 'lightgray',
                      height: 45,
                    }}>
                    <Text
                      style={{
                        marginLeft: 8,
                        fontWeight: objs.time === time ? '600' : '400',
                      }}>
                      {objs.time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Menu>
        </View>
        <View style={styles.whenView}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>Where?</Text>
        </View>

        <View style={styles.tabContain}>
          <Tabs
            tabTitle={[
              { id: 1, title: 'PITCH AREA' },
              { id: 2, title: 'HOME AREA' },
            ]}
            selectedTab={selectedTab}
            activeColor={activeColor}
            inActiveColor={inActiveColor}
            onChangeTab={(index) => setSelectedTab(index)}
          />
        </View>

        {selectedTab === 0 && (
          <>
            {coach.TrainingLocations.length != 0 && (
              <TeachingCard selectedItem={selectedLocation} onPress={(i) => setSelectedLocation(i)} data={coach.TrainingLocations.map(i => ({
              id: i.Id,
              title: i.LocationName,
              subTitle: i.LocationAddress,
            }))} />
            )}
            {coach.TrainingLocations.length == 0 && <Text style={{ color: Colors.s_blue, fontSize: 14 }}>Where?</Text>}
          </>
        )}

        {selectedTab === 1 && (
          <>
            {coach.TrainingLocations.length != 0 && (
              <TeachingCard selectedItem={selectedLocation} onPress={(i) => setSelectedLocation(i)} data={profile.TrainingLocations.length == 0 ? [] : profile.TrainingLocations.map(i => ({
                id: i.Id,
                title: i.LocationName,
                subTitle: i.LocationAddress,
              }))} />
            )}
            {coach.TrainingLocations.length == 0 && <Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Training Locations</Text>}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default BookNow;
