const m = {
    main:(req, res) => {
        res.render('index');
    },

    index2:(req, res) => {
        res.render('index2');
    },

    about:(req, res) => {
        res.render('about');
    },
    

    contact:(req, res) => {
        res.render('contact');
    },

    news:(req, res) => {
        res.render('news');
    },

    singlenews:(req, res) => {
        res.render('single-news');
    },

    shop:(req, res) => {
        res.render('shop');
    },

    checkout:(req, res) => {
        res.render('checkout');
    },

    singleproduct:(req, res) => {
        res.render('single-product');
    },

    cart:(req, res) => {
        res.render('cart');
    },

    e404:(req, res) => {
        res.render('e404');
    },

    login:(req, res) => {
        res.render('login');
    }
    
};

module.exports = m;