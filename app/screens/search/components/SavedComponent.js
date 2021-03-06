import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import PostSearchCard from './subcomponents/PostSearchCard'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../../state/GlobalState'
import NavigationService from '../../../navigation/NavigationService';
import { Spinner } from 'native-base'
import Colors from '../../../constants/color'

const SavedComponent = (props) => {
  const [profile] = useGlobalState('profile')

  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/GetCoaches`,
    method: 'POST',
    data: {
      "playerId": profile.Id,
      "search": ""
    }
  })

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', e => {
      searchCoaches({
        data: {
          "playerId": profile.Id,
          "search": ""
        }
      })
    });

    return unsubscribe;
  }, [props.navigation]);

  if (searchCoachesReq.loading) return <Spinner color={Colors.s_yellow} size={48} />

  return (
    <>
      <FlatList
        horizontal={false}
        data={searchCoachesReq.data ? searchCoachesReq.data.filter(c => c.Status == "Saved") : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostSearchCard
            {...item}
            onPress={() => NavigationService.navigate('Information', { ...item })}
            refreshCb={() => {
              searchCoaches({
                data: {
                  playerId: profile.Id,
                  search: ""
                }
              })
            }}
          />
        )}
      />
    </>
  )
}

export default SavedComponent
