import React from 'react';
import { connect } from 'react-redux';
import * as coffeeItemAction from './actions/coffeeItemAction';
import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // coffee: [{
      //   title: '',
      //   capacity: '',
      //   price: '',
      //   image: ''
      // }],
      coffee: [],
      showForm: false,
      titleError: '',
      capacityError: '',
      priceError: '',
      inputKey: Date.now() // for file input delete
    }
  }

  // after button press - show form
  showForm = () => {
    this.setState((prevState) => {
      return { showForm: !prevState.showForm }
    });
  }

  // handle input change and validate
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { title, capacity, price } = this.state;
      this.setState({
        titleError: !title ? 'Title can not be empty' : null,
      }, () => {
        this.setState({
          ...this.state,
          capacityError: !capacity ? 'You should add a capacity' : null,
        }, () => {
          this.setState({
            ...this.state,
            priceError: !price ? 'You should add a price' : null,
          });
        });
      })
    });
  };

  // handleTitleChange = event => {
  //   const obj = { title: event.target.value };
  //   this.setState(({
  //     coffee: [
  //       Object.assign({}, obj)
  //     ]
  //   }))
  // };

  // handleCapacityChange = event => {
  //   const obj = { capacity: event.target.value };
  //   this.setState(({
  //     coffee: [
  //       ...this.state.coffee,
  //       Object.assign({}, obj)
  //     ]
  //   }))
  // };

  // handlePriceChange = event => {
  //   const obj = { price: event.target.value };
  //   this.setState(({
  //     coffee: [
  //       ...this.state.coffee,
  //       Object.assign({}, obj)
  //     ]
  //   }))
  // };


  // submit form
  handleSubmit = (e) => {
    e.preventDefault();
    let coffeeItem = {
      title: this.state.title,
      capacity: this.state.capacity,
      price: this.state.price,
      image: this.state.image
    }
    this.setState({
      title: '',
      capacity: '',
      price: '',
      image: '',
      showForm: false,
      inputKey: Date.now()
    });
    this.props.createCoffeeItem(coffeeItem);
  }

  // reset form
  resetForm = () => {
    this.setState({
      ...this.state,
      title: '',
      capacity: '',
      price: '',
      image: '',
      inputKey: Date.now()
    })
  }

  addedCoffee(item, index) {
    return (
      <div className="coffee__item" key={index}>
        <button onClick={(e) => this.deleteCoffeeItem(e, index)}><i className="fa fa-times fa-2x icon"></i></button>
        <img src={item.image} alt="black coffee" />
        <p className="coffee__title">{item.title}</p>
        <hr className="coffee__line" />
        <div className="coffee__variants coffee--title">
          <div>ml</div>
          <div>Eur</div>
        </div>
        <div className="coffee__variants">
          <div>{item.capacity} ml</div>
          <div>{item.price} Eur</div >
        </div>
      </div>
    )
  }

  // delete one coffee item
  deleteCoffeeItem(e, index) {
    e.preventDefault();
    this.props.deleteCoffeeItem(index);
  }

  // after add image to input
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="container__title">Coffee price list billboard</h1>
        <div id="container"></div>
        <div className="form">
          <div className="form__title">
            <h3 className="heading">Add New Coffee</h3>
            <button className="button button--add" onClick={this.showForm}>+</button>
          </div>
          <form className={this.state.showForm ? 'form__container:active' : 'form__container'} onSubmit={this.handleSubmit} >
            <label htmlFor="title">
              <input type="text" id='title' className={`form-control ${this.state.titleError ? 'is-invalid' : ''}`} name="title" placeholder="Title" onChange={this.handleChange} value={this.state.title} />
              <span>Title</span>
            </label>
            <div className='error'>{this.state.titleError}</div>
            <label htmlFor="capacity">
              <input type="number" id='capacity' className={`form-control ${this.state.capacityError ? 'is-invalid' : ''}`} name="capacity" placeholder="Capacity (ml)" onChange={this.handleChange} value={this.state.capacity} />
              <span>Capacity</span>
            </label>
            <div className='error'>{this.state.capacityError}</div>
            <label htmlFor="price">
              <input type="number" id='price' className={`form-control ${this.state.priceError ? 'is-invalid' : ''}`} name="price" placeholder="Price (Eur)" onChange={this.handleChange} value={this.state.price} />
              <span>Price</span>
            </label>
            <div className='error'>{this.state.priceError}</div>
            <label htmlFor="files">
              <input type="file" id="files" onChange={this.onImageChange} key={this.state.inputKey} />
            </label>
            <div className="form__buttons">
              <button className="button button--submit" type="submit" disabled={!this.state.title || !this.state.capacity || !this.state.price || !this.state.image}>ADD</button>
              <button className="button button--reset" type="button" onClick={this.resetForm} disabled={!this.state.title && !this.state.capacity && !this.state.price && !this.state.image}>RESET</button>
            </div>
          </form>
        </div>
        {Object.values(this.state.coffee).map((item, index) => {
          return (
            <div className="coffee" key={index}>
              <button onClick={(e) => this.deleteCoffeeItem(e, index)}><i className="fa fa-times fa-2x icon"></i></button>
              <img src={this.state.image} alt="black coffee" />
              <p className="coffee__title">{item.title}</p>
              <hr className="coffee__line" />
              <div className="coffee__variants coffee--title">
                <div>ml</div>
                <div>Eur</div>
              </div>
              <div className="coffee__variants">
                <div>{item.capacity}</div>
                <div>{item.price}</div >
              </div>
            </div>
          );
        })}
        <div className="coffee">{this.props.allCoffeeItems.map((item, index) => this.addedCoffee(item, index))}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allCoffeeItems: state.allCoffeeItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCoffeeItem: coffeeItem => dispatch(coffeeItemAction.createNewCoffeeItem(coffeeItem)),
    deleteCoffeeItem: index => dispatch(coffeeItemAction.deleteCoffeeItem(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);