import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useProduct } from '../hooks/useProductQuery';

interface ProductDetailScreenProps {
  productId: string;
  onClose: () => void;
}

export default function ProductDetailScreen({ productId, onClose }: ProductDetailScreenProps) {
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Product not found</Text>
      </View>
    );
  }

  const discount = product.productPrice > product.salePrice
    ? Math.round(((product.productPrice - product.salePrice) / product.productPrice) * 100)
    : 0;

  return (
    <ScrollView style={styles.container}>
      {product.imageUrl && (
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.detailImage}
          resizeMode="contain"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        {product.sku && (
          <Text style={styles.sku}>SKU: {product.sku}</Text>
        )}

        <View style={styles.priceSection}>
          <Text style={styles.salePrice}>₹{product.salePrice.toFixed(2)}</Text>
          {product.productPrice > product.salePrice && (
            <>
              <Text style={styles.originalPrice}>₹{product.productPrice.toFixed(2)}</Text>
              {discount > 0 && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{discount}% OFF</Text>
                </View>
              )}
            </>
          )}
        </View>

        {product.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Stock Available</Text>
            <Text style={styles.value}>{product.productStock || 'N/A'}</Text>
          </View>

          {product.unit && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Unit</Text>
              <Text style={styles.value}>{product.unit}</Text>
            </View>
          )}

          {product.productCode && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Product Code</Text>
              <Text style={styles.value}>{product.productCode}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.label}>Status</Text>
            <View style={[styles.statusBadge, product.isActive ? styles.activeBadge : styles.inactiveBadge]}>
              <Text style={styles.statusText}>
                {product.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>

        {product.isWholesale && product.wholesalePrice && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wholesale Pricing</Text>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Wholesale Price</Text>
              <Text style={styles.value}>₹{product.wholesalePrice.toFixed(2)}</Text>
            </View>
            {product.wholesaleQty && (
              <View style={styles.detailRow}>
                <Text style={styles.label}>Minimum Qty</Text>
                <Text style={styles.value}>{product.wholesaleQty}</Text>
              </View>
            )}
          </View>
        )}

        {product.tags && product.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  sku: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  salePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0066cc',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  inactiveBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
