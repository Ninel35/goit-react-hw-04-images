import { Component } from "react";
import css from "./Searchbar.module.css";


export class Searchbar extends Component {
  state = {
    query: '',

  }
  handleChange = (elem) => {
    this.setState({query: elem.target.value})
  }

  handleSubmit = (elem) => {
    const { query } = this.state
    elem.preventDefault();
  
    if (!query.trim()) return alert("Can not be empty")
    this.props.onSubmit(query)
    this.setState({ query: '' })
  }
  
  render() {
const { query } = this.state

      return (
        <header className={css.Searchbar}>
          <form onSubmit={this.handleSubmit} className={css.SearchForm}>
            <button type="submit" className={css.SearchFormButton} >
              {this.props.children}
            </button>

            <input
              className={css.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="search"
              value={query}
              onChange={this.handleChange}
            />
          </form>
        </header>
      );
}
  
    }


