# Activity Picker

A `.env` file should be made in root directory with key of API_ROUTE.

```
echo API_ROUTE="<super-secret-api-route>" >> .env
```

Please ensure system files such as VSCode and MacOSX are included in repo `.gitignore` file if not already included in global `.gitignore`

Install `netlify-cli` tool, may need to install `deno` dependency. Netlify and Deno can be installed locally if preferred, but please add all NodeJS files and directories to repo's `.gitignore` file.

```
npm install --global netlify-cli deno
```

Run app in Netlify Developer Environment from root directory of repo.

```
netlify dev
```
