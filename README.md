# Moment 2 - Backend Web Service

## Beskrivning

Detta API hanterar blogginlägg och erbjuder full CRUD-funktionalitet för att skapa, läsa, uppdatera och ta bort inlägg. Alla rutter utom GET är skyddade med JWT-autentisering.

## Teknologier

- **NestJS**: Ett progressivt Node.js-ramverk för att bygga skalbara serverapplikationer.
- **TypeORM**: ORM för att interagera med databasen.
- **MySQL**: Relationsdatabas för att lagra blogginlägg.
- **JWT (JSON Web Token)**: Används för att skydda API-rutter (autentisering).
- **dotenv/ConfigModule**: Hanterar konfiguration och miljövariabler.

## Installation

Följ dessa steg för att installera och köra projektet lokalt:

1. Klona repot:
   ```
git clone https://github.com/JoeSteeloak/MVCtest.git
cd MVCtest
```

2. Installera beroenden:
   ```
npm install
```

3. Konfigurera databasen:  
   Skapa en `.env`-fil i projektets rot med innehåll liknande:
   ```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=din_db_användare
DB_PASSWORD=din_db_lösenord
DB_NAME=moment2
JWT_SECRET=my_super_secret_key
```
   Se till att MySQL-databasen är upprättad och att uppgifterna i `.env` stämmer.

4. Starta applikationen:
   ```
npm run start
```
   Applikationen startar då på http://localhost:3000

## API Endpoints

### Blogginlägg

1. **Hämta alla blogginlägg**
    - **Metod:** GET  
    - **URL:** `/blog`
    - **Beskrivning:** Returnerar en lista med alla blogginlägg (öppet för alla).
    - **Exempel på svar:**
      ```json
      [
        {
          "id": 1,
          "title": "NestJS och TypeORM: En perfekt kombination",
          "content": "I denna artikel går vi igenom hur du kan använda NestJS tillsammans med TypeORM för att skapa en robust backend...",
          "author": "Jonas Ståleker",
          "publishedAt": "2025-02-14T12:00:00.123Z",
          "category": "Webbutveckling"
        }
      ]
      ```

2. **Hämta ett specifikt blogginlägg**
    - **Metod:** GET  
    - **URL:** `/blog/:id`
    - **Exempel på svar:**
      ```json
      {
        "id": 1,
        "title": "NestJS och TypeORM: En perfekt kombination",
        "content": "I denna artikel går vi igenom hur du kan använda NestJS tillsammans med TypeORM för att skapa en robust backend...",
        "author": "Jonas Ståleker",
        "publishedAt": "2025-02-14T12:00:00.123Z",
        "category": "Webbutveckling"
      }
      ```

3. **Skapa ett nytt blogginlägg**
    - **Metod:** POST *(JWT krävs)*
    - **URL:** `/blog`
    - **Request Body:**
      ```json
      {
        "title": "Introduktion till NestJS",
        "content": "Denna artikel introducerar NestJS och dess funktioner...",
        "author": "Anna Svensson",
        "category": "Webbutveckling"
      }
      ```

4. **Uppdatera ett blogginlägg**
    - **Metod:** PUT *(JWT krävs)*
    - **URL:** `/blog/:id`
    - **Request Body:**
      ```json
      {
        "title": "NestJS och TypeORM: Uppdaterad guide",
        "content": "En detaljerad guide om hur man uppdaterar inlägg med NestJS och TypeORM...",
        "category": "Backend"
      }
      ```

5. **Ta bort ett blogginlägg**
    - **Metod:** DELETE *(JWT krävs)*
    - **URL:** `/blog/:id`
    - **Svar:** HTTP 204 No Content

### Authentication

1. **Logga in och hämta JWT**
    - **Metod:** POST  
    - **URL:** `/auth/login`
    - **Request Body:**
      ```json
      {
        "username": "admin",
        "password": "password"
      }
      ```
    - **Exempel på svar:**
      ```json
      {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```
    - Använd den returnerade token i `Authorization`-headern med formatet:  
      ```
      Authorization: Bearer <access_token>
      ```

## Validering och Felhantering

Alla indata valideras med **class-validator** innan de sparas i databasen. Om indata är ogiltiga returneras ett detaljerat felmeddelande med statuskod 400.  
Exempel på felmeddelande:
```json
{
  "statusCode": 400,
  "message": "Title must be between 3 and 200 characters long.",
  "error": "Bad Request"
}
```

## Git Repository

Du hittar koden här:  
```
https://github.com/JoeSteeloak/MVCtest
```

## Starta applikationen

1. Klona repot:
   ```
   git clone https://github.com/JoeSteeloak/MVCtest.git
   cd MVCtest
   ```

2. Installera beroenden:
   ```
   npm install
   ```

3. Skapa en `.env`-fil med följande innehåll (anpassa efter din miljö):
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=din_db_användare
   DB_PASSWORD=din_db_lösenord
   DB_NAME=moment2
   JWT_SECRET=my_super_secret_key
   ```

4. Starta applikationen:
   ```
   npm run start
   ```
   Applikationen körs på [http://localhost:3000](http://localhost:3000)
