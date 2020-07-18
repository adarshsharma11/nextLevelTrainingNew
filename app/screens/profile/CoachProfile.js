import React, { Component, useState } from 'react'
import { View, StatusBar, FlatList, Image, Text, ScrollView, TouchableOpacity, Dimensions, Switch, TextInput } from 'react-native'
import Header from '../../components/header/Header'
import { Picker } from '@react-native-community/picker';
import Images from "../../constants/image";
import styles from "./CoachStyle";
import NavigationService from '../../navigation/NavigationService';
import NLToggleButton from '../../components/NLToggleButton';
import { getGlobalState } from '../../state/GlobalState';
import { axiosInstance } from '../../api/AxiosBootstrap';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

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
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={{ flex: 1 }}>
                <Header
                    toggleDrawer={this.props.navigation.toggleDrawer}
                    hideCreatePost={true}
                    customButton={() => {
                        return <Text
                            onPress={() => {
                                const config = {
                                    url: '/Users/SaveAvailability',
                                    method: 'POST',
                                }
                                if (this.state.start_sunday && this.state.end_sunday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_monday && this.state.end_monday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_wednesday && this.state.end_wednesday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_tuesday && this.state.end_tuesday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_thursday && this.state.end_thursday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_friday && this.state.end_friday) {
                                    axiosInstance({
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
                                }

                                if (this.state.start_saturday && this.state.end_saturday) {
                                    axiosInstance({
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
                                }

                            }}
                            style={{ color: 'white', fontSize: 18 }}>Save</Text>
                    }}
                />
                {this.containerView()}
            </View>

            </ScrollView>
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
        return (
            <ScrollView>
                <View style={styles.containerCommon}>
                    <View>
                        <Text style={{ fontSize: 12, color: "blue" }}>Bank Account Details</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your bank account details below</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <TextInput placeholder={"Bank Name"} />
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <TextInput placeholder={"Account Holder Name"} />
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <Picker
                            selectedValue={this.state.selectedRole}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ selectedRole: itemValue })
                            }>
                            <Picker.Item label="Individual" value="individual" />
                            <Picker.Item label="Company" value="company" />
                        </Picker>
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <TextInput placeholder={"Sort code "} />
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <TextInput placeholder={"Account number"} />
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: '#1111ff',
                        height: 30,
                        width: 70,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                        marginRight: 15,
                        borderRadius: 5,
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                selectedSegmentIndex: 2
                            })
                            this.segmentFlatList.scrollToIndex({ index: Math.round(2), animated: true })
                            this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 2 })
                        }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }

    //travel
    //bank account
    travel() {
        return (
            <ScrollView>
                <View style={styles.containerCommon}>
                    <View>
                        <Text style={{ fontSize: 12, color: "blue" }}>Travel Details</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: "lightgrey" }}>Please enter your travel details below</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <TextInput placeholder={"Search"} />
                    </View>
                    <View style={{ borderBottomWidth: 0.8, borderBottomColor: "lightgrey" }}>
                        <Picker
                            selectedValue={this.state.selectedRole}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ selectedRole: itemValue })
                            }>
                            <Picker.Item label="passcode1" value="individual" />
                            <Picker.Item label="passcode2" value="company" />
                        </Picker>
                    </View>
                </View>
            </ScrollView>

        )
    }


    about() {
        const profile = getGlobalState('profile')

        return (
            <ScrollView>
                <View style={styles.containerAbout}>
                    <View style={styles.ImageContainer}>
                        <Image source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/06/34/soft-abstract-swoosh-wave-lines-border-layout-grey-vector-22850634.jpg' }} style={styles.profileImage} />
                        <Image source={Images.RoundPencil} style={styles.profileEditIcon} />
                    </View>
                    <TouchableOpacity onPress={() => this.handleOnCardPress({ title: "About Me", data: profile.AboutUs })}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>About me</Text>
                                <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
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
                                <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.profileDescription}>
                                    {profile.Accomplishment}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>Experience</Text>
                            <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.profileDescription}>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <Text style={styles.textProfile}>Qualifications</Text>
                            <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.profileDescription}>ABCD cerificates</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textProfile}>DBS Certificate</Text>
                                <Image source={Images.Verified} style={{ height: 15, width: 15, marginLeft: 10 }} />
                            </View>
                            <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardInner}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text style={styles.textProfile}>Valid ID</Text>
                                <Image source={Images.NotVerified} style={{ height: 15, width: 15, marginLeft: 10 }} />
                            </View>
                            <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.handleOnCardPress({ title: "Price Per Hour", data: profile.Rate })}>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardInner}>
                                <Text style={styles.textProfile}>Price Per Hour</Text>
                                <Image source={Images.Pencil} style={{ height: 20, width: 20 }} />
                            </View>
                            <View style={styles.cardContainer}>
                                <Text style={styles.profileDescription}>$ {profile.Rate}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#1111ff',
                        height: 30,
                        width: 70,
                        marginBottom: 5,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                        marginRight: 15,
                        borderRadius: 5,
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                selectedSegmentIndex: 1
                            })
                            this.segmentFlatList.scrollToIndex({ index: Math.round(1), animated: true })
                            this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 1 })
                        }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }


    //tracking location
    trackingLocation() {
        return (
            <View style={styles.containerCommon}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder={"Location Name"} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder={"Address"} />
                </View>
                <TouchableOpacity style={styles.buttonSave}>
                    <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
                </TouchableOpacity>
            </View>
        )
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_sunday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_sunday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_monday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_monday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_tuesday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_tuesday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_wednesday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_wednesday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_thursday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_thursday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_friday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_friday", d)} />
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
                                    <TimeInput onSelected={(d) => this.setTimeFor("start_saturday", d)} />
                                    <Text>TO</Text>
                                    <TimeInput onSelected={(d) => this.setTimeFor("end_saturday", d)} />
                                </View>
                            )}
                        </View>

                        <TouchableOpacity style={{
                            backgroundColor: '#1111ff',
                            height: 30,
                            width: 70,
                            alignSelf: 'flex-end',
                            marginTop: 20,
                            marginRight: 15,
                            borderRadius: 5,
                            justifyContent: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    selectedSegmentIndex: 3
                                })
                                this.segmentFlatList.scrollToIndex({ index: Math.round(3), animated: true })
                                this.containerScrollView.scrollTo({ x: Dimensions.get('window').width * 3 })
                            }}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center'
                            }}>Skip</Text>
                        </TouchableOpacity>

                    </View>

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

const TimeInput = ({ onSelected }) => {
    const [showPicker, setShowPicker] = useState();
    const [date, setDate] = useState();
    const profile = getGlobalState('profile')

    console.log(profile)

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
                    <TextInput style={{ color: 'black'}} editable={false} value={date ? moment(date).format("H:mm A") : undefined} placeholder={"12:00 PM"}></TextInput>
                </View>
            </TouchableOpacity>
        </>
    );
}
