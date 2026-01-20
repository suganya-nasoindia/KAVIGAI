import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
 import { FilterType } from '../modules/Todo/useTodoController';
/* ---------------- TYPES ---------------- */


interface ButtonComponentProps {
  onPressCurrent: () => void;
  onPressSkipped: () => void;
  onPressPending: () => void;
  selectedFilter: FilterType;

  currentCount?: number;
  skippedCount?: number;
  pendingCount?: number;

  hideHeader?: boolean;
  serviceName?: string;
}

/* ---------------- COMPONENT ---------------- */

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onPressCurrent,
  onPressSkipped,
  onPressPending,
  selectedFilter,

  currentCount,
  skippedCount,
  pendingCount,

  hideHeader = false,
  serviceName,
}) => {
  /* ---------- Icon resolver ---------- */
  const getServiceIcon = (name?: string): ImageSourcePropType => {
    switch (name) {
      case 'BOOK':
        return require('../assets/book.png');
      case 'EVENT':
        return require('../assets/events.png');
      case 'MEETING':
        return require('../assets/meeting.png');
      case 'WEBSITE':
        return require('../assets/website.png');
      default:
        return require('../assets/icon.png');
    }
  };

  return (
    <View style={styles.container}>
      {!hideHeader && serviceName && (
        <View style={styles.relLayout}>
          <View style={styles.serviceNameLayout}>
            <Text style={styles.serviceText}>{serviceName}</Text>
            <Image
              source={getServiceIcon(serviceName)}
              style={styles.serviceImage}
            />
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'current' && styles.selectedButton,
          ]}
          onPress={onPressCurrent}
        >
          <Text style={styles.buttonText}>Current</Text>
        </TouchableOpacity> */}


        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'current' && styles.selectedButton,
          ]}
          onPress={onPressCurrent}
        >
          <View style={styles.btnContent}>
            <Text style={styles.buttonText}>Current</Text>

            {currentCount !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{currentCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'skipped' && styles.selectedButton,
          ]}
          onPress={onPressSkipped}
        >
          <View style={styles.btnContent}>
            <Text style={styles.buttonText}>Skipped</Text>
            {skippedCount !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{skippedCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'future' && styles.selectedButton,
          ]}
          onPress={onPressPending}
        >
          <View style={styles.btnContent}>
            <Text style={styles.buttonText}>Pending</Text>

            {pendingCount !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pendingCount}</Text>
              </View>
            )}
          </View>
          </TouchableOpacity>
      </View>
      </View>
  );

};
export default ButtonComponent;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginTop: 5,
  },
  relLayout: {
    backgroundColor: '#DCDCDC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  serviceNameLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  serviceText: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#1976d2',
    marginRight: 5,
  },
  serviceImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 2,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  badge: {
    backgroundColor: '#fff',
    marginLeft: 6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  
  badgeText: {
    color: '#ed7d31',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: '#ffa86e',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#ed7d31',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
