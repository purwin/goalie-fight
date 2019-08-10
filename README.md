# Goalie Fight!

Goalie Fight! is a data visualization project pitting NHL goalie stats head to head. Check out the web app [here](https://www.goaliefight.com/).

## Built With...

* [React](https://reactjs.org/) -- Web framework
* [Nivo](https://nivo.rocks/) -- React-based Dataviz library
* [Firebase](https://firebase.google.com) -- Database storage
* [Node](https://nodejs.org/en/) -- Back-end data compiling

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
👉 [Git](https://git-scm.com/)  
👉 [Node](https://nodejs.org/en/)  
👉 [NPM](https://www.npmjs.com/) (installed w/ Node) or [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Install
Copy the app files to your directory of choice and install the node package dependencies:
```
git clone https://github.com/purwin/goalie-fight.git
cd goalie-fight
npm install
```

### Up and Running
Create a dev build and live server:
```
yarn start
```

### Ship It
Create a minified production build:
```
yarn build
```

## Project Structure

```
goalie-fight
│
├── /data/                # Goalie stat CSV source files
├── /public/              # Public HTML file/resources
├── /src/                 # Source React files
│   ├── App.css           # Main CSS file
│   ├── App.js            # Main app JS file
│   ├── /components/      # React components 
│   │   └── /elements/    # Reusable React components
│   │
│   ├── /data/            # Compiled goalie stat JSON files
│   ├── /firebase/        # Database files
│   ├── index.css         # Body CSS file
│   ├── index.js          # Parent JS file
│   ├── logo.svg          # Spiffy logo
│   ├── serviceWorker.js  # Service worker file
│   └── /utils/           # JS utility files
│
├── package-lock.json     # NPM lock file
├── package.json          # Package list
└── yarn.lock             # Yarn lock file
```

## Contribute

Reach out if you're interested in helping!

## License

This project is totally open source, licensed under the [MIT License](LICENSE.md).

## Acknowledgments

* [Natural Stat Trick](https://www.naturalstattrick.com) -- Raw goalie stat data
* [Create React App](https://github.com/facebook/create-react-app) -- Initial React setup