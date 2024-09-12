# Tax Estimator Project

This is a **Node.js** and **TypeScript** project designed to estimate taxes. The project includes tests written using **Jest**. This `README` provides instructions for setting up the environment, installing dependencies, running tests, and building the project.

## Prerequisites

Ensure the following tools are installed before setting up the project:

### 1. Install Node.js and npm

Node.js and npm are required to run and manage this project. You can download them from the official [Node.js website](https://nodejs.org/). npm comes bundled with Node.js.

#### Verify Installation:
```
node --version
npm --version
```
You should see the version numbers of Node.js and npm.

### 2. Jest
Jest is a testing framework used in this project. Jest will be installed automatically along with the project dependencies via npm.

## Project Setup
To set up the project locally:

### 1. Clone the Repository
First, clone the project repository to your local machine and navigate into the project directory:

```
git clone <repository-url>
cd <project-directory>
```
### 2. Install Dependencies
Next, install the necessary dependencies, including Jest and TypeScript:

```
npm install
```
This will install everything listed in the package.json file.

## Available Scripts
The following npm scripts are available in the project and can be run using the npm run <script> command:

### 1. Build the Project
To compile TypeScript files into JavaScript, run:

```
npm run build
```
This will transpile the TypeScript code from the src directory into the dist directory.

### 2. Run the Project
After building the project, you can run the compiled JavaScript using:

```
npm start
```
This will execute the compiled code from the dist/app.js file.

### 3. Test the Project
To run the test suite using Jest, execute:

```
npm test
```
This will run all tests located in the src/tests directory.

4. Full Workflow: Build, Test, and Run
You can automate the entire workflow (build, test, and run) with the following command:

```
npm run full
```
This command will first build the project, then run the test suite, and finally start the application.

## Project Structure
The project has the following structure:

```
/src            # Source code
  /tests        # Test files
/jest.config.ts # Jest configuration
/package.json   # Project dependencies and scripts
/tsconfig.json  # TypeScript configuration
```
## Environment Setup
Ensure your environment is correctly set up for running, testing, and building the project. The key dependencies are:

* Node.js: The JavaScript runtime.
* npm: The package manager for handling dependencies.
* Jest: The testing framework used for unit tests.
* TypeScript: The language in which the project is written, which will be compiled into JavaScript.
Ensure all dependencies are installed via npm as described in the setup instructions.

## Additional Notes
* Ensure all tests are passing before running the application.
* Adjust the entry point (app.ts) or other configuration settings in jest.config.ts and tsconfig.json as necessary for your environment.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
