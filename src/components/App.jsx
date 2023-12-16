import { Component } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { getAllImages } from "api/allImages";
import { Loader } from "./Loader";
import { Button } from "./Button";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { MyModal } from "./Modal";
import { IoSearch } from "react-icons/io5";


export class App extends Component {
  state = {
    query: '',
    images: null,
    page: 1,
    isLoading: false,
    error: null,
    loadMore: false,
    largeImg: '',
    tags: '',
    isShownModal: false
  }

 

  componentDidUpdate(_, prevState) {
    const { query, page} = this.state
    if (prevState.query !== query || prevState.page !== page) {
    this.getImages(query, page)
  }
  }

   openModal = (largeImg, tags) => {
    this.setState({ isShownModal: true, largeImg, tags })
  }

  closeModal = () => {
    this.setState({ isShownModal: false, largeImg: '', tags: '' })
  }

    getImages = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const response = await getAllImages(query, page);

      if (response.hits.length === 0) return;

      this.setState(prev => {
        return {
            images: prev.images ? [...prev.images, ...response.hits] : response.hits,
          loadMore: page < Math.ceil(response.totalHits / 12),
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  
 

   handleLoadMore = () => {
    this.setState((prev)=>({page: prev.page +1}))
  }

    onHandleSubmit = value => {
    this.setState({ query: value, page: 1, images: null });
  };

  render() {
    const { isLoading, error, loadMore } = this.state
    
    return (
      <>
        <Searchbar onSubmit={this.onHandleSubmit}>
<IoSearch />

        </Searchbar>
          {isLoading && <Loader />}
           {error && <h2>{error}</h2>}
          
        <ImageGallery > {this.state.images && this.state.images.map((elem) => <ImageGalleryItem key={elem.id} webformatURL={elem.webformatURL} alt={elem.tags} openModal={()=> this.openModal(elem.largeImageURL, elem.tags) } />)}
        </ImageGallery>
        <MyModal modalIsOpen={this.state.isShownModal}
          closeModal={this.closeModal}
          largeImg={this.state.largeImg}
          tags={this.state.tags} />
        {loadMore && <Button handleLoadMore={this.handleLoadMore} />}
      
      </>
    )
  }
}
