# Goalie Fight!

Goalie Fight! is a data visualization project pitting NHL goalie stats head to head. Check out the web app [here](https://www.goaliefight.com/).

## Built With...

* [React](https://reactjs.org/) - Web framework
* [Nivo](https://nivo.rocks/) - React-based Dataviz library
* [Firebase](https://firebase.google.com) - Database storage
* [Node](https://nodejs.org/en/) - Back-end data compiling

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
👉 [Git](https://git-scm.com/)  
👉 [Node](https://nodejs.org/en/)  
👉 [NPM](https://www.npmjs.com/) (installed w/ Node) or [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Install
Copy the app files to your directory of choice and install the node package dependencies:
```
$ git clone https://github.com/purwin/goalie-fight.git
$ cd goalie-fight
$ npm install
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
├── /data/                # goalie stat CSV source files
├── /public/              # 
├── /src/                 # Source React files
│   ├── App.css
│   ├── App.js
│   ├── /components/      # React components 
│   │   └── /elements/    # Reusable React components
│   │
│   ├── /data/            # Goalie stat compiled JSON files
│   ├── /firebase/        # Database files
│   ├── index.css
│   ├── index.js
│   ├── logo.svg          # Spiffy logo
│   ├── serviceWorker.js  #
│   └── /utils/           # JS utility files
│
├── package-lock.json
├── package.json
└── yarn.lock
```

## Tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Contribute

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
