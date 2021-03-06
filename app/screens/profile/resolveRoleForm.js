import React from 'react'
import { AboutMeCoachForm, BankAccountForm, TrainingLocationForm, TravelForm, AvailabiltyForm } from './CoachProfile'
import PlayerProfile from './Profile'

const resolveRoleForm = (profile, formName = "AboutMe", params, attachFn) => {
    if (!profile) return <></>
    if ("Role" in profile == false) return <></>

    if (formName == "AboutMe") {
        if (profile.Role == "Coach") {
            return <AboutMeCoachForm />
        }
        if (profile.Role == "Player") {
            return <PlayerProfile {...params} />
        }
    }

    if (formName == "BankAccount") {
        return <BankAccountForm setSubmitFn={attachFn}/>
    }

    if (formName == "TrainingLocation") {
        return <TrainingLocationForm {...params} />
    }

    if (formName == "Travel") {
        return <TravelForm />
    }
    if (formName == "Availavility") {
        return <AvailabiltyForm />
    }

    return false
}

export default resolveRoleForm;