import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ webformatURL , alt, openModal}) => {
    return (
<li className={css.ImageGalleryItem}>
  <img className={css.ImageGalleryItemImage} src={webformatURL} alt={alt} onClick={openModal}/>
</li>
    )
}
