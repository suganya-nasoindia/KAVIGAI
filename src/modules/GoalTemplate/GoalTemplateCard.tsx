import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GoalTemplate } from './GoalTemplateModel';

interface Props {
    goalTemplate: GoalTemplate;
}

export default function GoalTemplateCard({ goalTemplate }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.leftColumn}>
                    <Image
                        source={
                            goalTemplate.goalImageUrl
                                ? { uri: goalTemplate.goalImageUrl }
                                : require('../../assets/goal.png')
                        }
                        style={styles.image}
                    />
                    <Text style={styles.rating}>{goalTemplate.rating}</Text>
                    <Text>{goalTemplate.popularity}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{goalTemplate.goalName}</Text>
                    <Text numberOfLines={3}>{goalTemplate.goalDescription}</Text>

                    <View style={styles.tag}>
                        {(goalTemplate.tags ?? []).map((tag, i) => (
                            <Text key={i} style={styles.tag}>
                                {tag.toUpperCase()}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.meta}>{goalTemplate.category}</Text>
                </View>
            </View>

            <View style={styles.goalFooter}>
                <Text style={styles.price}>{goalTemplate.price}</Text>
                <Text style={styles.name}>
                    Authored By: {goalTemplate.authorFirstName} {goalTemplate.authorLastName}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screens: { backgroundColor: '#FFE8C7' },
    card: {
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 8,
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#E1E1E1',
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftColumn: {
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: { flex: 1, },
    image: {
        width: 90,
        height: 90,
        marginTop: 35,
        alignSelf: 'center',
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: '#505050',
        textAlign: 'right',
    },
    rating: {
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 16,
        color: '#505050',
        fontStyle: 'normal',
        marginBottom: 6,
        textAlign: 'left',
    },
    title: {
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 16, color: '#505050',
        fontStyle: 'normal',
        marginBottom: 6,
        textAlign: 'right',
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 14, color: '#646464',
        fontStyle: 'normal',
        marginBottom: 6,
        textAlign: 'right',
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
    tag: {
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        margin: 4,
        backgroundColor: '#DCDCDC',
        color: '#505050',
        fontSize: 14,
        fontStyle: 'normal',
    },
    meta: {
        fontSize: 14,
        marginTop: 2,
        color: '#646464',
        flexDirection: 'row',
        textAlign: 'right',
        justifyContent: 'flex-start',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 2,
        color: '#646464',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    goalFooter: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', borderRadius: 5, marginTop: 5,
        width: '100%',
        alignSelf: 'stretch',
    },
    starRating: {
        marginTop: 4, marginBottom: 4,
        color: '#ffb300',
    },
    versionContainer: {
        borderTopWidth: 1, borderTopColor: '#1c5787',
        alignItems: 'center',
    },
});

