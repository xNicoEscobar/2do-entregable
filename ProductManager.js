const fs = require('fs');

class ProductManager {
    addProduct(title, sku, description, price, thumbnail, stock) {
        const product = {
            id: ProductManager.id,
            title,
            sku,
            description,
            price,
            thumbnail,
            stock,
        };

        this.products.push(product);
        ProductManager.id++;
        return product;
    }
}