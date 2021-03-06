import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { CheckBox } from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorLabel from '../../components/ErrorLabel';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import moment from 'moment'
import { Picker } from '@react-native-community/picker';
import DocumentPicker from 'react-native-document-picker';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';

const options = [
  {Qualification: "Level 1"},
  {Qualification: "Level 2-Certificate in Coaching Football"},
  {Qualification: "Level 3-UEFA B Licence"},
  {Qualification: "Level 4-UEFA A Licence"},
  {Qualification: "Level 5-UEFA Pro Licence"},
]


const AddTeam = (props) => {
  const formikRef = useRef()

  const [postTeamReq, postQulifications] = useAxios({
    url: '/Users/SaveQualification',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      innerRef={(r) => formikRef.current = r}
      initialValues={{
        qualifications: props.navigation.getParam("Qualifications"),
      }}
      validate={(values) => {
        const errors = {}

        if (!values.qualifications) errors.qualifications = 'Required'

        return errors
      }}
      onSubmit={values => {
        postQulifications({ data: values.qualifications })
        .then(() => getUserData())
        .then((r) => {
          dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
          console.log(r.data)
          NavigationService.goBack()
        })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <>
          <View style={{ flex: 1 }}>
            <HeaderClosePlus
              isLoading={postTeamReq.loading || getUserReq.loading}
              isSaveButton={true}
              saveOnPress={handleSubmit}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ flexGrow: 1, padding: 30 }}>
              <View style={{ flexGrow: 1 }}>
                {options.map(option => {
                  const fn = () => {
                    const found = values.qualifications.findIndex(i => option.Qualification == i.Qualification)
                    if (found == -1) {
                      setFieldValue('qualifications', [...values.qualifications, option])
                    } else {
                      setFieldValue('qualifications', [...values.qualifications.filter((_, idx) => idx != found)])
                    }
                  }
                  return (
                    <View style={{ height: '10%', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                      <TouchableOpacity
                        style={{ justifyContent: 'flex-start', width: '95%' }}
                        onPress={fn}>
                        <View style={{ marginLeft: '5%', flex: 1, alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 16, padding: '3%' }}>{option.Qualification}</Text>
                        </View>
                      </TouchableOpacity>
                      <CheckBox
                        style={{ width: '5%' }}
                        checked={values.qualifications.find(i => i.Qualification == option.Qualification) != null}
                        onPress={fn} />
                    </View>
                  );
                })}
              </View>
              {errors.qualifications && touched.qualifications && <ErrorLabel text={errors.qualifications} />}

            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
