<!-- frontend/src/components/ProductCard.vue -->
<template>
  <Card class="product-card hover:shadow-lg transition-shadow">
    <template #header>
      <div class="relative">
        <img
          :src="product.image_url || '/placeholder-product.png'"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />
        <div v-if="product.discount_percent" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg">
          -{{ product.discount_percent }}%
        </div>
      </div>
    </template>
    <template #title>
      <h3 class="text-lg font-semibold truncate">{{ product.name }}</h3>
    </template>
    <template #subtitle>
      <span class="text-sm text-gray-600">{{ product.category_name }}</span>
    </template>
    <template #content>
      <p class="text-gray-700 line-clamp-2">{{ product.description }}</p>
      <div class="mt-4">
        <div class="flex items-center gap-2">
          <span v-if="product.discount_percent" class="text-2xl font-bold text-red-600">
            R$ {{ formatPrice(getDiscountedPrice(product)) }}
          </span>
          <span :class="['text-lg', product.discount_percent ? 'line-through text-gray-400' : 'text-2xl font-bold']">
            R$ {{ formatPrice(product.price) }}
          </span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <Button
          label="Ver Detalhes"
          icon="pi pi-eye"
          class="p-button-outlined flex-1"
          @click="viewDetails"
        />
        <Button
          label="Comprar"
          icon="pi pi-shopping-cart"
          class="flex-1"
          @click="addToCart"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import type { Product } from '../types';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',');
};

const getDiscountedPrice = (product: Product) => {
  if (product.discount_percent) {
    return product.price * (1 - product.discount_percent / 100);
  }
  return product.price;
};

const viewDetails = () => {
  router.push(`/product/${props.product.id}`);
};

const addToCart = () => {
  // Implement cart logic
  console.log('Add to cart:', props.product);
};
</script>