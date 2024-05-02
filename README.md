# Boas-vindas ao repositório do projeto _Sequelize CRUD Blogs Api_

## Entregáveis

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- Foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog;
- A aplicação foi desenvolvida em `Node.js` utilizando `sequelize` para fazer um `CRUD` de posts;
  - Foram desenvolvidos _endpoints_ conectados ao banco de dados seguindo os princípios do `REST`.

</details>

## Orientações

<details>
  <summary><strong>Rodando o projeto no Docker</strong></summary>

  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

- Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

- A partir daqui é possível executar o container `blogs_api` via CLI ou VSCode;
  > :information_source: Use o comando `docker exec -it blogs_api bash`.
  - Esse comando dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências com `npm install`. (dentro do container);

</details>

## Funcionalidades do projeto

### Migrations para as tabelas `users`, `categories`, `blog_posts`, `posts_categories`

---

### No diretório `src/models/User.js`

<details>
  <summary><strong>O que foi desenvolvido:</strong></summary>

- **[O modelo 'User']**
- **[O modelo possui a propriedade 'id']**
- **[O modelo possui a propriedade 'display_name']**
- **[O modelo possui a propriedade 'email']**
- **[O modelo possui a propriedade 'password']**
- **[O modelo possui a propriedade 'image']**

</details>

---

### Endpoint POST `/login`

- O endpoint é acessível através da URL `/login`;
- O corpo da requisição segue o formato abaixo:

  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>O que foi desenvolvido:</strong></summary>

- **[Não é possível fazer login sem todos os campos preenchidos]**
  - Caso a requisição não tenha todos os campos preenchidos, retorna um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

- **[Não é possível fazer login com um usuário que não existe]**
  - Se a requisição receber um `email` ou `password` incorretos, retorna um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "Invalid fields"
  }
  ```
  
- **[Caso o login seja feito com sucesso]**
  - O resultado retornado é um status http `200` com um token similar ao do exemplo abaixo:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

  > :warning: este token é fictício, o token será gerado à partir da variável de ambiente `JWT_SECRET` e do `payload` da requisição.

</details>

---

### Endpoint POST `/user`

- O endpoint é acessível através da URL `/user`;
- O endpoint é capaz de adicionar um novo `user` ao banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```

<details>
  <summary><strong>O que foi desenvolvido:</strong></summary>

- **[Não é possível cadastrar o campo `displayName` sendo menor que 8 caracteres]**
  - Caso `displayName` tenha menos que 8 caracteres, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "\"displayName\" length must be at least 8 characters long"
  }
  ```
  
- **[Não é possível cadastrar o campo `email` com formato inválido]**
  - Caso o campo `email` não tenha o formato `prefixo@dominio.com`, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "\"email\" must be a valid email"
  }
  ```

- **[Não é possível cadastrar `password` menor que 6 caracteres]**
  - Caso o `password` tenha um tamanho menor que 6 caracteres, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "\"password\" length must be at least 6 characters long"
  }
  ```

- **[Não é possível cadastrar um email já existente]**
  - Caso o `email` já exista, o resultado retornado é um status http `409` com a seguinte mensagem:

  ```json
  {
    "message": "User already registered"
  }
    ```
  
- **[É possível cadastrar um usuário com sucesso]**
  - Se o `user` for criado com sucesso o resultado retornado é um status http `201` e será gerado um token similar ao token abaixo:

  ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```

</details>

---

## Validando token nas requisições

- À partir deste ponto todas as rotas precisarão da autorização via token, somente assim será possível executar os endpoints.

---

### Endpoint GET `/user`

- O endpoint é acessível através da URL `/user`;
- O endpoint traz todos os `users` cadastrados no banco de dados;

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível listar todos os usuários]**
  - Ao listar os usuários com sucesso o resultado é um status http `200` com um _array_ similar ao abaixo:

  ```json
  [
    {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },

    /* ... */
  ]
  ```

<br />
</details>

---

### Endpoint GET `/user/:id`

- O endpoint é acessível através da URL `/user/:id`;
- O endpoint traz o `user` do banco de dados relacionado ao `id` pesquisado.

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível listar um usuário específico]**
  - Ao listar um usuário, o resultado retornado é um status http `200` e um objeto similar ao abaixo:

  ```json
  {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  }
  ```

- **[Não é possível listar um usuário inexistente]**
  - Se o usuário não existir no banco de dados, o resultado retornado é um status http `404` com a seguinte mensagem:

  ```json
  {
    "message": "User does not exist"
  }
  ```

<br />
</details>

---

### No diretório `src/models/Category.js`

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[O modelo 'Category']**
- **[O modelo possui a propriedade 'id']**
- **[O modelo possui a propriedade 'name']**

<br />
</details>

---

### Endpoint POST `/categories`

- O endpoint é acessível através da URL `/categories`;
- O endpoint é capaz de adicionar uma nova categoria na tabela do banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[Não é possível cadastrar uma categoria sem o campo `name`]**
  - Caso a requisição não tenha o campo `name` preenchidos, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "\"name\" is required"
  }
  ```

- **[É possível cadastrar uma categoria]**
  - Caso a categoria seja criada com sucesso, o resultado retornado é um status http `201` com o seguinte corpo:

  ```json
  {
    "id": 3,
    "name": "Typescript"
  }
  ```

<br />
</details>

---

### Endpoint GET `/categories`

- O endpoint é acessível através da URL `/categories`;
- O endpoint é capaz de trazer todas categorias do banco de dados.

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível listar todas as categoria com sucesso]**
  - Ao listar categorias, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
  [
    {
        "id": 1,
        "name": "Inovação"
    },
    {
        "id": 2,
        "name": "Escola"
    },

    /* ... */
  ]
  ```

<br />
</details>

---

### No diretório `src/models/BlogPost.js`

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[O modelo 'BlogPost']**
- **[O modelo possui a propriedade 'id']**
- **[O modelo possui a propriedade 'title']**
- **[O modelo possui a propriedade 'content']**
- **[O modelo possui a propriedade 'user_id']**
- **[O modelo possui a propriedade 'published']**
- **[O modelo possui a propriedade 'updated']**
- **[O modelo 'BlogPost', define a associação 'belongsTo', com a entidade 'User']**
- **[O modelo 'User', define a associação 'hasMany', com a entidade'BlogPost']**

<br />
</details>

---

### No diretório `src/models/PostCategory.js`

<details>
  <summary><strong>O que será desenvolvido</strong></summary>

- **[O modelo 'PostCategory']**
- **[O modelo possui a propriedade 'post_id']**
- **[O modelo possui a propriedade 'category_id']**
- **[O modelo 'PostCategory' define a associação 'belongsToMany' respectivamente, com os modelos  'BlogPost' e 'Category']**

<br />
</details>

---

### Endpoint POST `/post`

- O endpoint é acessível através do URL `/post`;
- O endpoint é capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados;
- O corpo da requisição segue o formato abaixo:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[Não é possível cadastrar sem todos os campos preenchidos]**
  - Caso a requisição não tenha todos os campos preenchidos, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

- **[Não é possível cadastrar um blog_post com um `categoryId` inexistente]**
  - Caso a requisição não tenha o campo `categoryIds` devidamente preenchido com um array contendo todas as categorias existentes, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "one or more \"categoryIds\" not found"
  }
  ```

- **[É possível cadastrar um blog_post com sucesso]**
  - Caso o blog post seja criado com sucesso, o resultado retornado é um status http `201` com o seguinte corpo:

  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

### Endpoint GET `/post`

- O endpoint é acessível através da URL `/post`;
- O endpoint traz todos os blogs posts, o `user` dono dele e as categorias do banco de dados;

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível listar os blogposts com sucesso]**
  - Ao listar os posts com sucesso, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
  [
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        }
      ]
    },
    
    /* ... */
  ]
  ```

<br />
</details>

---

### Endpoint GET `/post/:id`

- O endpoint é acessível através do URL `/post/:id`;
- O endpoint traz o blog post baseado no `id` pesquisado.

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível listar um blogpost com sucesso]**
  - Ao listar um `post` com sucesso, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
        {
            "id": 1,
            "name": "Inovação"
        }
    ]
  }
  ```

- **[Não é possível listar um blogpost inexistente]**
  - Caso o post não exista, o resultado retornado é um status http `404` com a seguinte mensagem:

  ```json
  {
    "message": "Post does not exist"
  }
  ```

<br />
</details>

---

### Endpoint PUT `/post/:id`

- O endpoint é acessível através da URL `/post/:id`;
- O endpoint altera um post do banco de dados, caso exista;
- Só são permitidas alterações de um blog post caso a pessoa seja dona dele;
- O corpo da requisição possui o seguinte formato:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[Não é possível editar um blogpost com outro usuário]**
  - Somente o `user` que criou o blog post poderá editá-lo, caso não seja o criador, o resultado retornado é um status http `401` com a seguinte mensagem:

  ```json
    {
      "message": "Unauthorized user"
    }
  ```

- **[Não é possível editar sem todos os campos preenchidos]**
  - Caso a requisição não tenha todos os campos devidamente preenchidos, o resultado retornado é um status http `400` com a seguinte mensagem:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

- **[É possível editar um blogpost com sucesso]**
  - Caso o blog post tenha sido alterado com sucesso, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "published": "2022-05-18T18:00:01.000Z",
    "updated": "2022-05-18T18:07:32.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      },
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
  ```

<br />
</details>

---

### Endpoint DELETE `/post/:id`

- O endpoint é acessível através do URL `/post/:id`;
- O endpoint deleta um blog post baseado no `id` do banco de dados, caso ele exista;
- Só é permitido deletar um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[Não é possível deletar um blogpost com outro usuário]**
  - Caso o `user` seja diferente do criador do blog post, o resultado retornado é um status http `401` com a seguinte mensagem:

  ```json
    {
      "message": "Unauthorized user"
    }
  ```

- **[É possível deletar um blogpost com sucesso]**
  - Caso o blog post seja deletado com sucesso, não é retornada nenhuma resposta, apenas um status http `204`.

- **[Não é possível deletar um blogpost inexistente]**
  - Caso o `post` não exista, o resultado retornado é um status http `404` com a seguinte mensagem:

  ```json
  {
    "message": "Post does not exist"
  }
  ```

<br />
</details>

---

### Endpoint DELETE `/user/me`

- O endpoint é acessível através da URL `/user/me`;
- Aqui, é possível deleter o próprio `user` do banco de dados.

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível excluir o próprio usuário com sucesso]**
  - Caso o `user` tenha sido deletado com sucesso, não é retornado nenhuma resposta, apenas um status http `204`.

<br />
</details>

---

### Endpoint GET `/post/search?q=:searchTerm`

- O endpoint é acessível através da URL `/post/search`;
- O endpoint retorna um _array_ de blogposts que contenham em seu título ou conteúdo o termo passado na URL;
- O endpoint retorna um array vázio caso nenhum blogpost satisfaça a busca;
- O _query param_ da requisição deverá seguir o formato abaixo:

  ```text
  http://localhost:PORT/post/search?q=vamos
  ```

<details>
  <summary><strong>O que foi desenvolvido</strong></summary>

- **[É possível buscar um blogpost pelo `title`]**
  - Caso a busca seja pelo `title`, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
  // GET /post/search?q=Vamos que vamos
  [
    {
      "id": 2,
      "title": "Vamos que vamos",
      "content": "Foguete não tem ré",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
  ]
  ```

- **[É possível buscar um blogpost pelo `content`]**
  - Caso a busca seja pelo `content`, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
    // GET /post/search?q=Foguete não tem ré
    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
  ```

- **[É possível buscar todos os blogposts quando a busca estiver vazia]**
  - Se a buscar for vazia, o resultado retornado é um status http `200` com o seguinte corpo:

  ```json
    // GET /post/search?q=
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      /* ... */
    ]
  ```
