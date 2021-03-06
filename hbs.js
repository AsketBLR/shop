const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('equals', function (arg1, arg2, options){
    return (arg1 == arg2) ? options.fn(this) : '';
});
hbs.registerHelper('multiply', function (arg1, arg2){
    return Math.ceil(parseFloat(arg1)*parseFloat(arg2))
})
hbs.registerHelper('cartTotal', function (cart){
    if (Array.isArray(cart) && cart.length){
        let total = 0
        cart.forEach(item => {
            total += item.product.price * item.count
        })
        return total
    }
    return 0
})
hbs.registerHelper('isValid', function (errors, name){
    if (Array.isArray(errors) && errors.length){
        const error = errors.find(e=> e.param === name)
        if(error){
            return 'is-invalid'
        }
    }
    return ''
})
hbs.registerHelper('isValidMessage', function (errors, name){
    if (Array.isArray(errors) && errors.length){
        const error = errors.find(e=> e.param === name)
        if(error){
            return error.msg;
        }
    }
    return ''
})
hbs.registerHelper('paginate', function(pagination, options) {
    var type = options.hash.type || 'middle';
    var ret = '';
    var pageCount = Number(pagination.pageCount);
    var page = Number(pagination.page);
    var limit;
    if (options.hash.limit) limit = +options.hash.limit;

    //page pageCount
    var newContext = {};
    switch (type) {
        case 'middle':
            if (typeof limit === 'number') {
                var i = 0;
                var leftCount = Math.ceil(limit / 2) - 1;
                var rightCount = limit - leftCount - 1;
                if (page + rightCount > pageCount)
                    leftCount = limit - (pageCount - page) - 1;
                if (page - leftCount < 1)
                    leftCount = page - 1;
                var start = page - leftCount;

                while (i < limit && i < pageCount) {
                    newContext = { n: start };
                    if (start === page) newContext.active = true;
                    ret = ret + options.fn(newContext);
                    start++;
                    i++;
                }
            }
            else {
                for (var i = 1; i <= pageCount; i++) {
                    newContext = { n: i };
                    if (i === page) newContext.active = true;
                    ret = ret + options.fn(newContext);
                }
            }
            break;
        case 'previous':
            if (page === 1) {
                newContext = { disabled: true, n: 1 }
            }
            else {
                newContext = { n: page - 1 }
            }
            ret = ret + options.fn(newContext);
            break;
        case 'next':
            newContext = {};
            if (page === pageCount) {
                newContext = { disabled: true, n: pageCount }
            }
            else {
                newContext = { n: page + 1 }
            }
            ret = ret + options.fn(newContext);
            break;
        case 'first':
            if (page === 1) {
                newContext = { disabled: true, n: 1 }
            }
            else {
                newContext = { n: 1 }
            }
            ret = ret + options.fn(newContext);
            break;
        case 'last':
            if (page === pageCount) {
                newContext = { disabled: true, n: pageCount }
            }
            else {
                newContext = { n: pageCount }
            }
            ret = ret + options.fn(newContext);
            break;
    }

    return ret;
});

module.exports = hbs