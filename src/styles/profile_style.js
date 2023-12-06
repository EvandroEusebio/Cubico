import { StyleSheet } from 'react-native';
import { PRIMARY, BG_COLOR, TEXTCOLOR, BORDER } from './palette';

export const profile_style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        paddingTop: 40,
    },
    containerProfileDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 40,
        backgroundColor: '#000',
        marginHorizontal: 20,
        borderRadius: 20
    },
    imageProfile:{
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    Details:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        paddingLeft: 10
    },
    name:{
        fontSize: 23,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#fff'
    },
    PhoneNumber:{
        color: '#fff',
        
    },
    countDetails:{
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1
    },
    textDetails:{
        color: '#fff',
        fontSize: 10
    },
    containerResumeDetails:{
        gap: 6
    },
    resumeDetails:{
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingRight: 25,
        paddingBottom: 10
    },
    containerLinks:{
        marginHorizontal: 20,
        paddingVertical: 20
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom:30
    },
    containerItemLeft:{
        flexDirection: 'row',
        alignItems:'center',
        gap: 20,
        justifyContent:'center',

    },
    itemText:{
        fontSize:15,
        letterSpacing: 1
    }


});
