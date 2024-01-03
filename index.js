const express = require('express')
const multer = require('multer');
const sharp = require("sharp")
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv")
dotenv.config()


const app = express()

const storage = multer.memoryStorage();
  
const upload = multer({
  limits:{
      fileSize: 1000000
  },
  fileFilter(req, file, cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
          return cb(new Error("Please upload image file only"))
      }
      cb(undefined, true)
  }
})

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  maxAttempts: 2,
});

app.get('/', async(req, res)=> {
  return res.status(200).send("Hello!!")
})

app.post("/upload", upload.single("profilePic"), async (req, res)=>{
  const buffer = await sharp(req.file.buffer).png().toBuffer()    
  const bucketName = "testing5-rttv-images";
  const fileName = "image.png";

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ACL: "public-read",
      ContentType: req.file.mimetype
    }),
  );
  res.status(200).send("Sucess!!")
}, (error, req, res, next)=>{
  res.status(400).send({error:error.message})
})



app.listen(8000, function () {
    console.log("Listening on port 8000!");
});