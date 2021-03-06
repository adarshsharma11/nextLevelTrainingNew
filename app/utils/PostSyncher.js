import Upload from 'react-native-background-upload'
import { getGlobalState } from '../state/GlobalState'

const FileSyncher = (fileObject, idToAttach, fileType="Post") => {
    const profile = getGlobalState('profile')
    const token = getGlobalState('token')
    const { uri } = fileObject

    const options = {
        url: 'http://44.233.116.105/NextLevelTrainingApi/api/Users/UploadFile',
        path: uri,
        method: 'POST',
        type: 'multipart',
        maxRetries: 2, // set retry count (Android only). Default 2
        field: "File",
        headers: {
            'content-type': 'multipart/form-data', // Customize content-type
            'Authorization': `Bearer ${token}`
        },
        parameters: {
            Type: fileType,
            Id: idToAttach
        },
        // Below are options only supported on Android
        notification: {
            enabled: false
        },
        useUtf8Charset: true
    }


    return Upload.startUpload(options).then((uploadId) => {
        console.log('Upload started')
        Upload.addListener('progress', uploadId, (data) => {
            console.log(`[${uri}] Progress: ${data.progress}%`)
        })
        Upload.addListener('error', uploadId, (data) => {
            console.log(`[${uri}] Error: ${JSON.stringify(data)}`)
        })
        Upload.addListener('cancelled', uploadId, (data) => {
            console.log(`[${uri}] Cancelled!`)
        })
        Upload.addListener('completed', uploadId, (data) => {
            // data includes responseCode: number and responseBody: Object
            console.log(`[${uri}] Completed!`)
            console.log(data)
        })
    }).catch((err) => {
        console.log('Upload error!', err)
    })
}

export default FileSyncher;