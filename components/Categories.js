import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Animated } from 'react-native';

const Categories = ({ categories, onSelectCategory }) => {
  const scaleValues = useRef(categories.reduce((acc, category) => {
    acc[category.id] = new Animated.Value(1);
    return acc;
  }, {})).current;

  const opacityValues = useRef(categories.reduce((acc, category) => {
    acc[category.id] = new Animated.Value(1);
    return acc;
  }, {})).current;

  const handlePressIn = (id) => {
    Animated.parallel([
      Animated.spring(scaleValues[id], {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues[id], {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = (id) => {
    Animated.parallel([
      Animated.spring(scaleValues[id], {
        toValue: 1,
        friction: 4,
        tension: 30,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues[id], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onSelectCategory(id);
    });
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
      <Image source={require('../assets/images/engine.png')} style={styles.engine} />
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPressIn={() => handlePressIn(category.id)}
          onPressOut={() => handlePressOut(category.id)}
          activeOpacity={1}
        >
          <Animated.View style={[styles.compartment, { opacity: opacityValues[category.id] }]}>
            <View style={styles.overlayContainer}>
              <Animated.Image
                source={require('../assets/images/compartment.png')}
                style={[styles.compartmentImage, { transform: [{ scale: scaleValues[category.id] }] }]}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#B3E5FC', // Light blue background to avoid checkerboard pattern
  },
  engine: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    paddingBottom:20,
    marginBottom : 45,
  },
  compartment: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  overlayContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    backgroundColor: '#B3E5FC', // Matching background color for compartments
  },
  compartmentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categoryText: {
    position: 'absolute',
    top: 40, // Adjust this value to position the text inside the image as needed
    left: 0,
    right: 0,
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Categories;

/**
 * 
 * All the depencancy and steps to create react native in expo 
 * npm install -g expo-cli -use this command globally to intall expo react
expo init MyNewProject  --- use this command to create project
npx react-native start   -----to start project
For navigation within your app.:
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
For handling gestures in your app.
npm install react-native-gesture-handler
For animations.: npm install react-native-reanimated
For using vector icons in your app : npm install react-native-vector-icons
For swipe gestures (e.g., navigating flashcards).: npm install react-native-gesture-handler react-native-reanimated
For Web : npx expo install react-native-web react-dom @expo/metro-runtime


 */
