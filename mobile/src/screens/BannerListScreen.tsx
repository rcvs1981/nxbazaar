import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useBanners } from '../hooks/useBannerQuery';

export default function BannerListScreen() {
  const { data: bannersResponse, isLoading, error } = useBanners();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading banners...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error loading banners</Text>
      </View>
    );
  }

  const banners = bannersResponse?.data || [];

  const renderBanner = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.bannerCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
      <View style={styles.bannerInfo}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        {item.link && <Text style={styles.bannerLink}>{item.link}</Text>}
        <Text style={[styles.bannerStatus, item.isActive ? styles.active : styles.draft]}>
          {item.isActive ? 'Active' : 'Draft'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Banners</Text>
      <FlatList
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  bannerCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  bannerInfo: {
    padding: 15,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerLink: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  bannerStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  draft: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  error: {
    color: 'red',
  },
});