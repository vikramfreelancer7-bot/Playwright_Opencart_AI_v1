import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { Routes } from '../../api/endpoints/routes';
import productSchema from '../../api/schemas/product_api_schema.json';
import userSchema from '../../api/schemas/user_api_schema.json';
import cartSchema from '../../api/schemas/cart_api_schema.json';

const ajv = new Ajv({ allErrors: true, strict: false });
const apiHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0',
};

const buildUrl = (route: string, params: Record<string, string | number> = {}): string => {
  let resolvedRoute = route;

  for (const [key, value] of Object.entries(params)) {
    resolvedRoute = resolvedRoute.replace(new RegExp(`\\{${key}\\}`, 'g'), encodeURIComponent(String(value)));
  }

  return `${Routes.BASE_URL}${resolvedRoute}`;
};

const readResponseBody = async (response: { text: () => Promise<string> }): Promise<unknown> => {
  const text = await response.text();

  if (!text || text.trim() === 'null') {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const validateJsonSchema = (payload: unknown, schema: object, label: string): void => {
  const validate = ajv.compile(schema);
  const isValid = validate(payload);

  expect(isValid, `${label} schema validation failed: ${ajv.errorsText(validate.errors)}`).toBeTruthy();
};

const expectProductPayload = (product: Record<string, unknown>): void => {
  expect(product).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      category: expect.any(String),
      image: expect.any(String),
    })
  );
};

const expectUserPayload = (user: Record<string, unknown>): void => {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
      username: expect.any(String),
      name: expect.objectContaining({
        firstname: expect.any(String),
        lastname: expect.any(String),
      }),
      phone: expect.any(String),
    })
  );
};

const expectCartPayload = (cart: Record<string, unknown>): void => {
  expect(cart).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      userId: expect.any(Number),
      date: expect.any(String),
      products: expect.any(Array),
    })
  );
};

test.describe('FakeStore API @master', () => {
  test('successful login @master', async ({ request }) => {
    const response = await request.post(buildUrl(Routes.AUTH_LOGIN), {
      headers: apiHeaders,
      data: {
        username: 'mor_2314',
        password: '83r5^_',
      },
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(201);

    const payload = await response.json();
    expect(payload).toHaveProperty('token');
    expect(typeof payload.token).toBe('string');
    expect((payload.token as string).length).toBeGreaterThan(0);
  });

  test('invalid login @master', async ({ request }) => {
    const response = await request.post(buildUrl(Routes.AUTH_LOGIN), {
      headers: apiHeaders,
      data: {
        username: 'invalid_user',
        password: 'wrong_password',
      },
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(401);

    const payload = await readResponseBody(response);
    expect(payload).toBe('username or password is incorrect');
  });

  test('get all products @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_ALL_PRODUCTS), { headers: apiHeaders });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);

    payload.forEach((product: Record<string, unknown>) => {
      expectProductPayload(product);
    });
  });

  test('get product by id @master', async ({ request }) => {
    const productId = 1;
    const response = await request.get(buildUrl(Routes.GET_PRODUCT_BY_ID, { id: productId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toHaveProperty('id', productId);
    expectProductPayload(payload as Record<string, unknown>);
  });

  test('get products with limit @master', async ({ request }) => {
    const limit = 5;
    const response = await request.get(buildUrl(Routes.GET_PRODUCTS_WITH_LIMIT, { limit }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload).toHaveLength(limit);
  });

  test('sort products ascending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_PRODUCTS_SORTED, { order: 'asc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((product: Record<string, unknown>) => Number(product.id));
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
  });

  test('sort products descending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_PRODUCTS_SORTED, { order: 'desc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((product: Record<string, unknown>) => Number(product.id));
    expect(ids).toEqual([...ids].sort((a, b) => b - a));
  });

  test('get all product categories @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_ALL_CATEGORIES), { headers: apiHeaders });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);
    payload.forEach((category: unknown) => expect(typeof category).toBe('string'));
  });

  test('get products by category @master', async ({ request }) => {
    const category = 'electronics';
    const response = await request.get(buildUrl(Routes.GET_PRODUCTS_BY_CATEGORY, { category }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    payload.forEach((product: Record<string, unknown>) => {
      expect(product.category).toBe(category);
    });
  });

  test('product crud create @master', async ({ request }) => {
    const productPayload = {
      title: 'Playwright API Product',
      price: 49.99,
      description: 'Created through Playwright API testing',
      image: 'https://example.com/product.png',
      category: 'electronics',
    };

    const response = await request.post(buildUrl(Routes.CREATE_PRODUCT), {
      headers: apiHeaders,
      data: productPayload,
    });

    expect(response.status()).toBe(201);

    const payload = await response.json();
    expect(payload).toHaveProperty('id');
    expect(Number(payload.id)).toBeGreaterThan(0);
    expect(payload).toEqual(expect.objectContaining(productPayload));
  });

  test('product crud update @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_PRODUCT), {
      headers: apiHeaders,
      data: {
        title: 'Product to Update',
        price: 29.99,
        description: 'Will be updated',
        image: 'https://example.com/update.png',
        category: 'electronics',
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdProduct = await createResponse.json();
    const productId = Number(createdProduct.id);

    const updatedProductPayload = {
      title: 'Updated Product Title',
      price: 88.88,
      description: 'Updated through Playwright API testing',
      image: 'https://example.com/updated.png',
      category: 'jewelery',
    };

    const response = await request.put(buildUrl(Routes.UPDATE_PRODUCT, { id: productId }), {
      headers: apiHeaders,
      data: updatedProductPayload,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toHaveProperty('id', productId);
    expect(payload).toEqual(expect.objectContaining({ ...updatedProductPayload, id: productId }));
  });

  test('product crud delete @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_PRODUCT), {
      headers: apiHeaders,
      data: {
        title: 'Product to Delete',
        price: 19.99,
        description: 'Will be deleted',
        image: 'https://example.com/delete.png',
        category: 'electronics',
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdProduct = await createResponse.json();
    const productId = Number(createdProduct.id);

    const response = await request.delete(buildUrl(Routes.DELETE_PRODUCT, { id: productId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await readResponseBody(response);
    expect(payload === null || typeof payload === 'string' || (typeof payload === 'object' && payload !== null && 'id' in payload ? Number((payload as Record<string, unknown>).id) === productId : false)).toBeTruthy();
  });

  test('get all users @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_ALL_USERS), { headers: apiHeaders });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);
  });

  test('get user by id @master', async ({ request }) => {
    const userId = 1;
    const response = await request.get(buildUrl(Routes.GET_USER_BY_ID, { id: userId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toHaveProperty('id', userId);
    expectUserPayload(payload as Record<string, unknown>);
  });

  test('get users with limit @master', async ({ request }) => {
    const limit = 3;
    const response = await request.get(buildUrl(Routes.GET_USERS_WITH_LIMIT, { limit }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload).toHaveLength(limit);
  });

  test('sort users ascending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_USERS_SORTED, { order: 'asc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((user: Record<string, unknown>) => Number(user.id));
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
  });

  test('sort users descending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_USERS_SORTED, { order: 'desc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((user: Record<string, unknown>) => Number(user.id));
    expect(ids).toEqual([...ids].sort((a, b) => b - a));
  });

  test('user crud create @master', async ({ request }) => {
    const userPayload = {
      email: 'playwright.user@example.com',
      username: 'playwright_user',
      password: 'Playwright@123',
      name: { firstname: 'Playwright', lastname: 'Tester' },
      address: {
        city: 'Test City',
        street: 'Main Street',
        number: 123,
        zipcode: '12345',
        geolocation: { lat: '12.3456', long: '98.7654' },
      },
      phone: '1-555-000-9999',
    };

    const response = await request.post(buildUrl(Routes.CREATE_USER), {
      headers: apiHeaders,
      data: userPayload,
    });

    expect(response.status()).toBe(201);

    const payload = await response.json();
    expect(payload).toHaveProperty('id');
    expect(Number(payload.id)).toBeGreaterThan(0);
  });

  test('user crud update @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_USER), {
      headers: apiHeaders,
      data: {
        email: 'user.update@example.com',
        username: 'user_update_test',
        password: 'Updated@123',
        name: { firstname: 'Updated', lastname: 'User' },
        address: {
          city: 'Update City',
          street: 'Update Street',
          number: 123,
          zipcode: '54321',
          geolocation: { lat: '10.0000', long: '20.0000' },
        },
        phone: '1-555-111-2222',
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = Number(createdUser.id);

    const updatedPayload = {
      email: 'updated.user@example.com',
      username: 'updated_user_name',
      password: 'Updated@456',
      name: { firstname: 'User', lastname: 'Updated' },
      address: {
        city: 'Updated City',
        street: 'Updated Street',
        number: 456,
        zipcode: '67890',
        geolocation: { lat: '30.1234', long: '40.5678' },
      },
      phone: '1-555-333-4444',
    };

    const response = await request.put(buildUrl(Routes.UPDATE_USER, { id: userId }), {
      headers: apiHeaders,
      data: updatedPayload,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining(updatedPayload));
  });

  test('user crud delete @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_USER), {
      headers: apiHeaders,
      data: {
        email: 'user.delete@example.com',
        username: 'user_delete_test',
        password: 'Delete@123',
        name: { firstname: 'Delete', lastname: 'User' },
        address: {
          city: 'Delete City',
          street: 'Delete Street',
          number: 321,
          zipcode: '45678',
          geolocation: { lat: '5.0000', long: '6.0000' },
        },
        phone: '1-555-444-5555',
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = Number(createdUser.id);

    const response = await request.delete(buildUrl(Routes.DELETE_USER, { id: userId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await readResponseBody(response);
    expect(payload === null || typeof payload === 'string' || (typeof payload === 'object' && payload !== null && 'id' in payload ? Number((payload as Record<string, unknown>).id) === userId : false)).toBeTruthy();
  });

  test('get all carts @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_ALL_CARTS), { headers: apiHeaders });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);

    payload.forEach((cart: Record<string, unknown>) => {
      expectCartPayload(cart);
    });
  });

  test('get cart by id @master', async ({ request }) => {
    const cartId = 1;
    const response = await request.get(buildUrl(Routes.GET_CART_BY_ID, { id: cartId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toHaveProperty('id', cartId);
    expectCartPayload(payload as Record<string, unknown>);
  });

  test('get carts by date range @master', async ({ request }) => {
    const startDate = '2020-01-01';
    const endDate = '2020-03-01';
    const response = await request.get(
      buildUrl(Routes.GET_CARTS_BY_DATE_RANGE, {
        startdate: startDate,
        enddate: endDate,
      }),
      { headers: apiHeaders }
    );

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    payload.forEach((cart: Record<string, unknown>) => {
      expect(cart.date).toBeTruthy();
      expect(new Date(cart.date as string).getTime()).toBeGreaterThanOrEqual(new Date(startDate).getTime());
      expect(new Date(cart.date as string).getTime()).toBeLessThanOrEqual(new Date(endDate).getTime());
    });
  });

  test('get user cart @master', async ({ request }) => {
    const userId = 1;
    const response = await request.get(buildUrl(Routes.GET_USER_CART, { userId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload.length).toBeGreaterThan(0);
    payload.forEach((cart: Record<string, unknown>) => {
      expect(cart.userId).toBe(userId);
    });
  });

  test('get carts with limit @master', async ({ request }) => {
    const limit = 3;
    const response = await request.get(buildUrl(Routes.GET_CARTS_WITH_LIMIT, { limit }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    expect(payload).toHaveLength(limit);
  });

  test('sort carts ascending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_CARTS_SORTED, { order: 'asc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((cart: Record<string, unknown>) => Number(cart.id));
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
  });

  test('sort carts descending @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_CARTS_SORTED, { order: 'desc' }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload)).toBeTruthy();
    const ids = payload.map((cart: Record<string, unknown>) => Number(cart.id));
    expect(ids).toEqual([...ids].sort((a, b) => b - a));
  });

  test('cart crud create @master', async ({ request }) => {
    const cartPayload = {
      userId: 1,
      date: '2020-03-02T00:00:00.000Z',
      products: [{ productId: 1, quantity: 3 }],
    };

    const response = await request.post(buildUrl(Routes.CREATE_CART), {
      headers: apiHeaders,
      data: cartPayload,
    });

    expect(response.status()).toBe(201);

    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining(cartPayload));
    expect(payload).toHaveProperty('id');
  });

  test('cart crud update @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_CART), {
      headers: apiHeaders,
      data: {
        userId: 5,
        date: '2020-03-03T00:00:00.000Z',
        products: [{ productId: 3, quantity: 2 }],
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdCart = await createResponse.json();
    const cartId = Number(createdCart.id);

    const updatedCartPayload = {
      userId: 5,
      date: '2020-03-03T00:00:00.000Z',
      products: [{ productId: 3, quantity: 7 }],
    };

    const response = await request.put(buildUrl(Routes.UPDATE_CART, { id: cartId }), {
      headers: apiHeaders,
      data: updatedCartPayload,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining(updatedCartPayload));
  });

  test('cart crud delete @master', async ({ request }) => {
    const createResponse = await request.post(buildUrl(Routes.CREATE_CART), {
      headers: apiHeaders,
      data: {
        userId: 7,
        date: '2020-03-04T00:00:00.000Z',
        products: [{ productId: 8, quantity: 1 }],
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdCart = await createResponse.json();
    const cartId = Number(createdCart.id);

    const response = await request.delete(buildUrl(Routes.DELETE_CART, { id: cartId }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await readResponseBody(response);
    expect(payload === null || typeof payload === 'string' || (typeof payload === 'object' && payload !== null && 'id' in payload ? Number((payload as Record<string, unknown>).id) === cartId : false)).toBeTruthy();
  });

  test('product response schema @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_PRODUCT_BY_ID, { id: 1 }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    validateJsonSchema(payload, productSchema, 'Product');
  });

  test('user response schema @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_USER_BY_ID, { id: 1 }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    validateJsonSchema(payload, userSchema, 'User');
  });

  test('cart response schema @master', async ({ request }) => {
    const response = await request.get(buildUrl(Routes.GET_CART_BY_ID, { id: 1 }), {
      headers: apiHeaders,
    });

    expect(response.status()).toBe(200);

    const payload = await response.json();
    validateJsonSchema(payload, cartSchema, 'Cart');
  });

  test('product crud workflow @master', async ({ request }) => {
    const createPayload = {
      title: 'Workflow Product',
      price: 24.5,
      description: 'Created during CRUD workflow',
      image: 'https://example.com/workflow-product.png',
      category: 'electronics',
    };

    const createResponse = await request.post(buildUrl(Routes.CREATE_PRODUCT), {
      headers: apiHeaders,
      data: createPayload,
    });

    expect(createResponse.status()).toBe(201);
    const createdProduct = await createResponse.json();
    const productId = Number(createdProduct.id);

    const updatePayload = {
      ...createPayload,
      title: 'Updated Workflow Product',
      price: 39.99,
      category: 'jewelery',
    };
    const updateResponse = await request.put(buildUrl(Routes.UPDATE_PRODUCT, { id: productId }), {
      headers: apiHeaders,
      data: updatePayload,
    });

    expect(updateResponse.status()).toBe(200);
    const updatedProduct = await updateResponse.json();
    expect(updatedProduct).toEqual(expect.objectContaining({ ...updatePayload, id: productId }));

    const deleteResponse = await request.delete(buildUrl(Routes.DELETE_PRODUCT, { id: productId }), {
      headers: apiHeaders,
    });

    expect(deleteResponse.status()).toBe(200);
    const deletedProduct = await readResponseBody(deleteResponse);
    expect(deletedProduct === null || typeof deletedProduct === 'string' || (typeof deletedProduct === 'object' && deletedProduct !== null && 'id' in deletedProduct ? Number((deletedProduct as Record<string, unknown>).id) === productId : false)).toBeTruthy();
  });

  test('user crud workflow @master', async ({ request }) => {
    const createPayload = {
      email: 'workflow.user@example.com',
      username: 'workflow_user',
      password: 'Workflow@123',
      name: { firstname: 'Workflow', lastname: 'User' },
      address: {
        city: 'Workflow City',
        street: 'Workflow Street',
        number: 99,
        zipcode: '99888',
        geolocation: { lat: '88.1234', long: '77.4321' },
      },
      phone: '1-555-999-8888',
    };

    const createResponse = await request.post(buildUrl(Routes.CREATE_USER), {
      headers: apiHeaders,
      data: createPayload,
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    const userId = Number(createdUser.id);

    const updatePayload = {
      ...createPayload,
      email: 'updated.workflow.user@example.com',
      username: 'updated_workflow_user',
      password: 'UpdatedWorkflow@123',
      name: { firstname: 'Updated', lastname: 'Workflow' },
      phone: '1-666-777-8888',
    };
    const updateResponse = await request.put(buildUrl(Routes.UPDATE_USER, { id: userId }), {
      headers: apiHeaders,
      data: updatePayload,
    });

    expect(updateResponse.status()).toBe(200);
    const updatedUser = await updateResponse.json();
    expect(updatedUser).toEqual(expect.objectContaining(updatePayload));

    const deleteResponse = await request.delete(buildUrl(Routes.DELETE_USER, { id: userId }), {
      headers: apiHeaders,
    });

    expect(deleteResponse.status()).toBe(200);
    const deletedUser = await readResponseBody(deleteResponse);
    expect(deletedUser === null || typeof deletedUser === 'string' || (typeof deletedUser === 'object' && deletedUser !== null && 'id' in deletedUser ? Number((deletedUser as Record<string, unknown>).id) === userId : false)).toBeTruthy();
  });

  test('cart crud workflow @master', async ({ request }) => {
    const createPayload = {
      userId: 11,
      date: '2020-04-01T00:00:00.000Z',
      products: [{ productId: 2, quantity: 4 }],
    };

    const createResponse = await request.post(buildUrl(Routes.CREATE_CART), {
      headers: apiHeaders,
      data: createPayload,
    });

    expect(createResponse.status()).toBe(201);
    const createdCart = await createResponse.json();
    const cartId = Number(createdCart.id);
    expect(createdCart).toEqual(expect.objectContaining(createPayload));

    const updatePayload = {
      userId: 11,
      date: '2020-04-01T00:00:00.000Z',
      products: [{ productId: 2, quantity: 9 }],
    };
    const updateResponse = await request.put(buildUrl(Routes.UPDATE_CART, { id: cartId }), {
      headers: apiHeaders,
      data: updatePayload,
    });

    expect(updateResponse.status()).toBe(200);
    const updatedCart = await updateResponse.json();
    expect(updatedCart).toEqual(expect.objectContaining(updatePayload));

    const deleteResponse = await request.delete(buildUrl(Routes.DELETE_CART, { id: cartId }), {
      headers: apiHeaders,
    });

    expect(deleteResponse.status()).toBe(200);
    const deletedCart = await readResponseBody(deleteResponse);
    expect(deletedCart === null || typeof deletedCart === 'string' || (typeof deletedCart === 'object' && deletedCart !== null && 'id' in deletedCart ? Number((deletedCart as Record<string, unknown>).id) === cartId : false)).toBeTruthy();
  });
});
