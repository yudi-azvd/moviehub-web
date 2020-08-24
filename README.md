# Moviehub (web)
(_Em desenvolvimento_) Frontend de uma aplicação parecida com o IMDb.

## Servidor
O backend da aplicação se encontra nesse [respositório](https://github.com/yudi-azvd/moviehub-server).

### Alguns aprendizados
Você vai entender melhor o que está escrito a seguir se ler o código em `src/hooks/auth.tsx`.

1.  Colocar favoriteMovies no contexto de autenticação não me parece muito certo.
Pra adicionar um filme aos favoritos, o programador (muito provavelmente) tem que passar um objeto `Movie`
inteiro para o `AuthContext`.
    1.1.  Possível solução: criar `FavoriteMoviesContext` e mover para ela as funções `addFavoriteMovie` e `removeFavoriteMovie`. Usar `useAuth` dentro de `FavoriteMoviesContext` para obter `user`, e então, ter acesso a `favoriteMovies`.
