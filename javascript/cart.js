export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId : '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId : '2'
        }
    ];
}

function StoretoLocalstorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId) {
    let matchingitem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingitem = item;
        }
    });
    if (matchingitem) {
        matchingitem.quantity += 1;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId : '1'
        });
    }

    StoretoLocalstorage();
}

export function deletefromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    });

    cart = newCart;

    StoretoLocalstorage();
}

export function updatedeloption(productId, deliveryOptionId){
    let matchingitem;
    cart.forEach((item)=>{
        if ( productId === item.productId){
            matchingitem = item ;
        }
    });

    matchingitem.deliveryOptionId = deliveryOptionId;

    StoretoLocalstorage();
}