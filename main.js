document.addEventListener('DOMContentLoaded', () => {
    const bookListDiv = document.getElementById('bookList');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const searchInput = document.getElementById('searchInput');

    // Catálogo de libros
    const books = [
        { id: 1, title: 'El Principito', author: 'Antoine de Saint-Exupéry', price: 15.00 },
        { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', price: 20.00 },
        { id: 3, title: '1984', author: 'George Orwell', price: 12.00 },
        { id: 4, title: 'Un mundo feliz', author: 'Aldous Huxley', price: 14.00 },
        { id: 5, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', price: 25.00 },
        { id: 6, title: 'Orgullo y prejuicio', author: 'Jane Austen', price: 10.00 },
        { id: 7, title: 'Crimen y castigo', author: 'Fyodor Dostoevsky', price: 18.00 },
        { id: 8, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', price: 11.00 },
    ];

    // Carrito de compras (inicialmente vacío)
    let cart = [];

    // Función para mostrar los libros en el catálogo
    function displayBooks(bookArray) {
        bookListDiv.innerHTML = ''; // Limpiar lista actual
        if (bookArray.length === 0) {
            bookListDiv.innerHTML = '<p>No se encontraron libros.</p>';
            return;
        }
        bookArray.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            bookElement.innerHTML = `
                <h4>${book.title}</h4>
                <p>Autor: ${book.author}</p>
                <p>Precio: $${book.price.toFixed(2)}</p>
                <input type="number" value="1" min="1" id="quantity-${book.id}">
                <button onclick="addToCart(${book.id})">Agregar al Carrito</button>
            `;
            bookListDiv.appendChild(bookElement);
        });
    }

    // Función para agregar un libro al carrito
    window.addToCart = function(bookId) {
        const quantityInput = document.getElementById(`quantity-${bookId}`);
        const quantity = parseInt(quantityInput.value);

        // Validación: Asegurarse de que la cantidad sea un número positivo
        if (isNaN(quantity) || quantity <= 0) {
            alert('Por favor, ingrese una cantidad válida mayor a cero.');
            return;
        }

        const bookToAdd = books.find(book => book.id === bookId);

        if (bookToAdd) {
            const existingItemIndex = cart.findIndex(item => item.id === bookId);

            if (existingItemIndex > -1) {
                // Si el libro ya está en el carrito, actualizar la cantidad
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Si el libro no está en el carrito, agregarlo
                cart.push({ ...bookToAdd, quantity: quantity });
            }

            updateCartDisplay();
        }
    };

    // Función para eliminar un libro del carrito
    window.removeFromCart = function(bookId) {
        cart = cart.filter(item => item.id !== bookId);
        updateCartDisplay();
    };


    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        cartItemsDiv.innerHTML = ''; // Limpiar carrito actual
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Añadir clase para estilizar si es necesario
                itemElement.innerHTML = `
                    <span>${item.title} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-button" onclick="removeFromCart(${item.id})">Eliminar</button>
                `;
                cartItemsDiv.appendChild(itemElement);
            });
        }
        updateCartTotal();
    }

    // Función para actualizar el total del carrito
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Función para manejar la búsqueda
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm === '') {
            displayBooks(books); // Mostrar todo el catálogo si la búsqueda está vacía
        } else {
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.price.toFixed(2).includes(searchTerm) // Buscar también por precio como string
            );
            displayBooks(filteredBooks);
        }
    });

    // Mostrar todos los libros al cargar la página
    displayBooks(books);
});
