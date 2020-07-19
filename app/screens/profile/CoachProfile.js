import React, { Component, useState, useEffect } from 'react'
import { View, StatusBar, FlatList, Image, Text, ScrollView, TouchableOpacity, Dimensions, Switch, TextInput } from 'react-native'
import { CheckBox, Icon } from 'native-base';
import Header from '../../components/header/Header'
import { Picker } from '@react-native-community/picker';
import Images from "../../constants/image";
import styles from "./CoachStyle";
import NavigationService from '../../navigation/NavigationService';
import NLToggleButton from '../../components/NLToggleButton';
import { getGlobalState, useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import { axiosInstance } from '../../api/AxiosBootstrap';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { Formik, FieldArray } from 'formik';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel';
import Modal from 'react-native-modal';
import FuzzySearch from 'fuzzy-search';
import Colors from '../../constants/color.js';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { pickImage } from '../../helpers/ImagePicker';
var Color = require('color');

const signupSegments = ['ABOUT ME', 'BANK ACCOUNT', 'AVAILABILITY', 'TRAINING LOCATION', 'TRAVEL']
const TEXT_COLOR = 'gray'
const Width = Dimensions.get('window').width;

class MultiStep extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectedSegmentIndex: 0,
            selectedRole: "individual",
            showTimerPickerFor: null,
            selected_start_date: null,
            selected_end_date: null,
            is_enable_sunday: false,
            is_enable_monday: false,
            is_enable_tuesday: false,
            is_enable_wednesday: false,
            is_enable_thursday: false,
            is_enable_friday: false,
            is_enable_saturday: false,
        };
    }

    componentDidMount() {
        const profile = getGlobalState('profile')

        AsyncStorage.getItem('ProfilePic')
            .then((s) => {
                if (!s) return
                this.setState({ profilePic: JSON.parse(s) })
            })

        if (profile.Availabilities && profile.Availabilities.length != 0) {
            profile.Availabilities.map(day => {
                if (day.Day == "Sunday") {
                    this.setState({ is_enable_sunday: true, start_sunday: moment(day.FromTime).toDate(), end_sunday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Monday") {
                    this.setState({ is_enable_monday: true, start_monday: moment(day.FromTime).toDate(), end_monday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Tuesday") {
                    this.setState({ is_enable_tuesday: true, start_tuesday: moment(day.FromTime).toDate(), end_tuesday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Wednesday") {
                    this.setState({ is_enable_wednesday: true, start_wednesday: moment(day.FromTime).toDate(), end_wednesday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Thursday") {
                    this.setState({ is_enable_thursday: true, start_thursday: moment(day.FromTime).toDate(), end_thursday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Friday") {
                    this.setState({ is_enable_friday: true, start_friday: moment(day.FromTime).toDate(), end_friday: moment(day.ToTime).toDate() })
                }
                if (day.Day == "Saturday") {
                    this.setState({ is_enable_saturday: true, start_saturday: moment(day.FromTime).toDate(), end_saturday: moment(day.ToTime).toDate() })
                }
            })

        }

    }

    setShowTimePickerFor = (key) => this.setState({ showTimerPickerFor: key })
    setTimeFor = (key, date) => this.setState({ [key]: date }, (c) => console.log(c))

    toggleSwitchSunday = (cb) => this.setState({
        is_enable_sunday: !this.state.is_enable_sunday ? true : false
    }, cb)
    toggleSwitchMonday = (cb) => this.setState({
        is_enable_monday: !this.state.is_enable_monday ? true : false
    }, cb)
    toggleSwitchTuesday = (cb) => this.setState({
        is_enable_tuesday: !this.state.is_enable_tuesday ? true : false
    }, cb)
    toggleSwitchWednesday = (cb) => this.setState({
        is_enable_wednesday: !this.state.is_enable_wednesday ? true : false
    }, cb)
    toggleSwitchThursday = (cb) => this.setState({
        is_enable_thursday: !this.state.is_enable_thursday ? true : false
    }, cb)
    toggleSwitchFriday = (cb) => this.setState({
        is_enable_friday: !this.state.is_enable_friday ? true : false
    }, cb)
    toggleSwitchSaturday = (cb) => this.setState({
        is_enable_saturday: !this.state.is_enable_saturday ? true : false
    }, cb)

    handleOnCardPress = ({ title, data, screen = "EditInput", }) => {
        NavigationService.navigate(screen, {
            title,
            data,
            cb: (achievements) => { },
        })
    }


    render() {
        return (
            <View keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
                <Header
                    toggleDrawer={this.props.navigation.toggleDrawer}
                    hideCreatePost={true}
                    customButton={() => {
                        return <Text
                            onPress={() => {
                                const promises = []
                                const config = {
                                    url: '/Users/SaveAvailability',
                                    method: 'POST',
                                }
                                if (this.state.start_sunday && this.state.end_sunday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Sunday",
                                            "fromTime": this.state.start_sunday,
                                            "toTime": this.state.end_sunday
                                        }
                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                if (this.state.start_monday && this.state.end_monday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Monday",
                                            "fromTime": this.state.start_monday,
                                            "toTime": this.state.end_monday
                                        }
                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                if (this.state.start_wednesday && this.state.end_wednesday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Wednesday",
                                            "fromTime": this.state.start_wednesday,
                                            "toTime": this.state.end_wednesday
                                        }

                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                if (this.state.start_tuesday && this.state.end_tuesday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Tuesday",
                                            "fromTime": this.state.start_tuesday,
                                            "toTime": this.state.end_tuesday
                                        }

                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)

                                }

                                if (this.state.start_thursday && this.state.end_thursday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Thursday",
                                            "fromTime": this.state.start_thursday,
                                            "toTime": this.state.end_thursday
                                        }
                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                if (this.state.start_friday && this.state.end_friday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Friday",
                                            "fromTime": this.state.start_friday,
                                            "toTime": this.state.end_friday
                                        }
                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                if (this.state.start_saturday && this.state.end_saturday) {
                                    const p = axiosInstance({
                                        ...config,
                                        data: {
                                            "day": "Saturday",
                                            "fromTime": this.state.start_saturday,
                                            "toTime": this.state.end_saturday
                                        }
                                    })
                                        .then((r) => {
                                            console.log(r.data)
                                        })
                                    promises.push(p)
                                }

                                Promise.all(promises)
                                    .then(() => axiosInstance({ url: '/Users/GetUser' }))
                                    .then((r) => {
                                        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                                        props.navigation.navigate(Screen.LandingPage)
                                    })

                            }}
                            style={{ color: 'white', fontSize: 18 }}>Save</Text>
                    }}
                />
                {this.containerView()}
            </View>

        )
    }

    handleContainerScroll = async (event) => {
        let _index = event.nativeEvent.contentOffset.x / Dimensions.get('window').width
        if (_index == Math.round(_index)) {
            this.setState({
                selectedSegmentIndex: Math.round(_index)
            })
            this.segmentFlatList.scrollToIndex({ index: Math.round(_index), animated: true })
        }
    }
    //bank account
    bankAccount() {
        return (<BankAccountForm />)
    }

    //travel
    //bank account
    travel() {
        return (<TravelForm />)
    }


    about() {
        const profile = getGlobalState('profile')

        return (
            <ScrollView>
                <View style={styles.containerAbout}>
                    <TouchableOpacity
                        onPress={async () => {
                            const source = await pickImage();
                            this.setState({ profilePic: source })
                            AsyncStorage.setItem('ProfilePic', JSON.stringify(source))
                        }}
                        style={{ position: 'relative', justifyContent: 'center', flexDirection: 'row', width: '25%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Image
                            source={this.state.profilePic ? { uri: this.state.profilePic.uri } : 'https://cdn5.vectorstock.com/i/1000x1000/06/34/soft-abstract-swoosh-wave-lines-border-layout-grey-vector-22850634.jpg'}
                            style={styles.profileImage}
                        />
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            width: Dimension.px30,
                            height: Dimension.px30,
                            backgroundColor: Colors.s_blue,
                            borderRadius: Dimension.px30 / 2,
                            right: 0,
                            top: 3,
                        }}>
                            <Icon
                                type="EvilIcons"
                                name="pencil"
                                style={{ color: 'white', fontSize: 25 }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleOnCardPress({ title: "About Me", data: profile.AboutUs })}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>About me</Text>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.profileDescription}>{profile.AboutUs}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleOnCardPress({ title: "Accomplishment", data: profile.Accomplishment })}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>Accomplishment</Text>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.profileDescription}>
                                    {profile.Accomplishment}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => {
                            NavigationService.navigate('AddExperience', {
                                title: 'Add Experience',
                                cb: (team) => { }
                            })
                        }}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>Experience</Text>
                                <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: Colors.s_yellow }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.cardContainer}>
                            {profile.Experiences.map(e => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        NavigationService.navigate('AddExperience', {
                                            title: 'Add Experience',
                                            cb: (team) => { },
                                            ...e
                                        })
                                    }}>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                                            <View style={styles.editView}>
                                                <Text style={{ fontWeight: 'bold' }}>{e.Club}</Text>
                                                <Icon
                                                    type="EvilIcons"
                                                    name="pencil"
                                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                                />
                                            </View>
                                            <Text>{e.JobPosition}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>{moment(e.StartDate).format('DD MMM YYYY')}</Text>
                                                <Text>{' '}To{' '}</Text>
                                                <Text>{moment(e.EndDate).format('DD MMM YYYY')}</Text>
                                            </View>
                                            <Text>Currently Working? {e.CurrentlyWorking ? 'Yes' : 'No'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => {
                            NavigationService.navigate('AddQualifications', {
                                title: 'Add Experience',
                                cb: (team) => { },
                                Qualifications: profile.Qualifications
                            })
                        }}>
                            <View style={styles.cardInner}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textProfile}>Qualifications</Text>
                                    {profile.DBSCeritificate && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                                </View>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                            {profile.Qualifications && (
                                <View style={styles.cardContainer}>
                                    {profile.Qualifications.map(q => {
                                        return <Text style={styles.profileDescription}>{q.Qualification}</Text>
                                    })}
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => {
                            NavigationService.navigate('AddDbsCertificate', {
                                title: 'Add Experience',
                                cb: (team) => { },
                                ...profile.DBSCeritificate
                            })
                        }}>
                            <View style={styles.cardInner}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textProfile}>DBS Certificate</Text>
                                    {profile.DBSCeritificate && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                                </View>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => {
                            NavigationService.navigate('VerificationId', {
                                title: 'Add Experience',
                                cb: (team) => { },
                                ...profile.VerificationDocument
                            })
                        }}>
                            <View style={styles.cardInner}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textProfile}>Valid ID</Text>
                                    {profile.VerificationDocument && <Icon name='check' type='Feather' style={{ marginLeft: '5%', fontSize: 20, color: 'green' }} />}
                                </View>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.handleOnCardPress({ title: "Price Per Hour", data: profile.Rate })}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>Price Per Hour</Text>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 25 }}
                                />
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.profileDescription}>$ {profile.Rate}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }


    //tracking location
    trackingLocation() {
        return (<TrainingLocationFrom />)
    }


    containerView() {
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{
                    flex: 1,
                    marginTop: 45
                }}
                    keyboardShouldPersistTaps="handled"
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={(scrollView) => { this.containerScrollView = scrollView }}
                    onScroll={this.handleContainerScroll}
                    scrollEventThrottle={16}
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.about()}
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.bankAccount()}
                    </View>

                    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexg: 1 }}>
                        <View style={{
                            flex: 1,
                            width: Dimensions.get('window').width
                        }}>
                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Sunday</Text>
                                    <NLToggleButton
                                        active={this.state.is_enable_sunday}
                                        onPress={() => this.toggleSwitchSunday()}
                                    />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_sunday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_sunday} onSelected={(d) => this.setTimeFor("start_sunday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_sunday} onSelected={(d) => this.setTimeFor("end_sunday", d)} />
                                    </View>
                                )}

                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Monday</Text>
                                    <NLToggleButton active={this.state.is_enable_monday} onPress={this.toggleSwitchMonday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_monday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_monday} onSelected={(d) => this.setTimeFor("start_monday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_monday} onSelected={(d) => this.setTimeFor("end_monday", d)} />
                                    </View>
                                )}
                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Tuesday</Text>
                                    <NLToggleButton active={this.state.is_enable_tuesday} onPress={this.toggleSwitchTuesday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_tuesday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_tuesday} onSelected={(d) => this.setTimeFor("start_tuesday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_tuesday} onSelected={(d) => this.setTimeFor("end_tuesday", d)} />
                                    </View>
                                )}
                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Wednesday</Text>
                                    <NLToggleButton active={this.state.is_enable_wednesday} onPress={this.toggleSwitchWednesday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_wednesday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_wednesday} onSelected={(d) => this.setTimeFor("start_wednesday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_wednesday} onSelected={(d) => this.setTimeFor("end_wednesday", d)} />
                                    </View>
                                )}
                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Thursday</Text>
                                    <NLToggleButton active={this.state.is_enable_thursday} onPress={this.toggleSwitchThursday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_thursday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_thursday} onSelected={(d) => this.setTimeFor("start_thursday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_thursday} onSelected={(d) => this.setTimeFor("end_thursday", d)} />
                                    </View>
                                )}
                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Friday</Text>
                                    <NLToggleButton active={this.state.is_enable_friday} onPress={this.toggleSwitchFriday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_friday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_friday} onSelected={(d) => this.setTimeFor("start_friday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_friday} onSelected={(d) => this.setTimeFor("end_friday", d)} />
                                    </View>
                                )}
                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <View style={{
                                    height: 60,
                                    width: '100%',
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text>Saturday</Text>
                                    <NLToggleButton active={this.state.is_enable_saturday} onPress={this.toggleSwitchSaturday} />
                                </View>
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    height: 1,
                                    marginHorizontal: 15
                                }} />
                                {this.state.is_enable_saturday && (
                                    <View style={styles.collapsedView}>
                                        <TimeInput value={this.state.start_saturday} onSelected={(d) => this.setTimeFor("start_saturday", d)} />
                                        <Text>TO</Text>
                                        <TimeInput value={this.state.end_saturday} onSelected={(d) => this.setTimeFor("end_saturday", d)} />
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.trackingLocation()}
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        width: Dimensions.get('window').width
                    }} >
                        {this.travel()}
                    </View>

                </ScrollView>
                <FlatList style={{
                    height: 40,
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                }}
                    ref={(ref) => {
                        this.segmentFlatList = ref
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(_, idx) => `${idx}-item`}
                    data={signupSegments}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                width: Dimensions.get('window').width / 3,
                                height: 40
                            }}
                                onPress={() => {
                                    this.setState({
                                        selectedSegmentIndex: index
                                    })
                                    this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * index })
                                }} >
                                <Text style={{
                                    color: this.state.selectedSegmentIndex == index ? '#6644bb' : TEXT_COLOR,
                                    textAlign: 'center'
                                }}>{item}</Text>
                                {this.state.selectedSegmentIndex == index && <View style={{
                                    position: 'absolute',
                                    height: 3,
                                    bottom: 0,
                                    width: '100%',
                                    backgroundColor: '#6644dd'
                                }} />}
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }
}

export default MultiStep

const TimeInput = ({ onSelected, value }) => {
    const [showPicker, setShowPicker] = useState();
    const [date, setDate] = useState(value);

    return (
        <>
            {showPicker && (
                <DateTimePicker
                    mode="time"
                    value={date || new Date()}
                    format="DD-MM-YYYY"
                    placeholder={'Select Date'}
                    showIcon={false}
                    cancelBtnText="Cancel"
                    confirmBtnText="Confirm"
                    onChange={(_, d) => {
                        setShowPicker(false)
                        setDate(d)
                        onSelected(d)
                    }}
                />
            )}
            <TouchableOpacity style={{ width: '40%' }} onPress={() => setShowPicker(true)}>
                <View style={styles.collapsedViewInner}>
                    <TextInput style={{ color: 'black' }} editable={false} value={date ? moment(date).format("hh:mm A") : undefined} placeholder={"12:00 PM"}></TextInput>
                </View>
            </TouchableOpacity>
        </>
    );
}

const TravelForm = () => {
    const [showModal, setShowModal] = useState(false)
    const [searcher, setSearcher] = useState(null)
    const [valuesToShow, setValuesToShow] = useState([])

    const [{ data, loading, error }] = useAxios({
        url: '/Users/GetPostCodes',
    })

    useEffect(() => {
        if (!data) return
        const fakeData = [{ postCode: 'jks86f' }, { postCode: '86dosoj' }]
        setValuesToShow(fakeData)
        setSearcher(new FuzzySearch(fakeData, ['postCode']))
    }, [loading]);

    if (loading) {
        return <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>Loading...</Text>;
    }

    return (
        <View style={styles.containerCommon}>
            <Formik
                initialValues={{ codes: [] }}
                validate={(values) => {
                    const errors = {}

                    if (values.codes.length == 0) errors.codes = 'Required'

                    return errors
                }}
                onSubmit={values => {
                    login({ data: values })
                        .then((r) => {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                            return getUserData()
                        })
                        .then((r) => {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                            props.navigation.navigate(Screen.LandingPage)
                        })
                        .catch((r) => console.log(r))
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        <View>
                            <Text style={{ fontSize: 12, color: "blue" }}>Travel Details</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your travel details below</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                            <TextInput placeholder={"Search"} />
                        </View>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey", padding: '5%' }}>
                                <Text style={{ color: 'gray' }}>Select post code...</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            {values.codes.map(c => {
                                return (<Text>{c}</Text>);
                            })}
                        </View>
                        <Modal
                            onBackdropPress={() => setShowModal(false)}
                            isVisible={showModal}
                            style={styles.modal}>
                            <View style={{ backgroundColor: 'white', height: '100%' }}>
                                <View style={{ marginBottom: '5%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TextInput style={{ flex: 1, marginLeft: '5%' }} placeholder="Type a post code" onChangeText={(text) => {
                                        console.log('callked')
                                        setValuesToShow(searcher.search(text));
                                    }} />
                                    <Text onPress={() => setShowModal(false)} style={{ fontSize: 20, paddingHorizontal: '5%' }}>X</Text>
                                </View>


                                <FieldArray
                                    name="codes"
                                    render={arrayHelpers => {
                                        return (
                                            <FlatList
                                                data={valuesToShow}
                                                keyExtractor={(_, idx) => `${idx}-item`}
                                                style={{ height: '100%' }}
                                                renderItem={({ item, index }) => {
                                                    const fn = () => {
                                                        const found = values.codes.findIndex(i => item.postCode == i)
                                                        if (found == -1) {
                                                            arrayHelpers.insert(index, item.postCode)
                                                        } else {
                                                            arrayHelpers.remove(found)
                                                        }
                                                    }
                                                    return (
                                                        <View style={{ justifyContent: 'space-between', width: '95%', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                                                            <TouchableOpacity
                                                                style={{ justifyContent: 'flex-start', width: '95%' }}
                                                                onPress={fn}>
                                                                <View style={{ marginLeft: '5%', flex: 1, alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 16, padding: '3%' }}>{item.postCode}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <CheckBox
                                                                style={{ width: '5%' }}
                                                                checked={values.codes.includes(item.postCode)}
                                                                onPress={fn} />
                                                        </View>
                                                    );
                                                }}
                                            />
                                        );
                                    }}

                                />
                            </View>
                        </Modal>
                    </>
                )}
            </Formik>
        </View>
    );
}


const TrainingLocationFrom = () => {
    const [showModal, setShowModal] = useState(false)
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const [profile] = useGlobalState('profile')
    const [{ data, loading, error }, doPost] = useAxios({
        url: '/Users/SaveTrainingLocation',
        method: 'POST',
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexg: 1 }}>
            <Formik
                initialValues={{ locationName: '', address: '', file: null }}
                validate={(values) => {
                    const errors = {}

                    if (!values.locationName) errors.locationName = 'Required'
                    if (!values.address) errors.address = 'Required'
                    if (!values.file) errors.file = 'Required'

                    return errors
                }}
                onSubmit={values => {
                    doPost({
                        data: {
                            "locationName": values.locationName,
                            "locationAddress": values.address,
                            "role": profile.Role,
                            "imageUrl": "string",
                            "playerOrCoachID": profile.Id
                        }
                    })
                        .then((r) => {
                            console.log(r.data)
                            return AsyncStorage.setItem(`Location-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
                        })
                        .then(r => getUserData())
                        .then((r) => {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                            NavigationService.goBack()
                        })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        <View style={styles.containerCommon}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder={"Location Name"}
                                    onChangeText={handleChange('locationName')}
                                    onBlur={handleBlur('locationName')}
                                    value={values.locationName}
                                />
                            </View>
                            {errors.locationName && touched.locationName && <ErrorLabel text={errors.locationName} />}

                            <View style={{ height: 60 }}>
                                <GooglePlacesAutocomplete
                                    placeholder={'Search'}
                                    listViewDisplayed='true'
                                    getDefaultValue={() => ''}
                                    fetchDetails={true}
                                    GooglePlacesDetailsQuery={{ fields: 'formatted_address,geometry' }}
                                    debounce={300}
                                    styles={{
                                        listView: {
                                            position: 'absolute',
                                            backgroundColor: 'white'
                                        }
                                    }}
                                    onPress={(data, details = null) => {
                                        setCurrentLocation({
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        })
                                        setFieldValue("address", data.description)
                                    }}
                                    query={{
                                        key: 'AIzaSyB21yZhxBVgSsRmFXnoJeFhWz_3WjCNt2M',
                                        language: 'en',
                                        components: 'country:gbr',
                                    }}
                                />
                            </View>
                            <View style={{ borderWidth: 1, height: 200 }}>
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        ...currentLocation,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    camera={{
                                        center: currentLocation,
                                        heading: 0,
                                        pitch: 10,
                                        zoom: 15,
                                        altitude: 10,
                                    }}
                                >
                                    <Marker
                                        coordinate={currentLocation}
                                        title={'Current Location'}
                                        description={"werw"}
                                    />
                                </MapView>
                            </View>

                            {errors.address && touched.address && <ErrorLabel text={errors.address} />}

                            <TouchableOpacity onPress={() => {
                                DocumentPicker.pick({
                                    type: [DocumentPicker.types.images],
                                })
                                    .then((file) => {
                                        setFieldValue('file', file)
                                    })
                            }}>
                                <View style={styles.inputContain}>
                                    <TextInput
                                        editable={false}
                                        style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15 }}
                                        placeholder="File"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('file')}
                                        onBlur={handleBlur('file')}
                                        value={values.file?.name}
                                    />
                                </View>
                            </TouchableOpacity>
                            {values.file && <Image style={{ height: 250, resizeMode: 'contain' }} source={{ uri: values.file?.uri }} />}
                            {errors.file && touched.file && <ErrorLabel text={errors.file} />}

                            <TouchableOpacity onPress={handleSubmit} style={[styles.buttonSave, loading && { backgroundColor: Color('rgb(255, 255, 255)').alpha(0.5) }]}>
                                <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
}

const BankAccountForm = () => {
    const [showModal, setShowModal] = useState(false)
    const [profile] = useGlobalState("profile")
    const [{ data, loading, error }, doPost] = useAxios({
        url: '/Users/SaveBankAccount',
        method: 'POST'
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    return (
        <>
            <ScrollView>
                <Formik
                    initialValues={{
                        bankName: profile?.BankAccount?.BankName || '',
                        holderName: profile?.BankAccount?.AccountName || '',
                        role: profile?.BankAccount?.AccountType || '',
                        sortCode: profile?.BankAccount?.Code || '',
                        accountNumber: profile?.BankAccount?.AccountNumber || ''
                    }}
                    validate={(values) => {
                        const errors = {}

                        if (!values.bankName) errors.bankName = 'Required'
                        if (!values.holderName) errors.holderName = 'Required'
                        if (!values.role) errors.role = 'Required'
                        if (!values.sortCode) errors.sortCode = 'Required'
                        if (!values.accountNumber) errors.accountNumber = 'Required'

                        return errors
                    }}
                    onSubmit={values => {
                        const data = {
                            "accountName": values.holderName,
                            "bankName": values.bankName,
                            "accountType": values.role,
                            "accountNumber": values.accountNumber,
                            "code": values.sortCode,
                        }
                        doPost({ data })
                            .then((r) => getUserData())
                            .then((r) => {
                                console.log(r.data)
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                            })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <>
                            <View style={styles.containerCommon}>
                                <View>
                                    <Text style={{ fontSize: 12, color: "blue" }}>Bank Account Details</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your bank account details below</Text>
                                </View>
                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Bank Name"}
                                        onChangeText={handleChange('bankName')}
                                        onBlur={handleBlur('bankName')}
                                        value={values.bankName}
                                    />
                                </View>
                                {errors.bankName && touched.bankName && <ErrorLabel text={errors.bankName} />}
                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Account Holder Name"}
                                        onChangeText={handleChange('holderName')}
                                        onBlur={handleBlur('holderName')}
                                        value={values.holderName}
                                    />
                                </View>
                                {errors.holderName && touched.holderName && <ErrorLabel text={errors.holderName} />}

                                <TouchableOpacity onPress={() => setShowModal(true)}>
                                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                        <TextInput
                                            style={{ color: values.role ? 'black': 'gray'}}
                                            editable={false}
                                            placeholder={"Select account type"}
                                            value={values.role}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {errors.role && touched.role && <ErrorLabel text={errors.role} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Sort code "}
                                        onChangeText={handleChange('sortCode')}
                                        onBlur={handleBlur('sortCode')}
                                        value={values.sortCode}
                                    />
                                </View>
                                {errors.sortCode && touched.sortCode && <ErrorLabel text={errors.sortCode} />}

                                <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                                    <TextInput
                                        placeholder={"Account number"}
                                        onChangeText={handleChange('accountNumber')}
                                        onBlur={handleBlur('accountNumber')}
                                        value={values.accountNumber}
                                    />
                                </View>
                                {errors.accountNumber && touched.accountNumber && <ErrorLabel text={errors.accountNumber} />}

                                <TouchableOpacity onPress={handleSubmit} style={[styles.buttonSave, loading && { backgroundColor: Color('rgb(255, 255, 255)').alpha(0.5) }]}>
                                    <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                onBackdropPress={() => setShowModal(false)}
                                isVisible={showModal}
                                style={styles.modal}>
                                <View style={{ backgroundColor: 'white' }}>
                                    <View style={{ marginBottom: '5%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text onPress={() => setShowModal(false)} style={{ fontSize: 20, paddingHorizontal: '5%' }}>X</Text>
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={() => {
                                        setFieldValue('role', "Current")
                                        setShowModal(false)
                                    }}>
                                        <Text style={{ fontSize: 26, borderTopWidth: 1 ,borderColor: 'rgba(0,0,0,0.2)',paddingHorizontal: '5%' }}>Current</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={() => {
                                        setFieldValue('role', "Saving")
                                        setShowModal(false)
                                    }}>
                                        <Text style={{ fontSize: 26, borderTopWidth: 1 ,borderColor: 'rgba(0,0,0,0.2)',paddingHorizontal: '5%' }}>Saving</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </>
    );
}