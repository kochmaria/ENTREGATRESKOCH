import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import allProducts from '../data/productos.json';
import ProductItem from '../components/ProductItem';
import RemoveModal from '../components/RemoveModal';
import { AntDesign } from '@expo/vector-icons';

function ItemListCategories({ category, setCategorySelected, setProductDetailId }) {
  const [keyword, setKeyword] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase() &&
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [category, keyword]);

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = (product) => {
    console.log('Product added:', product);
  };

  return (
    <View style={{ flex: 1 }}>
       <Pressable style={styles.goBackContainer} onPress={() => setCategorySelected ('')}>
         <AntDesign name="arrowleft" size={24} color="black" />
         <Text style={styles.goBackText}>Go back to home</Text>
      </Pressable>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setKeyword}
          value={keyword}
          placeholder="Search product"
        />
        <Pressable style={styles.searchIcon} onPress={() => console.log('Search pressed')}>
          <AntDesign name="search1" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductItem product={item} setProductDetailId={setProductDetailId} />

            <View style={styles.buttonContainer}>
              <Pressable onPress={() => handleAddProduct(item)}>
                <Text style={styles.addButton}>Add</Text>
              </Pressable>
              <Pressable onPress={() => handleRemoveProduct(item)}>
                <Text style={styles.removeButton}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedProduct && (
        <RemoveModal
          modalVisible={selectedProduct !== null}
          closeModal={() => setSelectedProduct(null)}
          removeItem={() => {
            console.log('Product removed:', selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  goBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  goBackText: {
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginTop: 20
  },
  searchIcon: {
    marginLeft: 10,
  },
  productContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  addButton: {
    color: 'green',
    fontSize: 16,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default ItemListCategories;

