import  React, {useState, useContext} from "react";
import { Text, StyleSheet, View, Image, Pressable, TextInput, ScrollView , Dimensions} from "react-native";
import { Icon } from 'react-native-elements'
import Icons from '../data/Icons.js'
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalStyles from "../styles/GlobalStyles";
import userContext from '../contexts/userContext'

const windowW = Dimensions.get('window').width
const windowH = Dimensions.get('window').height

const Footer = ({disable, onPressTouch}) => {
    const route = useRoute();
    const preventNavigation = disable?disable:false
    const navigation = useNavigation()
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2]
    const user = useContext(userContext)
    function handlePress() {
        if (preventNavigation !== "CreatePost"){
            navigation.navigate("CreatePost", {uri:false})
        }
    }
    function returnPage() {
        if (route.name === "Feed") {
            onPressTouch()
        }
        else {
            navigation.popToTop();
            navigation.navigate("Feed")
        }
        
    }
    function navigateProfile() {
        navigation.popToTop();
        navigation.navigate("Profile", {id:user.userId})
    }
    return (
        <View style={[styles.footerContainer]}>
            <View style={[styles.iconContainer]}>
                <Pressable  
                    onPress={returnPage}>
                <View styles={styles.feedIcon}>
                    <Icon 
                        name='dynamic-feed'
                        type='material'
                        color='white'
                        size={30}
                    />
                </View>
                </Pressable>
                <Pressable  
                    onPress={() => navigation.navigate("CreateMilestone")}>
                <View styles={styles.addMilestoneIcon}>
                    <Image
                        style={styles.milebookImage}
                        resizeMode="contain"
                        source={require("../assets/milebook-logo.png")} 
                    />
                </View>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("TakePost", {
                    previous_screen: routes[routes.length - 1]
                    })}>
                    <View styles={styles.createPostIcon}>
                        <Icon
                            name='add-circle-outline'
                            color='white'
                            size={30}
                        />
                    </View>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("Friends")}>
                    <View styles={styles.friendsIcon}>
                        <Icon 
                            style={styles.friendsIcon}
                            name='person-add-alt'
                            color='white'
                            size={31}
                        />
                    </View>
                </Pressable>
                <Pressable styles={styles.profileButton}
                    onPress={navigateProfile}> 
                    <Image
                    style={{width:26, height:26, borderRadius:26,top:0.25}}
                    resizeMode="contain"
                    defaultSource={Icons['defaultpic']}
                    source={(user)?{uri:user.image}:Icons['defaultpic']}/>
                </Pressable>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    footerContainer: {
        height:76,
        minWidth:"100%",
        bottom:0,
        position:"relative",
        backgroundColor:"rgba(10, 10, 10, 1)",
    },
    iconContainer: {
        flex: 1,
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingBottom:18,
        flexDirection:"row"
    },
    footerIcons: {

    },
    milebookImage: {
        maxHeight:windowH*(29/windowH),
        maxWidth:windowW*(29/windowW),
        top:16
    },
    profileButton: {
        minHeight:windowH*(30/windowH),
        minWidth:windowW*(30/windowW),
    },
    profilePic: {
        maxHeight:windowH*(26/windowH),
        maxWidth:windowW*(26/windowW),
        top:17.75
    },
    friendsIcon: {
        top:1
    },



})

export default Footer