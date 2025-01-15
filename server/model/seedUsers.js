const mongoose = require("./db"); // Adjust the path to your database connection
const User = require("./users.model"); // Adjust the path to your User model
const faker = require("faker");

const seedUsers = async (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 18, max: 60 }),
            gender: faker.random.arrayElement(["Male", "Female", "Other"]),
            occupation: faker.name.jobTitle(),
            preferences: {
                preferredProvince: faker.address.state(),
                preferredMunicipality: faker.address.city(),
                preferredAgeRange: [
                    faker.datatype.number({ min: 18, max: 30 }),
                    faker.datatype.number({ min: 31, max: 60 }),
                ],
                preferredGender: faker.random.arrayElement(["Male", "Female", "Any"]),
                smoker: faker.datatype.boolean(),
                petFriendly: faker.datatype.boolean(),
                nightOwl: faker.datatype.boolean(),
                cleanliness: faker.datatype.number({ min: 1, max: 5 }),
            },
        });
    }

    try {
        await User.insertMany(users);
        console.log(`${count} users have been added to the database.`);
        mongoose.connection.close(); // Close the connection after seeding
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

// Call the seeder with the number of users you want to generate
seedUsers(50);
