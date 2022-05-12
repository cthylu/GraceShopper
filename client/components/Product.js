import React from "react";
import { connect } from "react-redux";
import { addToCart, deleteProduct } from "../store";
import { Link, Route } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import Kit from './Kit';

const Product = ({ product, user, deleteProduct, addProductToCart }) => {
  return (
    <div>
      {
        <div className="teainfo">
          <img src={product.imageUrl} />
          <div>
            <h2 className="producttitle">{product.name}</h2>
            <div className="productinfo1">
            <div className="productpr">${product.price}</div>
            <p className="productdes">{product.description}</p>
            <h5 className="prodquantity">Quantity: {product.quantity} in stock</h5>
            </div>
            <div>
              { product.key === 'kit' ? <Route component={Kit} /> : null } 
            </div>

            <button
              className="addtocart"
              onClick={() => addProductToCart(product)}
            >
              Add To Cart
            </button>
          <div> <Route component={UpdateProduct}/> 
          <Link to='/products'>
          { user.isAdmin ? (
            <div className='admindelete'>
            <h5 className='admin'> Admin Only: </h5>
            <button className='admindeleteb' onClick={() => deleteProduct(product.id)}>Remove Product</button>
            </div>
          ) : null }
          </Link>
          </div>
          </div>
          {/* <Link to='/products'>
          { user.isAdmin ? (
            <div className='admindelete'>
            <h5 className='admin'> Admin Only: </h5>
            <button className='admindeleteb' onClick={() => deleteProduct(product.id)}>Remove Product</button>
            </div>
          ) : null }
          </Link> */}
        </div>
      }
     
    </div>
  );
};

const mapState = (state, otherProps) => {
  const product =
    state.products.find(
      (product) => product.id === otherProps.match.params.id * 1
    ) || {};
  const user = state.auth;
  return {
    product,
    user,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProduct(productId, history)),
    addProductToCart: (product) => dispatch(addToCart(console.log(product), product, history)),
  };
};

export default connect(mapState, mapDispatch)(Product);

// export class SingleProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     this.props.fetchSingleProduct(this.props.match.params.id);
//   }

//   render() {
//     const { product, user } = this.props;
//     return (
//       <div>
//         {
//           <div className="teainfo">
//             <img src={product.imageUrl} />
//             <div>
//               <h2>{product.name}</h2>
//               <p>{product.description}</p>
//               <h5>Quantity: { product.quantity } in stock</h5>

//               <button className="addtocart" onClick={() => addToCart(product)}>
//                 Add To Cart
//               </button>
//             </div>
//             { user.isAdmin ? (
//               <button onClick={() => this.props.deleteProduct(product.id)}>Remove Product</button>
//             ) : null }
//           </div>
//         }
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     product: state.singleProduct,
//     user: state.auth
//   };
// };

// const mapDispatch = (dispatch, { history }) => {
//   return {
//     fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId, history)),
//     deleteProduct: (product) => dispatch(deleteProduct(product)),
//   };
// };

// export default connect(mapState, mapDispatch)(SingleProduct);
