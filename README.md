# ChrisRecommend App for the PearMonie Technical Interview Test

## Deliverables

There are 3 apps on this system: [frontend](./apps/frontend/), [backendserver](./apps/backendserver/), and [recommendationserver](./apps/recommendationserver/)

## Database schema

[PostgreSQL schema](apps/recommendationserver/codefordatabase.sql)

## Setup and installation instruction:

### Database setup

- Connect to a PostgreSQL database. Use [my databse setup](./apps/recommendationserver/.env.example) if you want. Connect your pgAdmin4 to it.
- Copy and paste all or one-by-one in your pgAdmin4 and execute them to create the database and tables. Note: If you use my setup, no need to create the database and tables as they are already created.

### Frontend setup

- Goto [.env.example file](./apps/frontend/.env.example) and rename it to `.env`

### Backend server setup

- Goto [.env.example file](./apps/backendserver/.env.example) and rename it to `.env`

### Recommendation server setup

- Goto [.env.example file](./apps/recommendationserver/.env.example) and rename it to `.env`

## Running

### Using Docker and Docker Compose

- Ensure you have Docker and Docker Compose installed on your system. Here is a [link](https://docs.docker.com/compose/install/) on how to install them
- Goto the project's root folder(where turbo.json and docker-compose.yaml files are) and run the command `docker-compose up .` or `docker compose up .`
- Access the frontend app on `http://localhost:3000`, backendserver app on `http://localhost:5000`, and recommendationserver app on `http://localhost:5001`.

### Without using Docker and Docker Compose

- Ensure you have Node.js v18+ and Python v3 installed on your system.
- You also need to have either pnpm, npm, yarn installed globally on your system. npm is installed with Node.js automatically. Use `npm install --global yarn` or `npm install -g pnpm@latest-10` to install yarn or pnpm respectively.
- Goto the [project's root directory](./) (where turbo.json and docker-compose.yaml files are) and run the command `npm install` or `yarn` or `pnpm install` depending on which package manager you are using. This will install all dependencies for the frontend and backendserver apps. It will take a while to install.
- Goto the [recommendationserver app directory](./apps/recommendationserver/)
  - Setup a virtual environment by running `python3 -m venv .venv`(macOS/Linux) or `py -3 -m venv .venv`(Windows PowerShell)
  - Active the virtual environment by running `source .venv/bin/activate`(macOS/Linux) or `.\.venv\Scripts\Activate`(Windows PowerShell)
  - Then run `pip3 install -r requirements.txt` to install all dependencies. This will take a while.
- After all dependencies have been installed, go back to the [project's root directory](./) and run either `npm run dev` or `yarn run dev` or `pnpm run dev` depending on which package manager you are using.
- Access the frontend app on `http://localhost:3000`, backendserver app on `http://localhost:5000`, and recommendationserver app on `http://localhost:5001`.

## API Endpoints

- `POST /register` (To register a user)
  - body:
    - name (string)
    - email (string)
    - age (number)
    - password (string)
- `POST /ratingimplicit` (Implicitly rate a content due to the user's action)
  - body:
    - userID (number)
    - tmdbID (number)
- `POST /ratingexplicit` (The user explicitly rate the content)
  - body:
    - userID (number)
    - tmdbID (number)
    - rating (number)

# TODO

    - Implement proper authentication
    - Finish up the API documentation
    - Setup GitHub Actions for CI/CD pipeline
    - Continue testing, adding features, and fixing any bugs
    - ...many more
