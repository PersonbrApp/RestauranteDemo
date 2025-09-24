// Global State
let products = [];
let cart = [];
let currentUser = null;
let checkoutStep = 'delivery';
let deliveryInfo = { type: 'delivery' };
let customerInfo = { name: '', phone: '' };
let paymentMethod = 'pix';
let deliverySettings = { enabled: false, price: 5.00 };
let dishOfTheDay = null;
let currentSlide = 0;
let bannerInterval = null;
let tawkToLoaded = false;

// Product Images
const productImages = {
    '1': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    '2': 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    '3': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    '4': 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
    '5': 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
    '6': 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
    '7': 'https://conteudo.imguol.com.br/6a/2020/01/24/ovo-frito-1579891845647_v2_750x1000.jpg',
    '8': 'https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2025/06/ovo-cozido_1749766714644.jpg',
    '9': 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    '10': 'https://thepetitpizzaria.com.br/parobe/wp-content/uploads/2021/06/Pet-2-Litros-Coca-Cola-PNG.png',
    '11': 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    '12': 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    '13': 'https://forbes.com.br/wp-content/uploads/2024/07/Life_A-picanha-e-um-tipo-de-corte-de-carne-bovis-criado-em-Sao-Paulo-e-considerada-a-melhor-comida-do-mundo.jpg',
    '14': 'https://i.ibb.co/JjsV5h7k/Design-sem-nome.png'
};

// Banner Images
const bannerImages = {
    dishOfTheDay: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    deliveryInfo: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg'
};

// Initial Products Data
const initialProducts = [
    {
        id: '1',
        name: 'Sabor da Roça',
        description: 'Moela ao molho com ervas finas acompanhada de arroz branco, feijão de caldo, macarrão e farofa Master',
        category: 'grelhados',
        price: { G: 17.99 },
        available: true,
        icon: '🐓',
        special: true
    },
    {
        id: '2',
        name: 'Filé de Frango Grelhado',
        description: 'Suculento filé de frango grelhado, servido com arroz branco, feijão de caldo, macarrão e farofa Master',
        category: 'grelhados',
        price: { P: 14.99, G: 17.99 },
        available: true,
        icon: '🍗'
    },
    {
        id: '3',
        name: 'Calabresa Acebolada',
        description: 'Calabresa acebolada acompanhada de arroz branco, feijão de caldo, macarrão e farofa Master',
        category: 'grelhados',
        price: { P: 14.99, G: 17.99 },
        available: true,
        icon: '🥨'
    },
    {
        id: '4',
        name: 'Mista com 2 Opções de Carne',
        description: 'Duas opções de carne à sua escolha com acompanhamentos tradicionais',
        category: 'mistas',
        price: { unique: 19.99 },
        available: true,
        icon: '🍖'
    },
    {
        id: '5',
        name: 'Mista com Bife',
        description: 'Mista especial incluindo bife como uma das opções de carne',
        category: 'mistas',
        price: { unique: 24.99 },
        available: true,
        icon: '🍖'
    },
    {
        id: '6',
        name: 'Bife Acebolado',
        description: 'Bife acebolado suculento, servido com arroz branco, feijão de caldo, macarrão e farofa Master',
        category: 'bife',
        price: { G: 19.99 },
        available: true,
        icon: '🥩'
    },
    {
        id: '7',
        name: 'Ovo Frito',
        description: 'Ovo frito fresquinho',
        category: 'adicionais',
        price: { unique: 3.00 },
        available: true,
        icon: '🍳'
    },
    {
        id: '8',
        name: 'Ovo Cozido',
        description: 'Ovo cozido perfeito',
        category: 'adicionais',
        price: { unique: 3.00 },
        available: true,
        icon: '🥚'
    },
    {
        id: '9',
        name: 'Coca-Cola 310ml',
        description: 'Refrigerante Coca-Cola 310ml gelado',
        category: 'bebidas',
        price: { unique: 6.00 },
        available: true,
        icon: '🥤'
    },
    {
        id: '10',
        name: 'Coca-Cola 2L',
        description: 'Refrigerante Coca-Cola 2L',
        category: 'bebidas',
        price: { unique: 15.00 },
        available: true,
        icon: '🥤'
    },
    {
        id: '11',
        name: 'Kuat 1.5L',
        description: 'Refrigerante Kuat 1.5L',
        category: 'bebidas',
        price: { unique: 10.00 },
        available: true,
        icon: '🥤'
    },
    {
        id: '12',
        name: 'Guaraná Indaiá 250ml',
        description: 'Refrigerante Guaraná Indaiá 250ml gelado',
        category: 'bebidas',
        price: { unique: 4.00 },
        available: true,
        icon: '🥤'
    },
    {
        id: '13',
        name: 'Picanha Premium',
        description: 'Picanha suína selecionada com acompanhamentos',
        category: 'grelhados',
        price: { unique: 42.90 },
        available: true,
        icon: '🥩'
    },
    {
        id: '14',
        name: 'Feijoada',
        description: 'Feijoada Goiana, com farofa especial',
        category: 'mista',
        price: { unique: 19.90 },
        available: true,
        icon: '🥩'
    }
];

// Storage Functions
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
        return defaultValue;
    }
}

// Função para verificar status do Tawk.to
function checkTawkToStatus() {
    const maxAttempts = 10;
    let attempts = 0;
    
    const checkInterval = setInterval(() => {
        attempts++;
        
        if (typeof Tawk_API !== 'undefined') {
            tawkToLoaded = true;
            console.log('✅ Tawk.to carregado com sucesso');
            clearInterval(checkInterval);
            
            // Configurações iniciais do chat
            if (typeof Tawk_API.onLoad === 'function') {
                Tawk_API.onLoad = function() {
                    Tawk_API.setAttributes({
                        name: 'Visitante Master Chef Goiano',
                        email: '',
                        store: 'Master Chef Goiano'
                    });
                };
            }
        }
        
        if (attempts >= maxAttempts) {
            console.warn('❌ Tawk.to não carregado após ' + maxAttempts + ' tentativas');
            clearInterval(checkInterval);
            // Adiciona classe de erro ao botão de chat
            const chatBtn = document.querySelector('.chat-btn-float');
            if (chatBtn) {
                chatBtn.classList.add('error');
            }
        }
    }, 1000);
}

// Função para recarregar o Tawk.to se necessário
function reloadTawkToIfNeeded() {
    if (typeof Tawk_API === 'undefined') {
        console.log('Recarregando Tawk.to...');
        
        // Remove o script existente
        const existingScript = document.querySelector('script[src*="tawk.to"]');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Recria o script
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/667f69c09d7f358570d38b4f/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
        
        // Tenta novamente após 3 segundos
        setTimeout(checkTawkToStatus, 3000);
    }
}

// Initialize App
function initApp() {
    // Verificar se o Tawk.to carregou
    checkTawkToStatus();
    
    products = loadFromStorage('master_chef_products', initialProducts);
    deliverySettings = loadFromStorage('master_chef_delivery', { enabled: false, price: 5.00 });
    dishOfTheDay = loadFromStorage('master_chef_dish_of_the_day', products.find(p => p.special) || products[0]);
    
    updateDeliveryStatus();
    renderBanner();
    renderProducts();
    setupEventListeners();
    startBannerRotation();
    
    updateCartDisplay();
    
    // Verifica novamente após 5 segundos se não carregou
    setTimeout(function() {
        if (!tawkToLoaded) {
            reloadTawkToIfNeeded();
        }
    }, 5000);
}

// Banner Functions
function renderBanner() {
    const dishSlide = document.getElementById('dish-of-the-day');
    const deliverySlide = document.getElementById('delivery-info');
    
    // Atualiza o prato do dia
    if (dishOfTheDay) {
        dishSlide.querySelector('img').src = productImages[dishOfTheDay.id] || bannerImages.dishOfTheDay;
        dishSlide.querySelector('h3').textContent = dishOfTheDay.name;
    }
    
    // Atualiza informações de entrega
    const deliveryTypeEl = document.getElementById('delivery-type');
    const workingHoursEl = document.getElementById('working-hours');
    
    if (deliverySettings.enabled) {
        deliveryTypeEl.textContent = `Frete: ${formatPrice(deliverySettings.price)}`;
    } else {
        deliveryTypeEl.textContent = 'Frete Grátis';
    }
    
    workingHoursEl.textContent = 'Seg a Dom: 09:00 às 16:00';
}

function startBannerRotation() {
    clearInterval(bannerInterval);
    bannerInterval = setInterval(nextSlide, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    startBannerRotation();
}

function prevSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    startBannerRotation();
}

function orderDishOfTheDay() {
    if (!dishOfTheDay) {
        console.error('Nenhum prato do dia definido');
        return;
    }
    
    // Verifica se o prato está disponível
    if (!dishOfTheDay.available) {
        alert('Este prato não está disponível no momento');
        return;
    }
    
    // Determina o tamanho padrão (G ou único)
    let size = 'unique';
    if (dishOfTheDay.price.G) {
        size = 'G';
    } else if (dishOfTheDay.price.P) {
        size = 'P'; // Caso tenha tamanho P também
    }
    
    // Adiciona ao carrinho
    updateQuantity(dishOfTheDay.id, size, 1);
    
    // Abre o carrinho
    openCart();
    
    // Feedback visual
    const cartBtn = document.querySelector('.cart-btn-float');
    cartBtn.classList.add('pulse');
    setTimeout(() => {
        cartBtn.classList.remove('pulse');
    }, 1000);
}

// Update delivery status in header
function updateDeliveryStatus() {
    const deliveryStatusEl = document.getElementById('delivery-status');
    if (deliverySettings.enabled) {
        deliveryStatusEl.textContent = formatPrice(deliverySettings.price);
    } else {
        deliveryStatusEl.textContent = 'GRÁTIS';
    }
}

// Função para abrir o chat Tawk.to
function openChat() {
    console.log('Abrindo chat...');
    
    if (typeof Tawk_API !== 'undefined') {
        try {
            // Remove classe de erro se existir
            const chatBtn = document.querySelector('.chat-btn-float');
            if (chatBtn) {
                chatBtn.classList.remove('error');
            }
            
            // Verifica se o chat está minimizado e maximiza
            if (Tawk_API.isChatMinimized && Tawk_API.isChatMinimized()) {
                Tawk_API.maximize();
                console.log('Chat maximizado com sucesso');
            } else if (Tawk_API.isChatHidden && Tawk_API.isChatHidden()) {
                Tawk_API.toggle();
                console.log('Chat mostrado com sucesso');
            } else {
                Tawk_API.maximize();
                console.log('Chat aberto com sucesso');
            }
            
            // Mensagem automática de boas-vindas após 2 segundos
            setTimeout(() => {
                if (typeof Tawk_API !== 'undefined' && Tawk_API.setAttributes) {
                    Tawk_API.setAttributes({
                        name: 'Cliente Master Chef Goiano',
                        email: 'cliente@masterchefgoiano.com.br',
                        store: 'Master Chef Goiano'
                    }, function(error){
                        if (!error) {
                            console.log('Atributos do chat configurados');
                        }
                    });
                }
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao abrir chat Tawk.to:', error);
            fallbackToWhatsApp();
        }
    } else {
        console.warn('Tawk.to não disponível, usando fallback para WhatsApp');
        fallbackToWhatsApp();
    }
}

// Fallback para WhatsApp
function fallbackToWhatsApp() {
    const message = 'Olá! Gostaria de informações sobre os pratos do Master Chef Goiano';
    const whatsappUrl = `https://wa.me/5561992069975?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Event Listeners
function setupEventListeners() {
    // Category filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.category);
        });
    });

    // Modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Product Functions
function renderProducts(category = 'all') {
    const container = document.getElementById('products-container');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-products">
                <p>Nenhum produto encontrado nesta categoria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card ${product.special ? 'special' : ''} ${!product.available ? 'unavailable' : ''}">
            <div class="product-header">
                <img src="${productImages[product.id] || productImages['1']}" 
                     alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.id === dishOfTheDay?.id ? '<span class="special-badge">⭐ PRATO DO DIA</span>' : ''}
                </div>
            </div>
            
            <p class="product-description">${product.description}</p>
            
            ${product.available ? renderPriceOptions(product) : '<div class="unavailable-label">INDISPONÍVEL</div>'}
        </div>
    `).join('');
}

function renderPriceOptions(product) {
    let html = '<div class="price-options">';
    
    if (product.price.P) {
        html += `
            <div class="price-option">
                <div class="price-info">
                    <span class="price-label">Marmitex P</span>
                    <span class="price-value">${formatPrice(product.price.P)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity('${product.id}', 'P', -1)" ${getQuantity(product.id, 'P') === 0 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${getQuantity(product.id, 'P')}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity('${product.id}', 'P', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    if (product.price.G) {
        html += `
            <div class="price-option">
                <div class="price-info">
                    <span class="price-label">Marmitex G</span>
                    <span class="price-value">${formatPrice(product.price.G)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity('${product.id}', 'G', -1)" ${getQuantity(product.id, 'G') === 0 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${getQuantity(product.id, 'G')}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity('${product.id}', 'G', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    if (product.price.unique) {
        html += `
            <div class="price-option">
                <div class="price-info">
                    <span class="price-value">${formatPrice(product.price.unique)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity('${product.id}', 'unique', -1)" ${getQuantity(product.id, 'unique') === 0 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${getQuantity(product.id, 'unique')}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity('${product.id}', 'unique', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function filterProducts(category) {
    renderProducts(category);
}

// Cart Functions
function getQuantity(productId, size) {
    const item = cart.find(item => item.productId === productId && item.size === size);
    return item ? item.quantity : 0;
}

function updateQuantity(productId, size, change) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.productId === productId && item.size === size);
    const currentQuantity = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    if (newQuantity === 0) {
        if (existingItemIndex >= 0) {
            cart.splice(existingItemIndex, 1);
        }
    } else {
        const price = product.price[size];
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity = newQuantity;
        } else {
            cart.push({
                productId,
                product,
                size,
                quantity: newQuantity,
                price
            });
        }
    }

    updateCartDisplay();
    renderProducts(getCurrentCategory());
}

function getCurrentCategory() {
    const activeBtn = document.querySelector('.category-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'all';
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    cartCountEl.textContent = totalItems;
    
    if (totalItems === 0) {
        cartCountEl.style.display = 'none';
    } else {
        cartCountEl.style.display = 'flex';
    }
}

function calculateTotal() {
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryInfo.type === 'delivery' && deliverySettings.enabled ? deliverySettings.price : 0;
    return itemsTotal + deliveryFee;
}

function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Modal Functions
function openCart() {
    renderCartModal();
    document.getElementById('cart-modal').classList.add('active');
}

function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

function renderCartModal() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartFooterEl = document.getElementById('cart-footer');

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 0.875rem;">Adicione alguns itens deliciosos!</p>
            </div>
        `;
        cartFooterEl.innerHTML = '';
        return;
    }

    cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-header">
                <div class="cart-item-info">
                    <img src="${productImages[item.product.id] || productImages['1']}" 
                         alt="${item.product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.product.name}</h3>
                        <p class="cart-item-size">${item.size !== 'unique' ? `Marmitex ${item.size}` : ''}</p>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeCartItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateCartItemQuantity(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateCartItemQuantity(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-price">
                    ${formatPrice(item.price * item.quantity)}
                </div>
            </div>
        </div>
    `).join('');

    const total = calculateTotal();
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryInfo.type === 'delivery' && deliverySettings.enabled ? deliverySettings.price : 0;

    cartFooterEl.innerHTML = `
        <div class="cart-total">
            <div class="cart-total-row">
                <span>Subtotal:</span>
                <span>${formatPrice(itemsTotal)}</span>
            </div>
            ${deliveryFee > 0 ? `
                <div class="cart-total-row">
                    <span>Taxa de entrega:</span>
                    <span>${formatPrice(deliveryFee)}</span>
                </div>
            ` : ''}
            <div class="cart-total-final">
                <span>Total:</span>
                <span class="total-value">${formatPrice(total)}</span>
            </div>
        </div>
        <button class="checkout-btn" onclick="openCheckout()">
            <i class="fas fa-credit-card"></i>
            Finalizar Pedido
        </button>
    `;
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCartModal();
    renderProducts(getCurrentCategory());
}

function updateCartItemQuantity(index, change) {
    const item = cart[index];
    const newQuantity = Math.max(1, item.quantity + change);
    item.quantity = newQuantity;
    updateCartDisplay();
    renderCartModal();
    renderProducts(getCurrentCategory());
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
        return;
    }
    
    checkoutStep = 'delivery';
    renderCheckoutModal();
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function backToCart() {
    document.getElementById('checkout-modal').classList.remove('active');
    document.getElementById('cart-modal').classList.add('active');
}

function renderCheckoutModal() {
    const titleEl = document.getElementById('checkout-title');
    const contentEl = document.getElementById('checkout-content');

    switch (checkoutStep) {
        case 'delivery':
            titleEl.textContent = 'Forma de Recebimento';
            contentEl.innerHTML = renderDeliveryStep();
            break;
        case 'customer':
            titleEl.textContent = 'Dados do Cliente';
            contentEl.innerHTML = renderCustomerStep();
            break;
        case 'payment':
            titleEl.textContent = 'Forma de Pagamento';
            contentEl.innerHTML = renderPaymentStep();
            break;
        case 'summary':
            titleEl.textContent = 'Confirmação do Pedido';
            contentEl.innerHTML = renderSummaryStep();
            break;
    }
}

function renderDeliveryStep() {
    return `
        <div class="checkout-step">
            <h3 style="margin-bottom: 1rem; text-align: center;">Como você deseja receber seu pedido?</h3>
            
            <div class="delivery-options">
                <div class="delivery-option ${deliveryInfo.type === 'delivery' ? 'active' : ''}" onclick="setDeliveryType('delivery')">
                    <div class="delivery-option-icon ${deliveryInfo.type === 'delivery' ? 'active' : ''}">
                        <i class="fas fa-motorcycle"></i>
                    </div>
                    <h3>Entrega</h3>
                    <p>${deliverySettings.enabled ? formatPrice(deliverySettings.price) : 'GRÁTIS'}</p>
                </div>
                
                <div class="delivery-option ${deliveryInfo.type === 'pickup' ? 'active' : ''}" onclick="setDeliveryType('pickup')">
                    <div class="delivery-option-icon ${deliveryInfo.type === 'pickup' ? 'active' : ''}">
                        <i class="fas fa-store"></i>
                    </div>
                    <h3>Retirar</h3>
                    <p>Na loja</p>
                </div>
                
                <div class="delivery-option ${deliveryInfo.type === 'table' ? 'active' : ''}" onclick="setDeliveryType('table')">
                    <div class="delivery-option-icon ${deliveryInfo.type === 'table' ? 'active' : ''}">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3>Mesa</h3>
                    <p>Pedido na mesa</p>
                </div>
            </div>
            
            ${deliveryInfo.type === 'delivery' ? `
                <div class="address-form">
                    <h4><i class="fas fa-map-marker-alt" style="color: #dc2626;"></i> Endereço de Entrega</h4>
                    
                    <div class="form-group">
                        <label>CEP para Entrega *</label>
                        <div class="cep-input-group">
                            <input type="text" id="cep-input" placeholder="00000-000" maxlength="9" value="${deliveryInfo.cep || ''}" oninput="handleCepInput(this)">
                            <button class="cep-btn" onclick="searchCep()" id="cep-btn">Buscar</button>
                        </div>
                    </div>
                    
                    ${deliveryInfo.address ? `
                        <div class="form-group">
                            <label>Endereço encontrado:</label>
                            <div class="address-found">
                                <p>${deliveryInfo.address.street}, ${deliveryInfo.address.neighborhood}</p>
                                <p>${deliveryInfo.address.city} - ${deliveryInfo.address.state}</p>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Número *</label>
                            <input type="text" id="address-number" placeholder="Ex: 123, Apto 45" value="${deliveryInfo.address.number || ''}" oninput="handleAddressInput()">
                        </div>
                        
                        <div class="form-group">
                            <label>Ponto de Referência (opcional)</label>
                            <input type="text" id="address-reference" placeholder="Ex: Próximo ao mercado" value="${deliveryInfo.address.reference || ''}" oninput="handleAddressInput()">
                        </div>
                    ` : ''}
                </div>
            ` : ''}
            
            ${deliveryInfo.type === 'table' ? `
                <div class="address-form">
                    <h4><i class="fas fa-utensils" style="color: #dc2626;"></i> Informe o número da mesa</h4>
                    
                    <div class="form-group">
                        <label>Número da Mesa *</label>
                        <input type="text" id="table-number" placeholder="Ex: 12" value="${deliveryInfo.tableNumber || ''}" oninput="handleTableInput(this)">
                    </div>
                </div>
            ` : ''}
            
            <button class="continue-btn" onclick="proceedToCustomer()" ${!canProceedToCustomer() ? 'disabled' : ''}>
                Continuar para Dados do Cliente
            </button>
        </div>
    `;
}

function renderCustomerStep() {
    return `
        <div class="checkout-step">
            <h3>Quase lá! Precisamos dos seus dados</h3>
            <p>Para finalizar o pedido e manter contato</p>
            
            <div class="form-group">
                <label>Nome Completo *</label>
                <input type="text" id="customer-name" placeholder="Digite seu nome completo" value="${customerInfo.name}" oninput="handleCustomerInput()">
            </div>
            
            <div class="form-group">
                <label>Telefone/WhatsApp *</label>
                <input type="tel" id="customer-phone" placeholder="(00) 00000-0000" maxlength="15" value="${customerInfo.phone}" oninput="handlePhoneInput(this)">
                <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">Será usado para confirmar o pedido</p>
            </div>
            
            <button class="continue-btn" onclick="proceedToPayment()" ${!canProceedToPayment() ? 'disabled' : ''}>
                Continuar para Pagamento
            </button>
        </div>
    `;
}

function renderPaymentStep() {
    return `
        <div class="checkout-step">
            <div class="payment-note">
                💰 Lembre-se: O pagamento será presencialmente no ato da entrega!
            </div>
            
            <div class="payment-options">
                <div class="payment-option pix ${paymentMethod === 'pix' ? 'active' : ''}" onclick="setPaymentMethod('pix')">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>PIX</h3>
                    <p>Instantâneo e seguro</p>
                </div>
                <div class="payment-option cash ${paymentMethod === 'cash' ? 'active' : ''}" onclick="setPaymentMethod('cash')">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3>Dinheiro</h3>
                    <p>Na entrega</p>
                </div>
                <div class="payment-option credit ${paymentMethod === 'credit' ? 'active' : ''}" onclick="setPaymentMethod('credit')">
                    <i class="fas fa-credit-card"></i>
                    <h3>Cartão Crédito</h3>
                    <p>Débito ou crédito</p>
                </div>
                <div class="payment-option debit ${paymentMethod === 'debit' ? 'active' : ''}" onclick="setPaymentMethod('debit')">
                    <i class="fas fa-credit-card"></i>
                    <h3>Cartão Débito</h3>
                    <p>Cartão na entrega</p>
                </div>
            </div>
            
            <button class="continue-btn" onclick="proceedToSummary()">
                Revisar Pedido
            </button>
        </div>
    `;
}

function renderSummaryStep() {
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryInfo.type === 'delivery' && deliverySettings.enabled ? deliverySettings.price : 0;
    const total = itemsTotal + deliveryFee;

    return `
        <div class="checkout-step">
            <!-- Customer Info -->
            <div class="customer-info summary-section">
                <h3><i class="fas fa-user"></i> Dados do Cliente</h3>
                <p><strong>Nome:</strong> ${customerInfo.name}</p>
                <p><strong>Telefone:</strong> ${customerInfo.phone}</p>
            </div>

            <!-- Order Summary -->
            <div class="order-summary summary-section">
                <h3><i class="fas fa-shopping-bag"></i> Resumo do Pedido</h3>
                ${cart.map(item => `
                    <div class="summary-item">
                        <div class="summary-item-info">
                            <h4>${item.product.name}</h4>
                            <p class="summary-item-details">
                                ${item.size !== 'unique' ? `Marmitex ${item.size}` : ''} - Qtd: ${item.quantity}
                            </p>
                        </div>
                        <div class="summary-price">${formatPrice(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
                
                <div class="summary-totals">
                    <div class="summary-total-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(itemsTotal)}</span>
                    </div>
                    ${deliveryFee > 0 ? `
                        <div class="summary-total-row">
                            <span>Taxa de entrega</span>
                            <span>${formatPrice(deliveryFee)}</span>
                        </div>
                    ` : ''}
                    <div class="summary-total-final">
                        <span>Total</span>
                        <span class="total-value">${formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            <!-- Delivery Info -->
            <div class="delivery-summary summary-section">
                <h3><i class="fas fa-${deliveryInfo.type === 'delivery' ? 'map-marker-alt' : deliveryInfo.type === 'table' ? 'users' : 'store'}"></i> ${getDeliveryLabel()}</h3>
                ${deliveryInfo.type === 'delivery' && deliveryInfo.address ? `
                    <div style="font-size: 0.875rem; color: #059669;">
                        <p>${deliveryInfo.address.street}, ${deliveryInfo.address.number}</p>
                        <p>${deliveryInfo.address.neighborhood}</p>
                        <p>${deliveryInfo.address.city} - ${deliveryInfo.address.state}</p>
                        ${deliveryInfo.address.reference ? `<p>Ref: ${deliveryInfo.address.reference}</p>` : ''}
                    </div>
                ` : deliveryInfo.type === 'table' ? `
                    <p style="font-size: 0.875rem; color: #059669;">Mesa: ${deliveryInfo.tableNumber}</p>
                ` : `
                    <p style="font-size: 0.875rem; color: #059669;">Retirada na loja</p>
                `}
            </div>

            <!-- Payment Info -->
            <div class="payment-summary summary-section">
                <h3><i class="fas fa-credit-card"></i> Pagamento</h3>
                <p style="font-size: 0.875rem; color: #7c3aed;">${getPaymentLabel()}</p>
                <p style="font-size: 0.75rem; color: #f59e0b; margin-top: 0.25rem;">Pagamento presencial no ato da entrega</p>
            </div>

            <button class="whatsapp-btn" onclick="sendWhatsAppOrder()">
                <i class="fab fa-whatsapp"></i>
                Enviar Pedido via WhatsApp
            </button>
        </div>
    `;
}

// Delivery Step Functions
function setDeliveryType(type) {
    deliveryInfo.type = type;
    if (type !== 'delivery') {
        deliveryInfo.address = null;
        deliveryInfo.cep = null;
    }
    if (type !== 'table') {
        deliveryInfo.tableNumber = null;
    }
    renderCheckoutModal();
}

function handleCepInput(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    input.value = value;
    deliveryInfo.cep = value;
}

function handleAddressInput() {
    const number = document.getElementById('address-number').value;
    const reference = document.getElementById('address-reference').value;
    
    if (deliveryInfo.address) {
        deliveryInfo.address.number = number;
        deliveryInfo.address.reference = reference;
    }
    
    // Atualiza o botão de continuar
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.disabled = !canProceedToCustomer();
    }
}

function handleTableInput(input) {
    deliveryInfo.tableNumber = input.value;
    
    // Atualiza o botão de continuar
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.disabled = !canProceedToCustomer();
    }
}

async function searchCep() {
    const cepInput = document.getElementById('cep-input');
    const cepBtn = document.getElementById('cep-btn');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('CEP deve ter 8 dígitos');
        return;
    }
    
    cepBtn.textContent = '...';
    cepBtn.disabled = true;
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            alert('CEP não encontrado');
            return;
        }
        
        deliveryInfo.address = {
            cep: data.cep,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            number: '',
            reference: ''
        };
        
        renderCheckoutModal();
        
    } catch (error) {
        alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
        cepBtn.textContent = 'Buscar';
        cepBtn.disabled = false;
    }
}

// Customer Step Functions
function handleCustomerInput() {
    customerInfo.name = document.getElementById('customer-name').value;
    
    // Atualiza o botão de continuar
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.disabled = !canProceedToPayment();
    }
}

function handlePhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
    customerInfo.phone = value;
    
    // Atualiza o botão de continuar
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.disabled = !canProceedToPayment();
    }
}

// Payment Step Functions
function setPaymentMethod(method) {
    paymentMethod = method;
    renderCheckoutModal();
}

// Navigation Functions
function canProceedToCustomer() {
    if (deliveryInfo.type === 'pickup') return true;
    if (deliveryInfo.type === 'delivery') {
        return deliveryInfo.address && 
               deliveryInfo.address.number && 
               deliveryInfo.address.number.trim() !== '' &&
               deliveryInfo.address.street &&
               deliveryInfo.address.neighborhood;
    }
    if (deliveryInfo.type === 'table') {
        return deliveryInfo.tableNumber && 
               deliveryInfo.tableNumber.trim() !== '';
    }
    return false;
}

function canProceedToPayment() {
    return customerInfo.name && 
           customerInfo.name.trim().length >= 2 && 
           customerInfo.phone && 
           customerInfo.phone.replace(/\D/g, '').length >= 10;
}

function proceedToCustomer() {
    if (!canProceedToCustomer()) {
        alert('Por favor, preencha todas as informações necessárias para continuar.');
        return;
    }
    checkoutStep = 'customer';
    renderCheckoutModal();
}

function proceedToPayment() {
    if (!canProceedToPayment()) {
        alert('Por favor, preencha seu nome e telefone corretamente para continuar.');
        return;
    }
    checkoutStep = 'payment';
    renderCheckoutModal();
}

function proceedToSummary() {
    checkoutStep = 'summary';
    renderCheckoutModal();
}

// Helper Functions
function getDeliveryLabel() {
    switch (deliveryInfo.type) {
        case 'delivery': return 'Entrega';
        case 'pickup': return 'Retirada na loja';
        case 'table': return 'Mesa';
        default: return 'Não informado';
    }
}

function getPaymentLabel() {
    switch (paymentMethod) {
        case 'pix': return 'PIX';
        case 'cash': return 'Dinheiro';
        case 'credit': return 'Cartão de Crédito';
        case 'debit': return 'Cartão de Débito';
        default: return 'Não informado';
    }
}

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de enviar o pedido.');
        return;
    }

    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryInfo.type === 'delivery' && deliverySettings.enabled ? deliverySettings.price : 0;
    const total = itemsTotal + deliveryFee;
    
    let message = `*🏆 PEDIDO MASTER CHEF GOIANO🏆* \n\n`;
    message += ` *📅Data:* ${new Date().toLocaleDateString('pt-BR')}\n`;
    message += ` *⏰Hora:* ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}\n\n`;
    
    // Customer info
    message += `👤* CLIENTE*\n`;
    message += `Nome: ${customerInfo.name}\n`;
    message += `Telefone: ${customerInfo.phone}\n\n`;
    
    // Delivery info
    message += `*🚚 ${getDeliveryLabel().toUpperCase()}*\n`;
    if (deliveryInfo.type === 'delivery' && deliveryInfo.address) {
        message += `Endereço: ${deliveryInfo.address.street}, ${deliveryInfo.address.number}\n`;
        message += `Bairro: ${deliveryInfo.address.neighborhood}\n`;
        message += `Cidade: ${deliveryInfo.address.city} - ${deliveryInfo.address.state}\n`;
        if (deliveryInfo.address.reference) {
            message += `Referência: ${deliveryInfo.address.reference}\n`;
        }
    } else if (deliveryInfo.type === 'table') {
        message += `Mesa: ${deliveryInfo.tableNumber}\n`;
    }
    message += `\n`;
    
    // Items
    message += `*🍽️ITENS DO PEDIDO*\n`;
    cart.forEach((item, index) => {
        const sizeText = item.size !== 'unique' ? ` (${item.size})` : '';
        message += `${index + 1}. ${item.product.name}${sizeText}\n`;
        message += `   Quantidade: ${item.quantity}x\n`;
        message += `   Valor: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    // Totals
    message += `*💰 RESUMO DO VALOR*\n`;
    message += `Subtotal: ${formatPrice(itemsTotal)}\n`;
    if (deliveryFee > 0) {
        message += `Taxa de entrega: ${formatPrice(deliveryFee)}\n`;
    }
    message += `*TOTAL: ${formatPrice(total)}*\n\n`;
    
    // Payment
    message += `*💳 FORMA DE PAGAMENTO*\n`;
    message += `${getPaymentLabel()}\n\n`;
    message += `_O pagamento será realizado no ato da entrega/retirada._\n\n`;
    message += ` *🔔Obrigado pelo seu pedido!🔔* \n`;
    message += `Entraremos em contato para confirmar.`;
    
    const phoneNumber = '5561992069975'; // Número do restaurante
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
    
    // Limpa o carrinho e reseta o estado
    cart = [];
    saveToStorage('master_chef_cart', cart);
    
    // Reseta as informações do cliente e entrega
    customerInfo = { name: '', phone: '' };
    deliveryInfo = { type: 'delivery' };
    paymentMethod = 'pix';
    checkoutStep = 'delivery';
    
    // Atualiza a UI
    updateCartDisplay();
    closeCheckout();
    renderProducts(getCurrentCategory());
    
    // Mostra mensagem de sucesso
    alert('Pedido enviado com sucesso! Você será redirecionado para o WhatsApp.');
}

// Botão Instagram
function openInstagram() {
    window.open('https://instagram.com/personbrasil', '_blank');
}

// Botão WhatsApp Suporte
function openWhatsAppSupport() {
    const phoneNumber = '5561992069975';
    const message = 'Olá, preciso de ajuda com meu pedido no Master Chef Goiano!';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Botão Compartilhar
function shareRestaurant() {
    const message = `🍽️ *Master Chef Goiano* 🍽️\n\nSabores autênticos da culinária goiana!\n\nPeça agora: ${window.location.href}\n\nWhatsApp: (61) 99206-9975`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Admin Functions
function openAdmin() {
    renderAdminModal();
    document.getElementById('admin-modal').classList.add('active');
}

function closeAdmin() {
    document.getElementById('admin-modal').classList.remove('active');
}

function renderAdminModal() {
    const contentEl = document.getElementById('admin-content');
    
    if (!currentUser) {
        contentEl.innerHTML = `
            <div class="admin-login">
                <div class="lock-icon">🔒</div>
                <h3>Login Administrativo</h3>
                <p>Faça login para gerenciar produtos e preços</p>
                
                <form class="login-form" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>Usuário</label>
                        <input type="text" id="admin-username" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="admin-password" required>
                    </div>
                    <button type="submit" class="login-btn">Entrar</button>
                    <div id="login-error" class="login-error"></div>
                </form>
                
                <div class="test-credentials">
                    <strong>Dados de teste:</strong><br>
                    Usuário: admin<br>
                    Senha: masterchef123
                </div>
            </div>
        `;
    } else {
        contentEl.innerHTML = `
            <div class="admin-header-controls">
                <h3>Gerenciar Produtos</h3>
                <button class="logout-btn" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Sair
                </button>
            </div>
            
            <div class="delivery-settings">
                <h4><i class="fas fa-truck"></i> Configurações de Entrega</h4>
                <div class="delivery-controls">
                    <div class="delivery-toggle">
                        <label>Cobrar taxa de entrega</label>
                        <div class="toggle-switch ${deliverySettings.enabled ? 'active' : ''}" onclick="toggleDeliveryFee()"></div>
                    </div>
                    <div class="delivery-price-input">
                        <label>Valor:</label>
                        <input type="number" step="0.01" min="0" value="${deliverySettings.price.toFixed(2)}" 
                               onchange="updateDeliveryPrice(this.value)" ${!deliverySettings.enabled ? 'disabled' : ''}>
                    </div>
                </div>
            </div>
            
            <div class="banner-admin-controls">
                <h4><i class="fas fa-image"></i> Configurações do Banner</h4>
                <div class="form-group">
                    <label>Prato do Dia</label>
                    <select class="banner-product-select" onchange="updateDishOfTheDay(this.value)">
                        ${products.map(p => `
                            <option value="${p.id}" ${p.id === dishOfTheDay?.id ? 'selected' : ''}>${p.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>URL da Imagem (opcional)</label>
                    <input type="text" class="banner-image-url" placeholder="URL da imagem personalizada" 
                           value="${productImages[dishOfTheDay?.id] || ''}" onchange="updateBannerImage(this.value, '${dishOfTheDay?.id}')">
                </div>
                <button class="support-btn" onclick="openWhatsAppSupport()">
                    <i class="fab fa-whatsapp"></i> Suporte do Sistema
                </button>
            </div>
            
            <div class="admin-products">
                ${products.map(product => `
                    <div class="admin-product">
                        <div class="admin-product-header">
                            <div class="admin-product-info">
                                <span class="admin-product-icon">${product.icon}</span>
                                <div class="admin-product-details">
                                    <h4>${product.name}</h4>
                                    <p class="admin-product-category">${product.category}</p>
                                </div>
                            </div>
                            <div class="availability-toggle ${product.available ? 'available' : 'unavailable'}" 
                                 onclick="toggleProductAvailability('${product.id}')">
                                <i class="fas fa-toggle-${product.available ? 'on' : 'off'}"></i>
                                <span>${product.available ? 'Disponível' : 'Indisponível'}</span>
                            </div>
                        </div>
                        
                        <div class="price-controls">
                            ${product.price.P ? `
                                <div class="price-control">
                                    <label>Marmitex P</label>
                                    <input type="number" step="0.01" min="0" value="${product.price.P}" 
                                           onchange="updateProductPrice('${product.id}', 'P', this.value)">
                                </div>
                            ` : ''}
                            ${product.price.G ? `
                                <div class="price-control">
                                    <label>Marmitex G</label>
                                    <input type="number" step="0.01" min="0" value="${product.price.G}" 
                                           onchange="updateProductPrice('${product.id}', 'G', this.value)">
                                </div>
                            ` : ''}
                            ${product.price.unique ? `
                                <div class="price-control">
                                    <label>Preço Único</label>
                                    <input type="number" step="0.01" min="0" value="${product.price.unique}" 
                                           onchange="updateProductPrice('${product.id}', 'unique', this.value)">
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="product-image-preview">
                            <img src="${productImages[product.id] || productImages['1']}" 
                                 alt="${product.name}" class="admin-product-image">
                            <p class="image-url">Imagem: ${productImages[product.id] || 'Padrão'}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('login-error');
    
    if (username === 'admin' && password === 'masterchef123') {
        currentUser = { username };
        saveToStorage('master_chef_user', currentUser);
        renderAdminModal();
    } else {
        errorEl.textContent = 'Usuário ou senha incorretos';
        errorEl.style.display = 'block';
    }
}

function handleLogout() {
    currentUser = null;
    saveToStorage('master_chef_user', null);
    renderAdminModal();
}

function toggleDeliveryFee() {
    deliverySettings.enabled = !deliverySettings.enabled;
    saveToStorage('master_chef_delivery', deliverySettings);
    updateDeliveryStatus();
    renderAdminModal();
    renderBanner();
}

function updateDeliveryPrice(value) {
    const price = parseFloat(value);
    if (!isNaN(price) && price >= 0) {
        deliverySettings.price = price;
        saveToStorage('master_chef_delivery', deliverySettings);
        updateDeliveryStatus();
        renderBanner();
    }
}

function updateDishOfTheDay(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        dishOfTheDay = product;
        saveToStorage('master_chef_dish_of_the_day', dishOfTheDay);
        renderBanner();
        renderProducts(getCurrentCategory());
    }
}

function updateBannerImage(url, productId) {
    if (url && productId) {
        productImages[productId] = url;
        saveToStorage('master_chef_product_images', productImages);
        renderBanner();
        renderProducts(getCurrentCategory());
    }
}

function toggleProductAvailability(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.available = !product.available;
        saveToStorage('master_chef_products', products);
        renderAdminModal();
        renderProducts(getCurrentCategory());
    }
}

function updateProductPrice(productId, priceType, value) {
    const price = parseFloat(value);
    if (isNaN(price) || price < 0) return;
    
    const product = products.find(p => p.id === productId);
    if (product) {
        product.price[priceType] = price;
        saveToStorage('master_chef_products', products);
        renderProducts(getCurrentCategory());
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda um pouco mais para garantir que tudo carregou
    setTimeout(function() {
        initApp();
    }, 1000);
});