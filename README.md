STEPS TO BUILD THE PROJECT

1- Configure the react native Enviroment ~ https://reactnative.dev/docs/environment-setup

 ANDROID ~
 1- install node modules (npm install or yarn install in the root)
 2- Go to node modules>react-native-geocoder>android>build.gradle and replace compile with implementation
 3- Optionally you can increment the min sdk version and complie sdj=k version according to your projectversion

 CREATING A RELEASE BUILD
1- go to node modules>react-native>react.gradle and add the following code 
below the doFirst object 

doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
        if (originalDir.exists()) {
            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
            ant.move(file: originalDir, tofile: destDir);
        }
    }
    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
}



reference >> https://stackoverflow.com/questions/53239705/react-native-error-duplicate-resources-android


 IOS ~
  1- install node modules (npm install or yarn install in the root)
  2- install the pods run : cd ios > pod install (arch -x86_64 pod install if arm architecture)