const fs = require("fs");

class ProductManager {
    static id = 0;
    async addProduct(title, sku, description, price, thumbnail, stock) {
        this.path = "./Products.json";
        const product = {
            id: ProductManager.id++,
            title,
            sku,
            description,
            price,
            thumbnail,
            stock,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const listaVacia = [];
                listaVacia.push(product);

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(listaVacia, null, "\t")
                );
            } else {
                try {
                    const objContent = await this.getProducts();
                    objContent.push(product);
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(objContent, null, "\t")
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsNoId = products.filter((product) => product.id != id);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(productsNoId, null, "\t")
        );
    }

    async getProducts() {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const objContent = JSON.parse(content);
        return objContent;
    }

    async getProductsById(id) {
        const content = await this.getProducts();
        let productById = content.find((e) => e.id == id);
        return productById === undefined
            ? console.log("Product not found")
            : productById;
    }

    async updateProducts(id, product) {
        let content = await this.getProducts();
        let i = content.findIndex((e) => e.id === id);
        product.id = id;
        content.splice(i, 1, product);
        await fs.promises.writeFile(this.path, JSON.stringify(content, null, "\t"));
    }
}

/*------Add products callbacks------*/

const asyncFunction = async () => {
    const wolmart = new ProductManager();
    await wolmart.addProduct(
        "Lechelita",
        "#2609",
        "Leche deslactosada",
        800,
        "soy_una_img_xd.png",
        10
    );
    await wolmart.addProduct(
        "Blue Label",
        "#2226",
        "Es un elisir",
        300000,
        "soy_super_expensive.png",
        2
    );
    await wolmart.addProduct(
        "Pitusas",
        "#1773",
        "Las galletitas mas nobles del mundo",
        400,
        "pitusas.png",
        6
    );
    await wolmart.addProduct(
        "Coca Cola",
        "#6961",
        "Formula ultrasecreta pero deliciosa 😋",
        600,
        "soy_una_coca.png",
        14
    );

    /*------Delete product callback------*/
    await wolmart.deleteProduct(2);

    /*------Get all products callback------*/
    const showProducts = wolmart
        .getProducts()
        .then((showProducts) => console.log(showProducts));

    /*------Get product by ID callback------*/
    await wolmart.getProductsById(1);

    /*------Update product callback------*/

    await wolmart.updateProducts(2, {
        id: ProductManager.id++ -1,
        title: "7up",
        sku: "#6961",
        description: "La gaseosa mas refrescante",
        price: 700,
        thumbnail: "soy_una_7up.png",
        stock: 18
    });
};
asyncFunction();