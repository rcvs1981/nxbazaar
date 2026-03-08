import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useCoupons } from '../hooks/useCouponQuery';
import { format } from 'date-fns';

export default function CouponListScreen({ navigation }: any) {
  const { data: couponsResponse, isLoading, error, refetch } = useCoupons();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.center}>
        <Text>Loading coupons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error loading coupons</Text>
      </View>
    );
  }

  const coupons = couponsResponse?.data || [];

  const renderCoupon = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.couponCard}
      onPress={() => navigation?.navigate('CouponDetail', { id: item.id })}
    >
      <View style={styles.couponHeader}>
        <View style={styles.couponTitleContainer}>
          <Text style={styles.couponTitle}>{item.title}</Text>
          <Text style={styles.couponCode}>{item.couponCode}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.isActive ? styles.activeBadge : styles.draftBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.isActive ? styles.activeText : styles.draftText,
            ]}
          >
            {item.isActive ? 'Active' : 'Draft'}
          </Text>
        </View>
      </View>

      <View style={styles.couponDetails}>
        <Text style={styles.expiryLabel}>Expires:</Text>
        <Text style={styles.expiryDate}>
          {format(new Date(item.expiryDate), 'MMM dd, yyyy')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coupons</Text>
      <FlatList
        data={coupons}
        renderItem={renderCoupon}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No coupons available</Text>
          </View>
        }
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  list: {
    padding: 10,
  },
  couponCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  couponTitleContainer: {
    flex: 1,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  couponCode: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: '#d4edda',
  },
  draftBadge: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#155724',
  },
  draftText: {
    color: '#721c24',
  },
  couponDetails: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
  },
  expiryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
});