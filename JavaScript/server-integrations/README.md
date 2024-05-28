## Scripts

This repository also includes various scripts that can be run directly from the terminal. These scripts are designed to be standalone examples that demonstrate specific functionalities. You can run these scripts to see how they work or use them as a foundation to develop your own logic.

## Requirements

-   API key from Autoenhance.ai ([How to obtain an API key](https://autoenhance-ai.gitbook.io/autoenhance.ai-v2/getting-started/obtaining-an-api-key))
-   Node (developed with node v20.1.0)

## Using the scripts

First, open the desired script in your terminal, and install the dependencies:

```bash
npm install
```

Once all of your dependencies are installed, create a .env file in the root folder of the script (you can see a package.json file inside of the folder),
and add an API_KEY variable into the .env file.

```bash
API_KEY = "YOUR_API_KEY"
```

The last step is running the script

```bash
node index.js
```

## Logs

-   The script will log a message in your terminal for every image that it uploaded
-   There will be a link to your order once all of the images are uploaded at the end of the terminal logs.

## Customisation

-   In order to add your own images into the script, simply replace add or replace images in the images folder.

## Troubleshooting

The script will automatically notify you about the lack of .env file or API key environment variable in the terminal logs, or if you don't have any images in your images folder.
