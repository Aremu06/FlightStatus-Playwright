import { test, expect } from '@playwright/test';
import { request } from 'http';

const baseUrl = 'https://reqres.in/api';

test('GET request - Fetch list of users', async ({ request }) => {
  // Using Playwright's request context
  const response = await request.get(`${baseUrl}/users?page=2`);
  const data = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(data.page).toBe(2);
  expect(data.data.length).toBeGreaterThan(0);
  expect(data.data[0]).toHaveProperty('id');
});

test('POST request - Create a new user', async ({ request }) => {
  const newUser = {
    name: 'John Dee',
    job: 'QA Engineer'
  };

  const response = await request.post(`${baseUrl}/users`, {
    data: newUser,  // Playwright automatically handles JSON stringification
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();

  expect(response.status()).toBe(201);
  expect(data.name).toBe(newUser.name);
  expect(data.job).toBe(newUser.job);
  expect(data).toHaveProperty('id');
});

test('PUT request - Update an existing user', async ({ request }) => {
  const UpdateUser = {
    name: 'John Dee Updated',
    job: 'Senior QA Engineer'
  };

  const response = await request.put(`${baseUrl}/users/2`, {
    data: UpdateUser,
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data.name).toBe(UpdateUser.name);
  expect(data.job).toBe(UpdateUser.job);
  expect(data).toHaveProperty('updatedAt');
});

test('DELETE request - Remove a user', async ({ request }) => {
  const response = await request.delete(`${baseUrl}/users/2`);

  expect(response.status()).toBe(204);
  expect(await response.text()).toBe('')
})