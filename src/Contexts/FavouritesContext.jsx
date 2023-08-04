import {useState, createContext, useEffect} from 'react'

//Created a context object using the hook.
export const FavouritesContext = createContext()

export default function FavouritesContextProvider(props){
    //create global state here
    const [favourites, setFavourites] = useState([])

    //The first useEffect() hook is responsible for initializing the favourites state with any stored data from local storage.

    useEffect(
        ()=>{
            //is there a value in localStorage
            const storedFavorites = localStorage.getItem('favoritesList')
            
            //only use if there was a value
            if (storedFavorites){
                //use this to initialize
                setFavourites(JSON.parse(storedFavorites))
            }

        }, [] //runs once when component loads
    )

    //The second useEffect() hook is responsible for saving the updated favourites state to local storage whenever it changes. 

    useEffect(
        ()=>{
            //Save new value to localStorage
            localStorage.setItem('favoritesList', JSON.stringify(favourites))
        }, [favourites] //It runs whenever the favourites state changes.
    )
    
    //The addProperty function is defined to add a property to the shortlist array.
    const addProperty = (propertyToAdd) =>{
        console.log('adding', propertyToAdd)
        //add propertyId to favorites
        let newFavourites = [...favourites, propertyToAdd]
        console.log(newFavourites)
        //replace state
        setFavourites(newFavourites)
    }

    //The removeProperty function is defined to remove a property to the shortlist array.
    const removeProperty = (propertyToRemove) =>{
        console.log('remove', propertyToRemove)
        //remove propertyId
        //keep all the ones that are NOT propertyId
        let newFavourites = favourites.filter(item => item._id != propertyToRemove)
        setFavourites(newFavourites)
    }

//The context provider wraps its children components, passing an object as the value prop. 
//This object contains the favourites state, the addProperty function, and the removeProperty function. 
//These values can be accessed by all child components that utilize the FavouritesContext using the useContext() hook.

return(
    <FavouritesContext.Provider value={{favourites, addProperty, removeProperty}}>
        {props.children}
    </FavouritesContext.Provider>
    )
}