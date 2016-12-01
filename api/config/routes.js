module.exports = {

  //////Security controller
  //  !email
  //  !password
  //  !accountName
  //  @firstName
  //  @lastName
  //  <Policy : none>
  'post /signup': 'SecurityController.signup',
  //  !email
  //  !password
  //  !accountName
  //  <Policy : none>
  'post /signin': 'SecurityController.signin',
  //  !credentials
  //  <Policy : none>
  'post /refresh-token': 'SecurityController.refresh',


  'post /cart': 'CartController.create',
  'post /product': 'ProductController.create',
  'post /cart/:idCart/product/:idProduct': 'ProductController.addToCart',

}
