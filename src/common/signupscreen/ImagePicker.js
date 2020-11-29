import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';


export function chooseImage({ userid, option }) {
  let newWidth;
  let newHeight;

  switch (option) {
    case 'profile':
      newWidth = 180;
      newHeight = 180;
      break;
    case 'cafeLogo':
      newWidth = 200;
      newHeight = 120;
      break;
    case 'resiNum':
      newWidth = 200;
      newHeight = 120;
      break;
    case 'comNum':
      newWidth = 200;
      newHeight = 120;
      break;
  }

  let options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      let compressFormat = 'PNG';
      let quality = 100;
      let rotation = 90;
      let outputPath = null;
      let imageUri = response.uri;

      ImageResizer.createResizedImage(
        imageUri,
        newWidth,
        newHeight,
        compressFormat,
        quality,
        rotation,
        outputPath,
      )
        .then((res) => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          //resized image uri
          let uri = res.uri;
          //generating image name
          let imageName = option + '_' + userid;
          //setting the image name and image uri in the state

          storage()
            .ref(imageName)
            .putFile(uri)
            .then((snapshot) => {
              //You can check the image is now uploaded in the storage bucket
              console.log(`${imageName} has been successfully uploaded.`);

            })
            .catch((e) => console.log('uploading image error => ', e));
        })
        .catch((err) => {
          console.log('image resizing error => ', err);
        });

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // alert(JSON.stringify(response));s
      //console.log('response', JSON.stringify(response));
    }
  });
}