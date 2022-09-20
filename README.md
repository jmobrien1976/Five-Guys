# Five Guys (no relation to the restaurant chain) Make a Website for Ordering Food

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Description

Order food from a hypothetical restaurant.
This website incorporates a mysql database, users, persistent carts, a dynamic menu, and payment processing through Stripe.

![Website](./README_assets/Screen%20Shot%202022-09-19%20at%208.57.08%20PM.png)

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

# Installation and usage

No installation is required to use the project. One merely needs to navigate to the deployed project at https://arcane-mesa-45752.herokuapp.com/

Users may add items to their order and return to it later. Once they place their order their cart is cleared and they can order again.

Security features:
Passwords protected by bcrypt.

Payment processing will not allow the use of real credit cards, and we the developers will get no information about any real cards that are mistakenly entered into the system.
If actual payment was turned on no information would be stored within the app, as it would be taken care of entirely by stripe.


# Icebox
We'd like to expand the project to allow actual restaurants to sign up and upload their menus. Much of the internal structure to make this happen is already more or less in place, but we would still need to add some sort of geocoding, the ability to not just accept payment from customers but to also disburse it to restaurants, and a restaurant UI to handle orders.

It would also be worth it to look directly at integration with various POS systems currently in use in the industry. Seamless integration would be a major plus.


# Contributors

[John O'Brien](https://github.com/jmobrien1976/)
* Repo Master

[Gabe Vasquez](https://github.com/LardexTheLarge)
* Models
* API Routes

[Brett Miller](https://github.com/BrettMiller47)
* UI/UX design
* Handlebars
* Front end

[Wasim M](https://github.com/wasim202)
* Seeding Database
* Quality Assurance Testing

[James Young](https://github.com/jamesyoungGHusername)
* Stripe Integration
* API Routes