import React from 'react';
import { connect } from 'react-redux';
import * as coffeeItemAction from './actions/coffeeItemAction';
import './App.scss';
import getInitialData from './db.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffee: [],
      showForm: false,
      titleError: '',
      inputKey: Date.now() // to delete file input 
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
      const { title } = this.state;
      this.setState({
        titleError: !title ? 'Title can not be empty' : null,
      })
    });
  };

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

  sendDataToLocalStorage = () => {
    localStorage.setItem('localStorageData', JSON.stringify(getInitialData()));
  }

  componentDidMount() {
    this.sendDataToLocalStorage();
    this.props.loadDataFromLocalStorage()
  }

  render() {
    return (
      <div className="container">
        <h1 className="container__title">Coffee price list billboard</h1>
        <div className="form">
          <div className="form__title">
            <h3 className="heading">Add New Coffee</h3>
            <button className="button button--add" onClick={this.showForm}>{!this.state.showForm ? '+' : '-'}</button>
          </div>
          <form className={this.state.showForm ? 'form__container:active' : 'form__container'} onSubmit={this.handleSubmit} >
            <label htmlFor="title">
              <input type="text" id='title' className={`form-control ${this.state.titleError ? 'is-invalid' : ''}`} name="title" placeholder="Title" onChange={this.handleChange} value={this.state.title} />
              <span>Title</span>
            </label>
            <div className='error'>{this.state.titleError}</div>
            <label htmlFor="capacity">
              <input type="number" id='capacity' name="capacity" placeholder="Capacity (ml)" onChange={this.handleChange} value={this.state.capacity} />
              <span>Capacity</span>
            </label>
            <label htmlFor="price">
              <input type="number" id='price' name="price" placeholder="Price (Eur)" onChange={this.handleChange} value={this.state.price} />
              <span>Price</span>
            </label>
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
        <div className="coffee">{this.props.allCoffeeItems && this.props.allCoffeeItems.map((item, index) => this.addedCoffee(item, index))}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allCoffeeItems: state.allCoffeeItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCoffeeItem: coffeeItem => dispatch(coffeeItemAction.createNewCoffeeItem(coffeeItem)),
    deleteCoffeeItem: index => dispatch(coffeeItemAction.deleteCoffeeItem(index)),
    loadDataFromLocalStorage: () => dispatch(coffeeItemAction.loadDataFromLocalStorage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);