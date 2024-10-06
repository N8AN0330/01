 const storeCapacity = 300;
    let products = [
        { name: "Laptop", price: 18999, quantity: 50 },
        { name: "Smartphone", price: 9999, quantity: 100 },
        { name: "Tablet", price: 12999, quantity: 80 }
    ];

    function updateInventoryUI() {
        const inventoryTable = document.getElementById('inventoryTable');
        const totalValueElem = document.getElementById('totalValue');
        const mostExpensiveElem = document.getElementById('mostExpensive');
        const totalProductsElem = document.getElementById('totalProducts');

        // Clear the table first
        inventoryTable.innerHTML = "";

        // Fill the table with products
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td><button onclick="removeProduct(${index})" class="button">Remove</button></td>
            `;
            inventoryTable.appendChild(row);
        });

        // Update total inventory value and most expensive product
        const totalValue = calculateTotalInventoryValue();
        const mostExpensiveProduct = getMostExpensiveProduct();
        const totalProducts = products.reduce((sum, product) => sum + product.quantity, 0);

        totalValueElem.innerText = totalValue;
        mostExpensiveElem.innerText = mostExpensiveProduct ? mostExpensiveProduct.name : "None";
        totalProductsElem.innerText = totalProducts;
    }

    function addProduct() {
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        if (isNaN(productPrice) || isNaN(productQuantity) || productName === "") {
            alert("Please enter valid product details!");
            return;
        }

        const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0) + productQuantity;
        if (totalQuantity > storeCapacity) {
            alert("Store is at full capacity, cannot add new products.");
        } else {
            products.push({ name: productName, price: productPrice, quantity: productQuantity });
            updateInventoryUI();
        }

        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQuantity').value = '';
    }

    function removeProduct(index) {
        products.splice(index, 1);
        updateInventoryUI();
    }

    function calculateTotalInventoryValue() {
        return products.reduce((totalValue, product) => totalValue + (product.price * product.quantity), 0);
    }

    function getMostExpensiveProduct() {
        let mostExpensiveProduct = null;
        products.forEach(product => {
            if (!mostExpensiveProduct || product.price > mostExpensiveProduct.price) {
                mostExpensiveProduct = product;
            }
        });
        return mostExpensiveProduct;
    }

    // Initial UI update on load
    updateInventoryUI();