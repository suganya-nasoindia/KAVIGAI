import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import strings from './Strings';

export type FilterType = 'current' | 'skipped' | 'future';

interface ButtonComponentProps {
  onPressCurrent: () => void;
  onPressSkipped: () => void;
  onPressPending: () => void;
  selectedFilter: FilterType;
  hideHeader?: boolean;
  serviceName?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onPressCurrent,
  onPressSkipped,
  onPressPending,
  selectedFilter,
  hideHeader = false,
  serviceName,
}) => {

  const getServiceIcon = (name?: string): ImageSourcePropType => {
    switch (name) {
      case strings.book:
        return require('../assets/book.png');
      case strings.event:
        return require('../assets/events.png');
      case strings.meeting:
        return require('../assets/meeting.png');
      case strings.website:
        return require('../assets/website.png');
      default:
        return require('../assets/icon.png');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      {!hideHeader && (
        <View style={styles.relLayout}>
          <View style={styles.serviceNameLayout}>
            <Text style={styles.serviceText}>
              {serviceName || 'Service'}
            </Text>
            <Image
              source={getServiceIcon(serviceName)}
              style={styles.serviceImage}
            />
          </View>
        </View>
      )}

      {/* Button Group */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'current' && styles.selectedButton,
          ]}
          onPress={onPressCurrent}
        >
          <Text style={styles.buttonText}>Current</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'skipped' && styles.selectedButton,
          ]}
          onPress={onPressSkipped}
        >
          <Text style={styles.buttonText}>Skipped</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedFilter === 'future' && styles.selectedButton,
          ]}
          onPress={onPressPending}
        >
          <Text style={styles.buttonText}>Future</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonComponent;
