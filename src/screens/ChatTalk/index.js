import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'

const ChatTalk = () => {
    return (
        <View>
            <Text>index</Text>
            <StatusBar barStyle={"auto"}/>
        </View>
    )
}

export default ChatTalk

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: StatusBar.currentHeight || 0,
      },
})
