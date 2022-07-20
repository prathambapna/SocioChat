const env=require('./environment');
const fs=require('fs');
const path=require('path');

//this is to fetch the assets in production mode as we hv changed the files name by adding some hash string in public assets

module.exports=(app)=>{
    app.locals.assetPath=function(filePath){
        if(env.name=='development')
        {
            return filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}