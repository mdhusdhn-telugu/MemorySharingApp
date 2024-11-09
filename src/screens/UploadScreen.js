import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const UploadScreen = () => {
    //Navigation
    const navigation = useNavigation();
    //Navigation
    const audioRecorderPlayer = new AudioRecorderPlayer();
    //State
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            //Permissions
            const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            const audioPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

            if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED || 
                storagePermission !== PermissionsAndroid.RESULTS.GRANTED || 
                audioPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissions', 'Please allow necessary permissions to continue.');
            }
        } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need permission to access your media library.');
            }
        }
    };



    //Media uploads
    const handleMediaUpload = (mediaType) => {
        Alert.alert(
            `Upload ${mediaType === 'image' ? 'Image' : mediaType === 'video' ? 'Video' : 'My Audio'}`,
            'Choose an option',
            [
                { text: 'Open Gallery', onPress: () => openGallery(mediaType) },
                { text: `Capture ${mediaType}`, onPress: () => (mediaType === 'audio' ? recordAudio() : openCamera(mediaType)) },
                { text: 'Cancel', style: 'cancel' }
            ],
        );
    };
    //For opening the gallery
    const openGallery = async (mediaType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaType === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        
        if (!result.canceled) {
            const newMedia = { uri: result.assets[0].uri, type: mediaType, name: `My ${mediaType}` };
            setSelectedMedia([...selectedMedia, newMedia]);
        }
    };

    const openCamera = async (mediaType) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: mediaType === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        
        if (!result.canceled) {
            const newMedia = { uri: result.assets[0].uri, type: mediaType, name: `My ${mediaType}` };
            setSelectedMedia([...selectedMedia, newMedia]);
        }
    };

    const recordAudio = async () => {
        if (isRecording) {
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setIsRecording(false);
            const newMedia = { uri: result, type: 'audio', name: 'My Audio' };
            setSelectedMedia([...selectedMedia, newMedia]);
        } else {
            const result = await audioRecorderPlayer.startRecorder();
            audioRecorderPlayer.addRecordBackListener((e) => {
                console.log('Recording: ', e.currentPosition);
                return;
            });
            setIsRecording(true);
        }
    };

    const viewMemories = () => {
        navigation.navigate('View', { uploadedFiles: selectedMedia });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.promoBanner}>
                <Image source={require('../Media/Images/coverpage.jpeg')} style={styles.promoImg} />
                <Text style={styles.promoText}>
                    "Your memories deserve a place to shine. Start saving your images, videos, and audio today!"
                </Text>
            </View>
            <View style={styles.mediacontainer}>
                <TouchableOpacity style={styles.media} onPress={() => handleMediaUpload('image')}>
                    <Image source={require('../Media/Images/image.gif')} style={styles.Image} />
                    <Text style={styles.belowText}>Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.media} onPress={() => handleMediaUpload('video')}>
                    <Image source={require('../Media/Images/video.gif')} style={styles.Image} />
                    <Text style={styles.belowText}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.media} onPress={() => handleMediaUpload('audio')}>
                    <Image source={require('../Media/Images/audio.gif')} style={styles.Image} />
                    <Text style={styles.belowText}>Audio</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={viewMemories}>
                <Text style={styles.buttonText}>View your memories</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
  //Styles section
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5D7C6',
        paddingBottom: 30,
    },
    contentContainer: {
        alignItems: 'center',
    },
    promoBanner: {
        alignItems: 'center',
        marginTop: 20,
    },
    promoImg: {
        width: 350,
        height: 300,
        borderRadius: 30,
        marginBottom: 30,
        marginTop:35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    promoText: {
        fontSize: 20,
        color: '#3B3B3D',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    mediacontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 50,
    },
    media: {
        alignItems: 'center',
    },
    Image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 5,
    },
    belowText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#3B3B3D',
    },
    buttonContainer: {
        backgroundColor: '#3B3B3D',
        borderRadius: 8,
        padding: 10,
        width: 250,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default UploadScreen;
