# Command to Setup Project

## Docker Command:

### 1. Building Image:
```bash
docker build -t s3_connect_nodejs .
```

### 2. Run Container:
```bash
docker run -p 8000:8000 --name s3_connect_nodejs -v ${pwd}:/usr/src/app s3_connect_nodejs
```

## Running via Command Line:
### 1. Install Dependencies:
```bash
npm i
```

### 2. Run Container:
```bash
nodemon index.js
```


Feel free to modify the content based on your project structure and needs.