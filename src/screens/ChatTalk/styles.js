import { StyleSheet, StatusBar } from "react-native";
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginTop: StatusBar.currentHeight || 0,
    },
    profileImg: {
      width: 40,
      height: 40,
      borderRadius: 50,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      paddingVertical: 10,
      borderColor: "#cfcfd1",
    },
    headerProfile: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    headerProfileInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    containerIconSend: {
      backgroundColor: "#000",
      padding: 5,
      borderRadius: 50,
      
    },
    inputMessage: {
      borderRadius: 10,
      alignItems:'center',
      flexDirection: 'row',
      paddingHorizontal: 5,
      borderTopWidth: 0
    },
  });
  
