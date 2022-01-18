# P3M backend
## Installation Setup

```bash
# clone code
git clone https://github.com/OctupusPrime/p3m-back

# go to folder
cd p3m-back

# install dependencies
npm install

# create .env with: 
NODE_ENV=development
PORT=3000 or what you want
MAILER_USER google account username for mailer
MAILER_PASS google account password for mailer

#create service account and download credentials.json from googleclound:
[**"For me its"**](https://console.cloud.google.com/apis/credentials?referrer=search&hl=ru&project=tough-artwork-336019)  

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start
```
