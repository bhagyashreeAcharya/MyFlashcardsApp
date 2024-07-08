import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
} from 'react-native';
import { images } from '../utils'; // Adjust the path if utils.js is in a different directory

const Flashcards = ({ category, onBack, orientation }) => {
  const [data, setData] = useState(category.flashcards);
  const swipe = useRef(new Animated.ValueXY()).current;
  const backOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!data.length) {
      setData(category.flashcards);
    }
  }, [data, category.flashcards]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        swipe.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        const isActionActive = Math.abs(dx) > 100 || Math.abs(dy) > 100;
        if (isActionActive) {
          Animated.timing(swipe, {
            toValue: { x: dx > 0 ? width : -width, y: dy > 0 ? height : -height },
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            removeCard();
          });
        } else {
          Animated.spring(swipe, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const removeCard = useCallback(() => {
    setData((prevData) => prevData.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleSelection = useCallback(
    (direction) => {
      Animated.timing(swipe, {
        toValue: { x: direction * width, y: 0 },
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        removeCard();
      });
    },
    [removeCard, swipe]
  );

  const handleNext = useCallback(() => {
    handleSelection(1);
  }, [handleSelection]);

  const handlePressIn = () => {
    Animated.timing(backOpacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(backOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      onBack();
    });
  };

  const { width, height } = Dimensions.get('window');
  const isLandscape = orientation === 'landscape';

  return (
    <View style={[styles.root, isLandscape && styles.rootLandscape]}>
      {data.map((flashcard, index) => {
        const isFirst = index === 0;
        const dragHandlers = isFirst ? panResponder.panHandlers : {};

        console.log(`Flashcard Image for ${flashcard.name}:`, flashcard.image); // Log image path

        return (
          <Animated.View
            key={flashcard.id}
            style={[
              styles.card,
              { zIndex: data.length - index },
              isFirst && { transform: [{ translateX: swipe.x }, { translateY: swipe.y }] },
              Platform.OS === 'web' && styles.webCard,
            ]}
            {...dragHandlers}
          >
            <Image source={flashcard.image} style={styles.image} />
            <Text style={styles.text}>{flashcard.name}</Text>
          </Animated.View>
        );
      }).reverse()}

      <View style={styles.buttonContainer}>
        <Animated.View style={{ opacity: backOpacity }}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
        </Animated.View>
        {Platform.OS === 'web' && (
          <TouchableOpacity style={styles.webButton} onPress={handleNext}>
            <Text style={styles.webButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3E5FC',
  },
  rootLandscape: {
    flexDirection: 'row',
  },
  card: {
    width: width * 0.9,
    height: width * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  webCard: {
    width: '60%',
    height: '80%',
  },
  image: {
    width: '80%',
    height: '70%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  webButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Flashcards;
