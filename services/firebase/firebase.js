const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('../../e-commerce-7eef1-firebase-adminsdk-x37lr-004c62426b.json')

//Initialize app
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

//Create a storage reference
const storageRef = admin.storage().bucket(`gs://e-commerce-7eef1.appspot.com/`);


async function uploadFile(path,filename){
    const storage= await  storageRef.upload(path,{
        public:true,
        destination:`/product/profileImage/${filename}`,
        metadata:{
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });
    return storage[0].metadata.mediaLink; 
}
module.exports={
async getUrl(path,productImage){
    const url = await uploadFile(path,productImage)
    console.log(url)
    return url
}};




