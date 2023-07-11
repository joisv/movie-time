export function getImageUrl(path) {
    const baseUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/';
    const defaultImagePath = 'default-avatar.jpg';

    if (path && !path.startsWith('http')) {
        return baseUrl + path.replace(/^\//, '');
    }

    return baseUrl + defaultImagePath;
}