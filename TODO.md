<p align="center" style="font-weight: bold; font-size: xx-large">
  TODO LİST
</p>

### 1. Install nestjs-cli globally
```bash
$ npm i -g @nestjs/cli
```

### 2. Generate Nestjs Project via cli

```bash
$ nest new video-api
```

### 3. Generating a new resource which is called as video

```bash
$ nest g resource video
```

<strong>Note: nest g resource command not only generates all the NestJS building blocks 
(module, service, controller classes) but also an entity class, DTO classes as well 
as the testing (.spec) files.</strong>


### 4. Create docker compose file to start MySQL locally
```bash
version: '3.3'
services:
  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: testdb
      # So you don't have to use root, but you can if you like
      MYSQL_USER: user
      # You can use whatever password you like
      MYSQL_PASSWORD: pass
      # Password for root access
      MYSQL_ROOT_PASSWORD: pass
    ports:
      # <Port exposed> : < MySQL Port running inside container>
      - '3306:3306'
    expose:
      # Opens port 3306 on the container
      - 3306
      # Where our data will be persisted
    volumes:
      - my-db:/var/lib/mysql
# Names our volume
volumes:
  my-db:
```


### 5. Install typeORM using npm command for mysql
```bash
$ npm install --save @nestjs/typeorm typeorm mysql2
```

### 6. Create config file for mysql under the root folder of project
```bash
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "user",
  "password": "pass",
  "database": "testdb",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```
<strong>Note: This file's name must be <i>ormconfig.json</i></strong>

### 7. Install class-validator to validate DTOs
```bash
$ npm i --save class-validator class-transformer
```
**HINT**: 
The ValidationPipe is exported from the @nestjs/common package.


### 8. Add Global Validation Pipe to main.ts
```bash
 app.useGlobalPipes(new ValidationPipe());
```

### 9. Install helmet
```bash
$ npm i --save helmet
```

### 10. Once the helmet installation is complete, apply it as a global middleware.

```bash
import * as helmet from 'helmet';
// somewhere in your initialization file
app.use(helmet());
```

### 11. Install compression package
```bash
$ npm i --save compression
```

### 12. Once the compression installation is complete, apply it as a global middleware.
```bash
import * as compression from 'compression';
// somewhere in your initialization file
app.use(compression());
```

### 13. Adding Swagger API
```bash
$ npm install --save @nestjs/swagger swagger-ui-express
```
* Create a swagger folder under the root folder
* Create swaggerSetup.ts file

```bash
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerSetup = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Video API')
    .setDescription('These are all video api endpoints.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
```
* Add swaggerSetup to main.ts
```bash
import { swaggerSetup } from './swagger/swaggerSetup';
swaggerSetup(app);
```

