import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MentorItem } from './MentorModel';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name={i <= value ? 'star' : 'star-border'}
          size={18}
          color="#FFB300"
          style={{ marginHorizontal: 1 }}
        />
      ))}
    </View>
  );
};

interface MentorCardProps {
  mentor: MentorItem;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  console.log('Rendering MentorCard for:', mentor.mentorTitle);
  console.log('Ratings value:', mentor.ratings);
  const safeRating = Math.max(0, Math.min(5, Math.round(mentor.ratings ?? 0)));

  const imageSource: ImageSourcePropType = mentor.imageUrl
    ? { uri: mentor.imageUrl }
    : require('../../assets/mymentors.png');

  return (
    <View style={styles.card}>
      {/* LEFT SIDE */}
      <View style={styles.rowContent}>
      <View style={styles.leftColumn}>
        <Image source={imageSource} style={styles.image} />

        {mentor.ratings == null ? (
          <Text style={styles.noRating}>No rating yet</Text>
        ) : (
          <Rating value={safeRating} />
        )}
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.rightColumn}>
        <Text style={styles.title} numberOfLines={1}>
          {mentor.mentorTitle}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {mentor.mentorDescription}
        </Text>

        <View style={styles.tagsContainer}>
          {(mentor.mentorTags ?? []).map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>
              {tag.trim().toUpperCase()}
            </Text>
          ))}
        </View>

        <Text style={styles.meta}>{mentor.location}</Text>
        <Text style={styles.meta}>{mentor.recognitions}</Text>
      </View>
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.price}>
          {mentor.price?.toUpperCase?.() ?? ''}
        </Text>

        <Text style={styles.name}>
          {mentor.gender
            ? `${mentor.firstName.toUpperCase() + " " + mentor.lastName.toUpperCase()}, ${mentor.gender}`
            : mentor.firstName.toUpperCase() + " " + mentor.lastName.toUpperCase()}
        </Text>
      </View>

    </View>
  );
};

export default memo(MentorCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    margin: 2,
    padding: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  rowContent:{
    flexDirection: 'row',

  },
  leftColumn: {
    alignItems: 'center',
    width: 95,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },

  noRating: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#777',
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    textAlign: 'right',
  },

  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    textAlign: 'right',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginVertical: 6,
  },

  tag: {
    backgroundColor: '#EFEFEF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    margin: 2,
    fontSize: 12,
    color: '#505050',
    textAlign: 'right',
  },

  meta: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    textAlign: 'right',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    alignItems: 'flex-start',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#444',
  },
});
