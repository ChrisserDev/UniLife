import {useState, createContext, useEffect} from 'react'

//create context using hook
export const FavouritesContext = createContext()

export default function FavouritesContextProvider(props){
    //create global state here
    const [favourites, setFavourites] = useState([])

    
    // useEffect(
    //     ()=>{
    //         //is there a value in localStorage
    //         const storedFavorites = localStorage.getItem('favoritesList')
            
    //         //only use if there was a value
    //         if (storedFavorites){
    //             //use this to initialize
    //             setFavourites(JSON.parse(storedFavorites))
    //         }

    //     }, [] //runs once when component loads
    // )

    // useEffect(
    //     ()=>{
    //         //save new value to localStorage
    //         localStorage.setItem('favoritesList', JSON.stringify(favourites))

    //     }, [favourites] //runs anytime favorites changes
    // )
    

    const addProperty = (propertyToAdd) =>{
        console.log('adding', propertyToAdd)
        //add propertyId to favorites
        setFavourites((prevFavorites) => [...prevFavorites, propertyToAdd]);
    }

    const removeProperty = (propertyToRemove) =>{
        console.log('remove', propertyToRemove)
        //remove propertyId
        //keep all the ones that are NOT propertyId
        setFavourites((prevFavorites) =>
        prevFavorites.filter((item) => item._id !== propertyToRemove)
      );
    }

    return(
        <FavouritesContext.Provider value={{favourites, addProperty, removeProperty}}>
            {props.children}
        </FavouritesContext.Provider>
    )
}