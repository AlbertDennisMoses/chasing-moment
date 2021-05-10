const router = require("express").Router();
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
