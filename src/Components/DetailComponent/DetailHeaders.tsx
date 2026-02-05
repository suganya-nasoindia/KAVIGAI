import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface DetailHeaderProps {
  title: string;
  onDelete?: () => void;
  onShare?: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  onDelete,
  onShare,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Actions */}
      <View style={styles.actions}>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Image
              source={require('../../assets/icons/delete.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {onShare && (
          <TouchableOpacity onPress={onShare}>
            <Image
              source={require('../../assets/icons/share.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DetailHeader;
const styles = StyleSheet.create({
    container: {
      height: 56,
      backgroundColor: '#4AA3DF',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    title: {
      flex: 1,
      color: '#FFF',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 12,
    },
    actions: {
      flexDirection: 'row',
    },
    icon: {
      width: 22,
      height: 22,
      tintColor: '#FFF',
      marginLeft: 16,
    },
  });
  