'use strict'

const db = require('../server/db')
const {Product, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: 'bones',
      isAdmin: true
    }),

    Product.create({
      name: 'Unicorn Puffs',
      description:
        'Includes all the vitamins and minerals for growing unicorns',
      price: 400
    }),
    Product.create({
      name: 'Honey Nut Cheerios',
      description: 'For building strong dinosaur bones and muscles!',
      price: 249,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51TaBLzGG3L._AC_SY400_.jpg'
    }),
    Product.create({
      name: 'Kix',
      description: 'Kid Tested, Mother Approved',
      price: 399,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51q%2BNKNBzSL._SX425_.jpg'
    }),
    Product.create({
      name: 'Wheaties',
      description: 'The Breakfast of Champions',
      price: 199,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81iMOFYh7RL._SY550_.jpg'
    }),
    Product.create({
      name: 'Din-Os',
      description: 'For building strong dinosaur bones and muscles!',
      price: 200
    }),
    Product.create({
      name: 'Rice Krispies',
      description: 'Snap! Crackle! Pop!',
      price: 450,
      imageUrl:
        'https://www.dollargeneral.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/0/0/00834601_kellogg_rice_krispies_cereal_12oz_right_facing_1.jpg'
    }),
    Product.create({
      name: 'Lucky Charms',
      description: 'They’re Magically Delicious!',
      price: 150,
      imageUrl:
        'https://ship.ralphs.com/img/Products/500/General-Mills/General-Mills-Lucky-Charms-with-Magical-Unicorn-Marshmallows-016000121836.jpg'
    })
  ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
