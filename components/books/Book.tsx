import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Book = ({title, author, datePublished, cover, description}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Text>{datePublished}</Text>
      <Text>{cover}</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default Book

const styles = StyleSheet.create({

})