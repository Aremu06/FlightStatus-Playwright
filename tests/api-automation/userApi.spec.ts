import { test, expect } from '@playwright/test';

const baseUrl = 'https://reqres.in/api';

test('GET request - Fetch list of users', async () => {
  // Send GET request to retrieve users on page 2
  const response = await fetch(`${baseUrl}/users?page=2`);
  const data = await response.json();

  // Assertions to validate the response
  expect(response.status).toBe(200);
  expect(data.page).toBe(2);
  expect(data.data.length).toBeGreaterThan(0);
  expect(data.data[0]).toHaveProperty('id');

  console.log(response);
});

// Test to verify creating a new user through the API
test('POST request - Create a new user', async () => {
  const newUser = {
    name: 'John Dee',
    job: 'QA Engineer'
  };

  // Send POST request to create a new user
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)

  });

  // Step 3: Parse the response and validate
  const data = await response.json();

  // Assertions to ensure the user is created correctly
  expect(response.status).toBe(201);
  expect(data.name).toBe(newUser.name);
  expect(data.job).toBe(newUser.job);
  expect(data).toHaveProperty('id');

  console.log(response);
});
