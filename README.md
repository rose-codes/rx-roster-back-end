<!-- LOGO  -->
<br />
<div align="center">
  <a href="https://rx-roster-back-end.heroku.com">
    <img src="src/assets/RxLogoGradient.png" alt="Logo" width="100" height="100">
  </a>
  <h3 align="center">RxRoster</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
            <ul>
                <li><a href="#downloading-both-repositories">Downloading Both Repositories</a></li>
                <li><a href="#installing-the-backend">Installing the Backend</li>
                <li><a href="#installing-the-frontend">Installing the Frontend</li>
                <li><a href="#starting-up-the-servers">Starting Up the Servers</li>
            </ul>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

# Rx-Roster back-End

This project allows users to access their medication history, current medications list, and add new medications. Users have to register with the website first and login each time to access their medications. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About the Project
RxRoster allows users to access their medication history, current medications list, and add new medications. Users have to register with the website first and login each time to access their medications. 

### Built With

* ![Static Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&link=%20https%3A%2F%2Freactjs.org%2F)
* ![Static Badge](https://img.shields.io/badge/Tailwind-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8&labelColor=0F172A&link=https%3A%2F%2Ftailwindcss.com)
* ![Static Badge](https://img.shields.io/badge/Node-base?style=for-the-badge&logo=nodedotjs&link=https%3A%2F%2Fnodejs.org)
* ![Static Badge](https://img.shields.io/badge/Express-base?style=for-the-badge&logo=express&link=https%3A%2F%2Fexpressjs.com%2F)
* ![Static Badge](https://img.shields.io/badge/DynamoDB-base?style=for-the-badge&logo=amazondynamodb&logoColor=F27C58&labelColor=FFFFFF&color=%23FFFFFF&link=https%3A%2F%2Faws.amazon.com%2Fdynamodb%2F)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started
Please follow the following instructions to get started with RxRoster.

### Prerequisites
Every library or framework utilized for this project can be found in the [`package.json`](package.json) file.

To install the dependencies, please run this command:
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

#### Downloading Both Repositories
As the frontend and backend of RxRoster are in different directories, both repositories will need to be cloned to your local computer. 

The repositories can be found here:
1. [rx-roster-front-end](https://github.com/rose-codes/rx-roster-front-end)
2. [rx-roster-back-end (this repo)](https://github.com/rose-codes/rx-roster-back-end)

#### Installing the backend
It is highly recommended that you install the backend first. Once the backend is set up, the frontend will connect to the backend via an environmental variable.

1. Obtain IAM access and `JWT_SECRET` keys from me by contacting me at my [LinkedIn](https://linkedin.com/in/rhle). I will create an IAM account for you and provide the `AWS_SECRET_KEY_ID` and `ACCESS_ACCESS_KEY_ID`.
2. Fork the [repositiory](https://github.com/rose-codes/rx-roster-back-end).
3. Clone the repository.
   ```sh
   git clone https://github.com/rose-codes_/rx-roster-back-end.git
   ```
4. Install NPM packages.
   ```sh
   npm install
   ```
5. Add `/node_modules` to the `.gitignore` file if it is not already listed.
6. Create an .`env` file and add the AWS IAM access information:
   ```
   AWS_SECRET_KEY_ID=[Your Secret Key]
   AWS_ACCESS_KEY_ID=[Your Access Key]
   AWS_DEFAULT_REGION=us-west-1
   ```
7. To set up the `Express` server, add the following to the `.env` file:
   ```
    PORT=5000 [or your choice]
    NODE_ENV=development
    JWT_SECRET=[JWT_SECRET token I provide]
   ```
8. Add the `.env` file to the `.gitignore`.

#### Installing the frontend
1. Fork the [repositiory](https://github.com/rose-codes/rx-roster-back-end).
2. Clone the repository.
   ```sh
   git clone https://github.com/rose-codes_/rx-roster-back-end.git
   ```
3. Install NPM packages.
   ```sh
   npm install
   ```
4. Add `/node_modules` to the `.gitignore` file if it is not already listed.
5. Create a `.env` file and add this to it:
   ```
   REACT_APP_BACKEND_URL=https://localhost:[port number you set in backend repo]
   ```
6. Add the `.env` file to the `.gitignore`.

#### Starting Up the Servers
To launch the full-stack application, you will have to start both the React server in the frontend repo and the Node/Express server in the backend repo.

Start the servers by running the respective commands:
* Frontend:
  ```sh
  npm run start
  ```
* Backend:
  ```sh
  npm run dev
  ```

These commands run the servers in development mode. Please check each repo's `package.json` file to see other commands to start the servers.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add calendar widget to dashboard
- [x] Add side navigation to dashboard
- [ ] Create separate  page for "Add New Medication" form component
- [ ] Revamp "All Medications" page
- [ ] Add pharmacies widget


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Rose Le - [@rhle](https://linkedin.com/in/rhle) - rosehle33@gmail.com

GitHub Link: [https://github.com/rose-codes/rx-roster-back-end](https://github.com/rose-codes/rx-roster-back-end)

Project Link: [https://rx-roster-back-end.heroku.com](https://rx-roster-back-end.heroku.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Cors](https://expressjs.com/en/resources/middleware/cors.html)
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
* [Nodemon](https://nodemon.io/)
* [Router](https://www.npmjs.com/package/router)
* [Validator](https://www.npmjs.com/package/validator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>