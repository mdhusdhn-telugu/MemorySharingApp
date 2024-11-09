import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ViewScreen = ({ route }) => {
    const navigation = useNavigation();
    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        if (route.params && route.params.uploadedFiles) {
            setMediaFiles(route.params.uploadedFiles);
        }
    }, [route.params]);

    const renderMediaItem = ({ item }) => {
        return (
            <View style={styles.mediaContainer}>
                {item.type === 'image' && (
                    <Image source={{ uri: item.uri }} style={styles.mediaImage} />
                )}
                {item.type === 'video' && (
                    <Image source={{uri: item.uri}} style={styles.mediaImage} />
                )}
                {item.type === 'audio' && (
                    <Image source={{uri: item.uri}} style={styles.mediaImage} />
                )}
                <Text style={styles.mediaText}>{item.name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Your Saved Memories</Text>
            {mediaFiles.length > 0 ? (
                <FlatList
                    data={mediaFiles}
                    renderItem={renderMediaItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                />
            ) : (
                <Text style={styles.noMediaText}>No media to display.</Text>
            )}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back to Upload</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5D7C6',
        alignItems: 'center',
        paddingTop: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B3B3D',
        marginBottom: 20,
        marginTop:30,
    },
    grid: {
        alignItems: 'center',
    },
    mediaContainer: {
        alignItems: 'center',
        margin: 10,
        width: 150,
    },
    mediaImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    mediaText: {
        fontSize: 14,
        color: '#3B3B3D',
    },
    noMediaText: {
        fontSize: 18,
        color: '#3B3B3D',
        marginTop: 50,
    },
    backButton: {
        backgroundColor: '#3B3B3D',
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        marginBottom:30,
    },
    backButtonText: {
        color: '#FFFFFF',
    },
});

export default ViewScreen;
