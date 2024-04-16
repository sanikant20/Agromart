const { MongoClient } = require('mongodb');

test('Admin Login', () => {
    const email = "admin@gmail.com";
    const password = "admin123";
    // Your login function or logic here
    const loggedIn = loginUser(email, password);
    expect(loggedIn).toBe(true);
});

// Mock login function for testing purposes
function loginUser(email, password) {
    return email === "admin@gmail.com" && password === "admin@123";
}
