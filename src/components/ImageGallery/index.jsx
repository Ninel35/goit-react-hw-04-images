import  css  from "./Gallery.module.css";

export const ImageGallery = ({children}) => {
    
    return (
        <ul className={css.gallery}>
            {children}
        </ul>
    );
    
}