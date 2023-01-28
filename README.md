# My portfolio

If you would like to know how it works, or adapt it to your needs, you can. I
would like to share with you my progress.

# 

### Steps to be able to use it

- First clone the repository and paste the code below, it will create a folder
  with the **bruce-lee-portfolio** name unless you have changed or deleted the
  default name.

```bash
git clone https://github.com/Antonio476587/portfolio.git bruce-lee-portfolio
```

- Afterwards, go inside the folder.

```bash
cd <folder-name>
```

- Install the dependencies and you will be able to run it.

```bash
npm install
```

# 

### If you want to run it, there are a few ways to do so.

1. Using `webpack`.
2. Using the `server`.

# 

#### Using webpack

The first is the easier to get ride, you just have to call this command in the
console.

```bash
npm run hmr
```

And webpack should open the page in your default browser. Be aware that this is
not an ambiented enviroment and can bring with it unexpected behaviors.

# 

#### Using the server

If you want to run the server you will need to execute the following commands

```bash
npm run compile

npm run server
```

> It must be listening to the port 80, you can access it by `localhost:80` in
> the browser, it will throw a error if the port is already in use by another
> program or server like `XAMPP`
