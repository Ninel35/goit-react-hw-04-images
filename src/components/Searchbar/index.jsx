import { useState } from "react"
import css from "./Searchbar.module.css";

export const Searchbar = ({onSubmit, children}) => {
  const [query, setQuery] = useState('')

  const handleChange = (elem) => {
    setQuery(elem.target.value)
   
  }

  const handleSubmit = (elem) => {
    elem.preventDefault();
  
    if (!query.trim()) return alert("Can not be empty")
    onSubmit(query)
    setQuery('')
  }

  return (
        <header className={css.Searchbar}>
          <form onSubmit={handleSubmit} className={css.SearchForm}>
            <button type="submit" className={css.SearchFormButton} >
              {children}
            </button>

            <input
              className={css.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="search"
              value={query}
              onChange={handleChange}
            />
          </form>
        </header>
      );
}