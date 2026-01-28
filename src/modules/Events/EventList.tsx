import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    SafeAreaView, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { RecyclerListView } from 'recyclerlistview';

import ButtonComponent from '../../Components/ButtonComponent';
import { useEventListController } from './EventsController';
import { EventItem } from './EventModel';

const EventList = ({ navigation }: any) => {
    const {
        loading,
        error,
        filterType,
        setFilterType,
        dataProvider,
        layoutProvider,
        onLayout,
    } = useEventListController();

    const renderItem = (item: EventItem) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { event: item })}
        >
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image
                        source={
                            item.imageUrl
                                ? { uri: item.imageUrl.replace(/\s/g, '%20') }
                                : require('../../assets/events.png')
                        }
                        style={styles.icon}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.timestamp}>
                            {item.beginDate} - {item.endDate}
                        </Text>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" />;
    }

    if (error) {
        return <Text>Error loading events</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ButtonComponent
                onPressCurrent={() => setFilterType('current')}
                onPressSkipped={() => setFilterType('skipped')}
                onPressPending={() => setFilterType('future')}
                selectedFilter={filterType}
                serviceName="Event"
            />

            <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={(type, item: EventItem, index) => (
                    <View
                        onLayout={e =>
                            onLayout(index, e.nativeEvent.layout.height)
                        }
                    >
                        {renderItem(item)}
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddGoal')}
            >
                <Text style={styles.fabIcon}>＋</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default EventList;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFE8C7' },
    row: { flexDirection: 'row', alignItems: 'center' },
    card: { padding: 8, margin: 5, backgroundColor: '#DCDCDC', borderRadius: 8 },
    icon: { width: 75, height: 75 },
    textContainer: { flex: 1 },
    timestamp: { fontSize: 12 },
    title: { fontSize: 16, fontWeight: 'bold' },
    description: { fontSize: 14 },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1565C0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: { color: '#fff', fontSize: 30 },
});
