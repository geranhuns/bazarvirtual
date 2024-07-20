import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const {
//   S3Client,
//   PutObjectAclCommand,
//   GetObjectAclCommand,
// } = require("@aws-sdk/client-s3");

const s3client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const bucketName = process.env.AWS_BUCKET_NAME;

export async function GET(req) {
  return NextResponse.json({ msg: "hello API" });
}

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file.buffer;
  console.log(fileName);

  const params = {
    Bucket: bucketName,
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3client.send(command);
  return fileName;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = request.file;
    if (!file) {
      return NextResponse.json({ error: "A file is required " });
    }
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name);

      return NextResponse.json({ success: true, fileName });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}

// export async function POST(req) {
//   const formData = await req.formData();
//   const image = formData.get("image");

//   if (image && (typeof image === "object") === image.name) {
//     const body = await image.arrayBuffer();
//     const params = {
//       Bucket: bucketName,
//       Key: image.name,
//       Body,
//       ContentType: image.type,
//     };
//     const command = new PutObjectAclCommand(params);
//     await s3client.send(command);
//     const getObjectParams = {
//       Bucket: bucketName,
//       Key: image.name,
//       ACL: "private",
//     };

//     const getCommand = new GetObjectAclCommand(getObjectParams);
//     const url = await getSignedUrl(s3client, getCommand, {
//       expiresIn: 50000,
//     });
//     return NextResponse.json({
//       success: true,
//       message: "Successfully image uploaded",
//       data: { url },
//     });
//   }
//   return NextResponse.json({
//     success: false,
//     message: "image is required",
//     data: null,
//   });
// }
