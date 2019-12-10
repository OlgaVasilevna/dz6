//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]
let IMGS = [
    'https://cs8.pikabu.ru/post_img/big/2017/12/25/5/1514188160141511997.jpg', 
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HMUB2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1563827752399',
    'https://zeon18.ru/files/item/Xiaomi-Mi-Notebook-Air-4G-Officially-Announced-Weboo-co-2%20(1)_1.jpg',
    'https://files.sandberg.it/products/images/lg/640-05_lg.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81PLqxtrJ3L._SX466_.jpg'
    ]


//let products = [] //массив объектов

let catalog = {
    items: [],
    container: '.products',
    construct () {
        this._init () //_ - это обозначение инкапсулированного метода
    },
    _init () {
        this._handleData ()
        this.render ()
    },
    _handleData () {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push (this._createNewProduct (i))
        }
    },
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            product_id: IDS [index],
            product_img: IMGS[index]
        }
    },
    render () {
        let str = ``
        this.items.forEach (item => {
            str += `
                <div class="product">
                    <img class="img_catalog" width="300" height="200" src="${item.product_img}">
                    <p class="name_product">${item.product_name}</p>
                    <span class="price_product">${item.price}$</span>
                    <button  class="button_product" name="${item.product_id}")">Buy</button>
                </div>
            `
        });
        document.querySelector(this.container).innerHTML = str;
        
        document.querySelector(".cart_total").innerHTML = `${cart.total}`;
        let str1=``;
        cart.items.forEach ((product,index) => {
                str1+=`
            <div class="product_cart">
                    <img class="img_cart" width="100" height="100" src="${product.product_img}">
                    <div class="text_block">
                        <p class="text_cart">${product.product_name}</p>
                        <p class="text_cart">${product.price}$</p>
                        <p class="text_cart">quantity ${product.quantity}</p>
                        <button class="btn_minus" name="minus${product.product_id}">-</button>
                        <button class="btn_add" name="add${product.product_id}">+</button>
                        <button class="btn_delete" name="delete${product.product_id}">X</button>
                    </div>
            </div>`       
        });
        str1+=`<div>
        <p class="total">Quantity : ${cart.total}</p>
        <p class="total">Sum :  ${cart.sum}$</p>
      </div>`;
        document.querySelector(`.div_cart`).innerHTML = str1;
        this.items.forEach (item => {
            document.querySelector(`button[name="${item.product_id}"]`).addEventListener("click",cart.addProduct)
        });
        cart.items.forEach(item=>{
            document.querySelector(`button[name="minus${item.product_id}"]`).addEventListener("click",cart.deleteProduct)
        });
        cart.items.forEach(item=>{
            document.querySelector(`button[name="add${item.product_id}"]`).addEventListener("click",()=>{
                item.quantity++
                cart._checkTotal ();
                cart.calculateSum ();
                catalog.render();
            });
        });
        cart.items.forEach((item,index)=>{
            document.querySelector(`button[name="delete${item.product_id}"]`).addEventListener("click",()=>{
                delete cart.items[index];
                cart._checkTotal ();
                cart.calculateSum ();
                catalog.render()
            });
        });
    }
    
}
document.querySelector(".backet").addEventListener("click", () => {
            
    if ( document.querySelector(".div_cart").style.display == "none"){
        document.querySelector(".div_cart").style.display = "block";
    }
    else {
        document.querySelector(".div_cart").style.display = "none";
    }
})

let cart = {
    items: [],
    total: 0,
    sum: 0,
    addProduct (evt) {
        let id = +evt.target.name;
        //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
        let prod = catalog._createNewProduct (id);
        if (cart.items.length==0){
            prod.quantity=1
            cart.items[id]=prod
            cart._checkTotal ();
            cart.calculateSum ();
            catalog.render();
            return
        }
        for (let i=0;i<cart.items.length;i++) {  
            if (i==id && cart.items[i] != undefined){       
                cart.items[i].quantity++ ;
                break              
            }
            else if (cart.items.length-1<id){
                prod.quantity = 1;
                cart.items[id] = prod;
                break            
            }
            else if (i==id && cart.items[i]==undefined){
                prod.quantity = 1;
                cart.items[id] = prod;
                break
                
            }
        }
        cart._checkTotal ();
        cart.calculateSum ();
        catalog.render();
    
     },
    deleteProduct (evt) {
        let id = +/\d/.exec(evt.target.name)[0]
        cart.items.forEach((el,index)=>{
                if (el.product_id===id){
                    if (el.quantity>1) {
                        el.quantity--;
                        cart._checkTotal();
                        cart.calculateSum ();
                        catalog.render();
                    } else {
                        delete cart.items[index]
                        cart._checkTotal();
                        cart.calculateSum ();
                        catalog.render();
                    }
                }
        })               
        
    },
    calculateSum () {
        cart.sum=0;
        cart.items.forEach(el => {
            if (el!=undefined){
                this.sum+=el.price*el.quantity;
            }
        }) 
    },
    _checkTotal () {
        cart.total=0;
        cart.items.forEach(el => {
            if (el!=undefined){
                cart.total+=el.quantity;
            }
        })        

    },
}
catalog.construct () ;

