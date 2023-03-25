import { Polybase } from "@polybase/client";
import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();


const database = process.env["DB_NAME"] ? process.env["DB_NAME"]: ""
const db_user = process.env["DB_USER"] ? process.env["DB_USER"]: ""
const db_password = process.env["DB_PASSWORD"] ? process.env["DB_PASSWORD"]: ""
const db_host = process.env["DB_HOST"]? process.env["DB_HOST"]: ""
const db_port = process.env["DB_PORT"]? parseInt(process.env["DB_PORT"]): 0
const polybase_namespace = process.env["POLYBASE_NAMESPACE"]? process.env["POLYBASE_NAMESPACE"]: ""
const polybase_collection_name = process.env["COLLECTION_NAME"]? process.env["COLLECTION_NAME"]: ""
const sleep = ms => new Promise(r => setTimeout(r, ms));


const sequelize = new Sequelize(
    database,
    db_user,
    db_password,
    {
        host: db_host,
        port: db_port,
        dialect: 'postgres',
        logging: false
    }
)

const Token = sequelize.define('Token', {
    token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    image: DataTypes.STRING,
    json_metadata: DataTypes.JSON,
    polybase_token_url: DataTypes.STRING
  },
  {
    tableName: "tokens",
    timestamps: false
  });

const db = new Polybase({
    defaultNamespace: polybase_namespace
  });

await db.applySchema(
    `
    @public
    collection ${polybase_collection_name} {
        id: string;
        image: bytes;
        json_metadata: string;

        constructor (token_id: string, image: bytes, json_metadata: string) {
            this.id = token_id;
            this.image = image;
            this.json_metadata = json_metadata;
        }

        updateRecord(image: bytes, json_metadata: string) {
            this.image = image;
            this.json_metadata = metadata;
        }

        getImage() {

        }
    }
    `
  )

const collection = db.collection(polybase_collection_name)

async function getTokens () {
    while (true) {
        var tokens = await Token.findAll();
        console.log(`fetched ${tokens.length} tokens, checking...`);
        for (var i=0; i < tokens.length; i++) {
            var image = await fetch(tokens[i].image)
            var imageBuf = await (await image.blob()).arrayBuffer()
            let stored_token = await collection.record(tokens[i].dataValues.token_id.toString()).get().catch(error => {
                return null;
            })
            if (stored_token === null) {
                stored_token = await collection.create([
                    tokens[i].dataValues.token_id.toString(),
                    new Uint8Array(imageBuf),
                    JSON.stringify(tokens[i].json_metadata)
            ])}
            await Token.update(
                {
                    "polybase_token_url": `https://testnet.polybase.xyz/v0/collections/${polybase_namespace}%2F${polybase_collection_name}/records/${tokens[i].token_id}?format=nft`},
                {
                    where: {"token_id": tokens[i].token_id} 
                }
                );
            }
            console.log("The iteration has ended, pausing...")
        sleep(30* 1000);
    }
}

(
    async () => 
    await getTokens()
)()
