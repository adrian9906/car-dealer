import React from "react";

// En tu hook
export function useFavorites() {
    const [favoritesCount, setFavoritesCount] = React.useState(0)

    React.useEffect(() => {
        const updateCount = () => {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            setFavoritesCount(favorites.length);
        };

        updateCount();

        // Escuchar evento personalizado
        window.addEventListener('favoritesUpdated', updateCount);

        return () => window.removeEventListener('favoritesUpdated', updateCount);
    }, []);

    return favoritesCount;
}

