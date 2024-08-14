import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyBooksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyBooksScreen</Text>
    </View>
  )
}

export default MyBooksScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#942',
        alignItems: 'center',
        justifyContent: 'center',
    },
})