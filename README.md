# MC-Manager

An Electron-React application for managing a music collection csv file

## Background

Through a varied combination of python scripts, sqlite tables, and manual review, I wrangled my music library into a single unified collection and compiled a CSV file of the song and file metadata. 

This database is a dynamic entity - as I acquire new songs I want to be able to add them to the CSV file in a streamlined and consistent way. I could always use a spreadsheet application to manually enter song data, but with over a dozen columns, the manual parsing is more data mining for each song than I'd like to do. 

### And why spend time doing manual work when you can spend even more time automating it?

![xkcd: Automation web comic](https://imgs.xkcd.com/comics/automation.png "xkcd: Automation")

I wanted a quick way to get up-and-running with an electron application, and I found that the [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) project was perfectly suited. I cloned the boilerplate template and built off of that, so most of the built-in functionality of that repository should also work in this project.

## Starting Development (ERB)

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Packaging for Production (ERB)

To package apps for the local platform:

```bash
yarn package
```

## ERB Docs

Further documentation for electron-react-boilerplate can be found in their [docs and guides](https://electron-react-boilerplate.js.org/docs/installation)
