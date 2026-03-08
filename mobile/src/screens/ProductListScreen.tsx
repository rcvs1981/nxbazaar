import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useProducts } from '../hooks/useProductQuery';

interface Product {
  id: string;
  title: string;
  imageUrl?: string;
  productPrice: number;
  salePrice: number;
  productStock?: number;
  isActive: boolean;
}

export default function ProductListScreen() {
  const { data: products = [], isLoading, refetch } = useProducts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.productContent}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.salePrice}>₹{item.salePrice.toFixed(2)}</Text>
          {item.productPrice > item.salePrice && (
            <Text style={styles.originalPrice}>₹{item.productPrice.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.stock}>
            Stock: {item.productStock || 0}
          </Text>
          <View style={[styles.badge, item.isActive ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={styles.badgeText}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  productContent: {
    padding: 8,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stock: {
    fontSize: 11,
    color: '#666',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  inactiveBadge: {
    backgroundColor: '#ffebee',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
