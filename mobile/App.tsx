import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BannerListScreen from './src/screens/BannerListScreen';
import CouponListScreen from './src/screens/CouponListScreen';
import ProductListScreen from './src/screens/ProductListScreen';

const queryClient = new QueryClient();

type Screen = 'banners' | 'coupons' | 'products';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('products');

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity
            style={[styles.tabButton, currentScreen === 'products' && styles.activeTab]}
            onPress={() => setCurrentScreen('products')}
          >
            <Text style={[styles.tabText, currentScreen === 'products' && styles.activeTabText]}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentScreen === 'coupons' && styles.activeTab]}
            onPress={() => setCurrentScreen('coupons')}
          >
            <Text style={[styles.tabText, currentScreen === 'coupons' && styles.activeTabText]}>
              Coupons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentScreen === 'banners' && styles.activeTab]}
            onPress={() => setCurrentScreen('banners')}
          >
            <Text style={[styles.tabText, currentScreen === 'banners' && styles.activeTabText]}>
              Banners
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.screen}>
          {currentScreen === 'products' && <ProductListScreen />}
          {currentScreen === 'coupons' && <CouponListScreen />}
          {currentScreen === 'banners' && <BannerListScreen />}
        </View>

        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0066cc',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#0066cc',
  },
  screen: {
    flex: 1,
  },
});