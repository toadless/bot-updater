import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const API_ENDPOINT = "https://discord.com/api/v8";
const TOKEN = "INSERT_TOKEN_HERE"; // <----- Token goes here

const AVATAR = "./avatar.jpeg"; // <------ new avatar path goes here
const NAME = "NAME"; // <------ new name goes here

async function modifyUser() {
    const buffer = fs.readFileSync(AVATAR).buffer;
    if (!buffer) return;

    const extensionName = path.extname(AVATAR);
    const base64Image = Buffer.from((buffer as any), 'binary').toString('base64');
    const base64ImageStr = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;

    const response = await fetch(API_ENDPOINT + "/users/@me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${TOKEN}`,
        },
        body: JSON.stringify({
            username: NAME,
            avatar: base64ImageStr,
        })
    });

    console.log(await response.json());
}

modifyUser(); // run request to modify bot user