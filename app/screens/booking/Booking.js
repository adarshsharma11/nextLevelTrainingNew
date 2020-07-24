import React, { Component } from 'react'
import { View, StatusBar, FlatList } from 'react-native'
import Header from '../../components/header/Header'
import BookCard from './components/BookCard'
import useAxios from 'axios-hooks'
import { Spinner } from 'native-base'
import Colors from '../../constants/color'
import { useGlobalState } from '../../state/GlobalState'


const Booking = (props) => {
  const [profile] = useGlobalState('profile')
  const [{ data, loading, error }, getBookings] = useAxios({
    url: '/Users/GetBookings',
    method: 'POST',
    data: {
      "userID": profile.Id,
      "role": "Player"
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Header hideCreatePost={true} toggleDrawer={props.toggleDrawer} navigate={props.navigation.navigate} />
      {loading && <Spinner size={80} color={Colors.s_yellow} />}
      {!loading && (
        <FlatList
          horizontal={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BookCard {...item} />
          )}
        />
      )}
    </View>
  )
}
export default Booking
