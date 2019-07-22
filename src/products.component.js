import React from 'react';

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          id: "",
          title: "",
          products: []
        }

        this.onTitleChange = this.onTitleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.findAllProducts = this.findAllProducts.bind(this)
        this.removeProduct= this.removeProduct.bind(this)
      }

    componentDidMount() {
      this.findAllProducts()
    }

    addProduct() {
      var data = {}
      data.title = this.state.title
      fetch('/products',{method:'POST',   headers:{
        'Content-Type': 'application/json'
      },  body: JSON.stringify(data)}).then(() => {
        this.findAllProducts();
      })
    }

    findProduct() {

    }

    findAllProducts() {
      fetch('/products',{ headers:{
        'Content-Type': 'application/json'
      }}).then(response => {
        return response.json()
      }).then(data => {
        this.setState({products: data});
      })
    }

    removeProduct(index) {
      var id = this.state.products[index]._id
      fetch('/products/' + id,{method:'DELETE',   headers:{
        'Content-Type': 'application/json'
      }}).then(() => {
        this.findAllProducts();
      })
    }

    onTitleChange(e) {
      this.setState({title: e.target.value})
    }

      render() {
          return <div>
            <h1>Products
            </h1>

            <p>Title: <input onChange={(e) => this.onTitleChange(e)}/><button onClick={this.addProduct}>Add</button></p>

              {
              this.state.products.map((product,index) => <p key={index}> {product.title}
                                                            <button  onClick={() => this.removeProduct(index)}> 
                                                            Remove</button></p>)
            }



          </div>
      }

    }
    export default Products