const AccessControl = require("accesscontrol");
const User = require('./entity/User.js');

const ac = new AccessControl();

const resources = {
    product : 'product',
    user: 'user',
    order: 'order'
}
ac.grant(User.roles.customer)
    .read(resources.product)
    .read(resources.user)
    .create(resources.order)

ac.grant(User.roles.employee)
    .extend(User.roles.customer)
    .create(resources.product)
    .update(resources.product)
    .update(resources.user)
    .update(resources.order)

ac.grant(User.roles.admin)
    .extend(User.roles.employee)
    .create(resources.user)
    .delete(resources.user)
    .delete(resources.product)
    .delete(resources.order)

ac.resources = resources

module.exports.rbac = ac