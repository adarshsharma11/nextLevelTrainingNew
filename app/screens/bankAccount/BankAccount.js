import React, { useState } from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { BankAccountForm } from '../profile/CoachProfile'
import { View, TouchableOpacity, Text } from 'react-native'
import { Spinner } from 'native-base'

const BankAccountScreen = (props) => {
    const [submitFn, setSubmitFn] = useState();
    const [isSaving, setIsSaving] = useState(false);

    return (
        <>
            <Header
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
                customButton={() => {
                    return (
                        <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                            {isSaving == true && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                            <TouchableOpacity
                                disabled={isSaving == true}
                                onPress={() => {
                                    setIsSaving(true)
                                    if (submitFn) {
                                        submitFn()
                                        .then(() => {
                                            setIsSaving(false)
                                        })
                                    }
                                }}>
                                <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
            <BankAccountForm
                setSubmitFn={(submitFn) => {
                    setSubmitFn(() => submitFn)
                }}
            />
        </>
    );
}

export default BankAccountScreen