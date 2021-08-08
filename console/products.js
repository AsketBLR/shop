require('dotenv').config({path: '../.env'})
const fs = require('fs');
const Product = require('../entity/Product.js')

let products = JSON.parse(fs.readFileSync('phone.json', 'utf-8'));

module.exports = async function main() {
    try {
        products = products.map(async (product) =>
            await Product.create({
                title: product.title,
                price: product.price > 10 ? product.price : Math.random()*1000,
                images: product.images,
                year: product.year,
                brand: product.brand,
                height: product.height,
                width: product.width,
                thickness: product.thickness,
                weight: product.weight,
                os: product.os,
                core: product.core,
                coreCount: product.core_count,
                hard: product.hard,
                ram: product.ram,
                material: product.material,
                screenResolution: product.screen_resolution,
                screenSize: product.screen_size,
                simCount: product.sim_count,
                nfc: product.nfc,
                wiFi: product.wi_fi,
                fastCharge: product.fast_charge,
                color: product.color
            }))
        return Promise.all(products)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}
