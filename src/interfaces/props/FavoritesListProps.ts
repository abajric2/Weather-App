export interface FavoritesListProps {
    favoriteCities: string[];
    onClose: () => void;
    isMenuOpen: boolean;
    onSelect: (city: string) => void;
}