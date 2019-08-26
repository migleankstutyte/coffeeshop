import React from 'react';

class Form extends React.Component {


    render() {
        return (
            <div className="form">
                <div className="form__title">
                    <h3 className="heading">Add New Coffee</h3>
                    <button className="button button--add" onClick={this.props.showForm}>{!this.props.showForm ? '+' : '-'}</button>
                </div>
                <form className={this.props.showForm ? 'form__container:active' : 'form__container'} onSubmit={this.handleSubmit} >
                    <label htmlFor="title">
                        <input
                            type="text"
                            id='title'
                            className={`form-control ${this.props.titleError ? 'is-invalid' : ''}`}
                            name="title"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.props.title} />
                        <span>Title</span>
                    </label>
                    <div className='error'>{this.props.titleError}</div>
                    <label htmlFor="capacity">
                        <input
                            type="number"
                            id='capacity'
                            name="capacity"
                            placeholder="Capacity (ml)"
                            onChange={this.handleChange}
                            value={this.props.capacity} />
                        <span>Capacity</span>
                    </label>
                    <label htmlFor="price">
                        <input type="number" id='price' name="price" placeholder="Price (Eur)" onChange={this.handleChange} value={this.props.price} />
                        <span>Price</span>
                    </label>
                    <label htmlFor="files">
                        <input type="file" id="files" onChange={this.onImageChange} key={this.props.inputKey} />
                    </label>
                    <div className="form__buttons">
                        <button className="button button--submit" type="submit" disabled={!this.props.title || !this.props.capacity || !this.props.price || !this.props.image}>ADD</button>
                        <button className="button button--reset" type="button" onClick={this.props.resetForm} disabled={!this.props.title && !this.props.capacity && !this.props.price && !this.props.image}>RESET</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;