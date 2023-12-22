import { ImageGalleryItem } from "components/ImageGalleryItem";
import  css  from "./Gallery.module.css";

export const ImageGallery = ({images, openModal}) => {
    
    return (
        <ul className={css.gallery}>
             {images && images.map((elem) => <ImageGalleryItem key={elem.id} webformatURL={elem.webformatURL} alt={elem.tags} openModal={()=> openModal(elem.largeImageURL, elem.tags) } />)}
        </ul>
    );
    
}