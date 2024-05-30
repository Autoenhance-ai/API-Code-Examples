## Scripts

This repository also includes various scripts that can be run directly from the terminal. These scripts are designed to be standalone examples that demonstrate specific functionalities. You can run these scripts to see how they work or use them as a foundation to develop your own logic.

## Requirements

-   API key from Autoenhance.ai ([How to obtain an API key](https://autoenhance-ai.gitbook.io/autoenhance.ai-v2/getting-started/obtaining-an-api-key))
-   Composer installed ([How to install PHP Composer](https://getcomposer.org/doc/00-intro.md))
-   PHP installed

## Using the scripts

First, open the desired script folder in your terminal, and install the dependencies:

```bash
composer install
```

Finally run this command in your terminal in order to start the script

```bash
php index.php
```

You will be prompted to input your API key in the terminal. The script will not work without correct API key.

## Logs

-   The script will log a message in your terminal for every image that it uploaded
-   There will be a link to your order once all of the images are uploaded at the end of the terminal logs.

## Customisation

-   In order to add your own images into the script, simply replace add or replace images in the images folder.
