import { getAllImages } from "api/allImages";
import { Searchbar } from "./Searchbar";
import { Loader } from "./Loader";
import { IoSearch } from "react-icons/io5";
import { ImageGallery } from "./ImageGallery";
import { MyModal } from "./Modal";
import { Button } from "./Button";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { useEffect, useState } from "react";

export const App = () => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadMore, setLoadMore] = useState(false)
  const [largeImg, setLargeImg] = useState('')
  const [tags, setTags] = useState('')
  const [isShownModal, setIsShowModal] = useState(false)


  useEffect(() => {

    const getImages = async (query, page) => {
      setIsLoading(true)
    try {
      const response = await getAllImages(query, page);

      if (response.hits.length === 0) return;

      setImages(prev => prev ? [...prev, ...response.hits] : response.hits)
      setLoadMore(page < Math.ceil(response.totalHits / 12))
     
    } catch (error) {
      setError(error.message)
     
    } finally {
      setIsLoading(false)
    }
  };
    if(query) getImages(query, page)
  }, [query, page])
 

  const openModal = (largeImg, tags) => {
    setIsShowModal(true)
    setLargeImg(largeImg)
    setTags(tags)
  }

  const closeModal = () => {
     setIsShowModal(false)
    setLargeImg('')
    setTags('')
  }

  const handleLoadMore = () => {
    setPage(prev=> prev +1)
  }

  const onHandleSubmit = value => {
    setQuery(value)
    setPage(1)
    setImages(null)
  };

  return (
      <>
        <Searchbar onSubmit={onHandleSubmit}>
<IoSearch />

        </Searchbar>
          {isLoading && <Loader />}
           {error && <h2>{error}</h2>}
          
        <ImageGallery > {images && images.map((elem) => <ImageGalleryItem key={elem.id} webformatURL={elem.webformatURL} alt={elem.tags} openModal={()=> openModal(elem.largeImageURL, elem.tags) } />)}
        </ImageGallery>
        <MyModal modalIsOpen={isShownModal}
          closeModal={closeModal}
          largeImg={largeImg}
          tags={tags} />
        {loadMore && <Button handleLoadMore={handleLoadMore} />}
      
      </>
    )
}
