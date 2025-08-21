// NovaNest E-commerce Application
class NovaNestApp {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentUser = null;
        this.users = [];
        this.orders = [];
        this.init();
    }

    init() {
        this.loadProducts();
        this.loadUsers();
        this.loadOrders();
        this.setupEventListeners();
        this.loadCartFromStorage();
        this.updateCartDisplay();
        this.updateAuthDisplay();
    }

    // Load sample products with correct categories
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Travel Sipper",
                price: 299.99,
                image: "5479952583_430x.jpg",
                category: "Sippers",
                description: "High-quality insulated travel sipper with premium finish",
                inStock: true,
                badge: "New"
            },
            {
                id: 2,
                name: "Portable Table Fan",
                price: 89.99,
                image: "5080348688.jpg",
                category: "Fans",
                description: "Compact table fan for personal cooling",
                inStock: true,
                badge: "Popular"
            },
            {
                id: 3,
                name: "Advanced Mist Cooler",
                price: 199.99,
                image: "5607412577_80x80.jpg",
                category: "Mist Coolers",
                description: "High-performance mist cooler with adjustable settings",
                inStock: true
            },
            {
                id: 4,
                name: "Desktop Mist Cooler",
                price: 79.99,
                image: "5607412577_80x80.jpg",
                category: "Mist Coolers",
                description: "Compact desktop mist cooler for office use",
                inStock: true
            }
        ];

        this.renderProducts();
    }

    // Load sample users
    loadUsers() {
        this.users = [
            {
                id: 1,
                name: "Demo User",
                email: "demo@novanest.com",
                password: "demo123",
                isAdmin: false
            }
        ];
    }

    // Load sample orders
    loadOrders() {
        this.orders = [];
    }

    // Setup all event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchBar = document.getElementById('searchBar');
        const searchClose = document.getElementById('searchClose');

        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                searchBar.classList.add('active');
                document.querySelector('.search-input').focus();
            });
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchBar.classList.remove('active');
            });
        }

        // Search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = document.querySelector('.search-input').value;
                this.handleSearch(searchTerm);
            });
        }

        // Cart functionality
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartClose = document.getElementById('cartClose');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                cartSidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Auth functionality
        const accountLink = document.getElementById('accountLink');
        const authModal = document.getElementById('authModal');
        const authClose = document.getElementById('authClose');
        const authTabs = document.querySelectorAll('.auth-tab');

        if (accountLink) {
            accountLink.addEventListener('click', (e) => {
                e.preventDefault();
                authModal.classList.add('active');
            });
        }

        if (authClose) {
            authClose.addEventListener('click', () => {
                authModal.classList.remove('active');
            });
        }

        // Close auth modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
            }
        });

        // Auth tab switching
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.switchAuthTab(targetTab);
            });
        });

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e.target);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Switch between login and register tabs
    switchAuthTab(tabName) {
        const authTitle = document.getElementById('authTitle');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const authTabs = document.querySelectorAll('.auth-tab');

        // Update active tab
        authTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update forms
        if (tabName === 'login') {
            authTitle.textContent = 'Login';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            authTitle.textContent = 'Register';
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    }

    // Handle user login
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.showNotification(`Welcome back, ${user.name}!`);
            this.updateAuthDisplay();
            document.getElementById('authModal').classList.remove('active');
            document.getElementById('loginForm').reset();
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    // Handle user registration
    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already registered', 'error');
            return;
        }

        const newUser = {
            id: this.users.length + 1,
            name: name,
            email: email,
            password: password,
            isAdmin: false
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        this.showNotification(`Welcome to NovaNest, ${name}!`);
        this.updateAuthDisplay();
        document.getElementById('authModal').classList.remove('active');
        document.getElementById('registerForm').reset();
    }

    // Update authentication display
    updateAuthDisplay() {
        const accountLink = document.getElementById('accountLink');
        if (this.currentUser) {
            accountLink.innerHTML = `
                <i class="fas fa-user"></i>
                <span class="user-name">${this.currentUser.name}</span>
            `;
            accountLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showUserMenu();
            });
        } else {
            accountLink.innerHTML = '<i class="fas fa-user"></i>';
            accountLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('authModal').classList.add('active');
            });
        }
    }

    // Show user menu
    showUserMenu() {
        const menu = document.createElement('div');
        menu.className = 'user-menu';
        menu.innerHTML = `
            <div class="user-menu-item">
                <i class="fas fa-shopping-bag"></i>
                <span>My Orders</span>
            </div>
            <div class="user-menu-item" onclick="app.logout()">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </div>
        `;

        // Position menu
        const accountLink = document.getElementById('accountLink');
        const rect = accountLink.getBoundingClientRect();
        menu.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 10}px;
            right: 20px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            box-shadow: var(--shadow);
            z-index: 1000;
            min-width: 150px;
        `;

        document.body.appendChild(menu);

        // Remove menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                if (menu.parentNode) {
                    menu.parentNode.removeChild(menu);
                }
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.updateAuthDisplay();
        this.showNotification('Logged out successfully');
    }

    // Render products in the grid
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = this.products.map(product => `
            <div class="product-card fade-in" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn" onclick="app.toggleWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Handle search functionality
    handleSearch(searchTerm) {
        if (!searchTerm.trim()) {
            this.renderProducts();
            return;
        }

        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderFilteredProducts(filteredProducts);
        
        // Close search bar
        document.getElementById('searchBar').classList.remove('active');
    }

    // Render filtered products
    renderFilteredProducts(filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results fade-in">
                    <h3>No products found</h3>
                    <p>Try adjusting your search terms or browse our full collection.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card fade-in" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn" onclick="app.toggleWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Add product to cart
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showNotification(`${product.name} added to cart!`);
    }

    // Remove product from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    // Update product quantity in cart
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCartToStorage();
                this.updateCartDisplay();
            }
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                        <p>Start shopping to add items</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item" data-product-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="app.removeFromCart(${item.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Toggle wishlist (placeholder functionality)
    toggleWishlist(productId) {
        const button = event.target.closest('.wishlist-btn');
        if (button) {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.style.color = '#e74c3c';
                this.showNotification('Added to wishlist!');
            } else {
                button.style.color = '';
                this.showNotification('Removed from wishlist!');
            }
        }
    }

    // Handle newsletter signup
    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
            this.showNotification('Thank you for subscribing to our newsletter!');
            form.reset();
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification fade-in ${type}`;
        
        const bgColor = type === 'error' ? '#e74c3c' : '#27ae60';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Save cart to localStorage
    saveCartToStorage() {
        localStorage.setItem('novanest-cart', JSON.stringify(this.cart));
    }

    // Load cart from localStorage
    loadCartFromStorage() {
        const savedCart = localStorage.getItem('novanest-cart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
            } catch (e) {
                console.error('Error loading cart from storage:', e);
                this.cart = [];
            }
        }
    }

    // Checkout functionality with order processing
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }

        if (!this.currentUser) {
            this.showNotification('Please login to checkout', 'error');
            document.getElementById('authModal').classList.add('active');
            return;
        }

        // Show shipping address form
        this.showShippingAddressForm();
    }

    // Show shipping address form
    showShippingAddressForm() {
        const modal = document.createElement('div');
        modal.className = 'shipping-modal';
        modal.innerHTML = `
            <div class="shipping-content">
                <div class="shipping-header">
                    <h3>Shipping Address</h3>
                    <button class="shipping-close" onclick="this.closest('.shipping-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="shippingForm" class="shipping-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="shippingName">Full Name *</label>
                            <input type="text" id="shippingName" value="${this.currentUser.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="shippingEmail">Email *</label>
                            <input type="email" id="shippingEmail" value="${this.currentUser.email}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="shippingPhone">Phone Number *</label>
                        <input type="tel" id="shippingPhone" placeholder="Enter your phone number" required>
                    </div>
                    <div class="form-group">
                        <label for="shippingAddress">Street Address *</label>
                        <input type="text" id="shippingAddress" placeholder="Enter your street address" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="shippingCity">City *</label>
                            <input type="text" id="shippingCity" placeholder="Enter your city" required>
                        </div>
                        <div class="form-group">
                            <label for="shippingState">State/Province *</label>
                            <input type="text" id="shippingState" placeholder="Enter your state" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="shippingZip">ZIP/Postal Code *</label>
                            <input type="text" id="shippingZip" placeholder="Enter ZIP code" required>
                        </div>
                        <div class="form-group">
                            <label for="shippingCountry">Country *</label>
                            <input type="text" id="shippingCountry" value="United States" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="shippingNotes">Order Notes (Optional)</label>
                        <textarea id="shippingNotes" placeholder="Any special instructions for delivery"></textarea>
                    </div>
                    <div class="shipping-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.shipping-modal').remove()">Cancel</button>
                        <button type="submit" class="btn-accent">Place Order</button>
                    </div>
                </form>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        // Handle form submission
        const form = modal.querySelector('#shippingForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrderWithAddress(modal);
        });
    }

    // Process order with shipping address
    processOrderWithAddress(modal) {
        const shippingData = {
            name: document.getElementById('shippingName').value,
            email: document.getElementById('shippingEmail').value,
            phone: document.getElementById('shippingPhone').value,
            address: document.getElementById('shippingAddress').value,
            city: document.getElementById('shippingCity').value,
            state: document.getElementById('shippingState').value,
            zipCode: document.getElementById('shippingZip').value,
            country: document.getElementById('shippingCountry').value,
            notes: document.getElementById('shippingNotes').value
        };

        // Create order
        const order = {
            id: this.orders.length + 1,
            userId: this.currentUser.id,
            userEmail: this.currentUser.email,
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'pending',
            orderDate: new Date().toISOString(),
            shippingAddress: shippingData
        };

        // Add order to database
        this.orders.push(order);
        this.saveOrdersToStorage();

        // Show order confirmation
        this.showNotification(`Order placed successfully! Order #${order.id}`);
        
        // Clear cart
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartDisplay();
        
        // Close modals
        modal.remove();
        document.getElementById('cartSidebar').classList.remove('active');
        document.body.style.overflow = 'auto';

        // In a real application, you would:
        // 1. Send order to backend server
        // 2. Process payment
        // 3. Send confirmation email
        // 4. Update inventory
        console.log('Order processed with address:', order);
    }

    // Save orders to localStorage (simulating database)
    saveOrdersToStorage() {
        localStorage.setItem('novanest-orders', JSON.stringify(this.orders));
    }

    // Load orders from localStorage
    loadOrdersFromStorage() {
        const savedOrders = localStorage.getItem('novanest-orders');
        if (savedOrders) {
            try {
                this.orders = JSON.parse(savedOrders);
            } catch (e) {
                console.error('Error loading orders from storage:', e);
                this.orders = [];
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NovaNestApp();
    
    // Add checkout button functionality
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            app.checkout();
        });
    }
});

// Add some additional CSS for cart items and notifications
const additionalStyles = `
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
    }

    .cart-item-image img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
    }

    .cart-item-details {
        flex: 1;
    }

    .cart-item-details h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    .cart-item-price {
        color: var(--accent-color);
        font-weight: 600;
        margin: 0 0 0.5rem 0;
    }

    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .cart-item-quantity button {
        width: 30px;
        height: 30px;
        border: 1px solid var(--border-color);
        background: var(--light-background);
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cart-item-quantity button:hover {
        background: var(--border-color);
    }

    .cart-item-remove {
        background: none;
        border: none;
        color: var(--light-text);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: var(--transition);
    }

    .cart-item-remove:hover {
        background: var(--light-background);
        color: var(--accent-color);
    }

    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: var(--light-text);
    }

    .empty-cart i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--border-color);
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        grid-column: 1 / -1;
    }

    .wishlist-btn.active {
        color: var(--accent-color);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-content i {
        font-size: 1.2rem;
    }

    .product-category {
        color: var(--secondary-color);
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    .user-name {
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }

    .user-menu {
        padding: 0.5rem 0;
    }

    .user-menu-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: var(--transition);
    }

    .user-menu-item:hover {
        background: var(--light-background);
    }

    .user-menu-item i {
        width: 16px;
        color: var(--light-text);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
