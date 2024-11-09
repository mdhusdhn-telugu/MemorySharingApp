# Media Upload App

This is a simple React Native app for uploading, viewing, and managing media files (images, videos, and audio). The app allows users to upload media from their gallery or capture it directly using the camera and record audio. Users can then view their saved media files in a grid format.

## Features

- **Upload Media**: Choose to upload images, videos, or record audio.
- **Gallery or Camera**: Upload files from the gallery or capture new media directly.
- **Audio Recording**: Start and stop audio recordings.
- **View Saved Media**: View saved images, videos, and audio files in a grid format.
- **Permissions Management**: Request necessary permissions for camera, storage, and audio recording.

## Screens

1. **Upload Screen**: Allows users to select media type (image, video, or audio) and choose between gallery or camera.
2. **View Screen**: Displays uploaded media files in a grid with options to navigate back.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: v14.x or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) or [React Native CLI](https://reactnative.dev/docs/environment-setup) (for native builds)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/media-upload-app.git
    cd media-upload-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the app**:

    - For Expo:
      ```bash
      npx expo start
      ```

    - For React Native CLI (iOS and Android):
      ```bash
      npx react-native run-android
      npx react-native run-ios
      ```

4. **Permissions**:

    - Ensure permissions for camera, audio recording, and media storage are granted on the device for full functionality.

## Usage

1. **Upload Media**:
   - Select the media type: image, video, or audio.
   - Choose to upload from the gallery or capture with the camera.
   - For audio, start and stop recording to save.

2. **View Saved Media**:
   - Navigate to "View your memories" to see a grid of uploaded media files.

## Dependencies

- **React Navigation**: Used for navigating between screens.
- **React Native Permissions**: For managing permissions on Android.
- **Expo Image Picker**: Allows selecting images and videos from the gallery or camera.
- **React Native Audio Recorder Player**: For recording and playing audio files.

## File Structure

- **UploadScreen.js**: Handles media upload, permissions, and file management.
- **ViewScreen.js**: Displays uploaded media in a grid with navigation options.
- **styles**: Contains reusable style components.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
