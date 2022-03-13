import "./css/CartTotal.css";

const CartTotal = ({ total, discount, amount }) => {
  return (
    <div class="cart_total">
      <div class="cart_totalHeading">
        <h3 class="head3">Price Summary -</h3>
      </div>
      <div class="cart_totalDetails">
        <div class="cart_priceDetail">
          <p class="text4">Price</p>
          <p class="text4">Rs. {total}</p>
        </div>
        <div class="cart_priceDetail">
          <p class="text4">Dicount</p>
          <p class="text4">Rs. {discount}</p>
        </div>
        {/* <div class="cart_priceDetail">
          <p class="text4">Delivery Charges</p>
          <p class="text4">Rs. 500</p>
        </div> */}
      </div>
      {total > 0 ? (
        <>
          <div class="cart_totalAmount">
            <h3 class="head3">Total Amount</h3>
            <h4 class="head4">Rs. {amount}</h4>
          </div>
          <div class="cart_totalAction">
            <p>You have made a total saving of Rs. {discount}</p>
            <button class="btn-sec">Place Order</button>
          </div>
        </>
      ) : (
        <h3 class="head3">Your Cart Is Empty</h3>
      )}
    </div>
  );
};

export default CartTotal;
