import { beforeEach, describe, expect, it, vi } from 'vitest';

import { configureHttpClient, httpClient } from './http-client';

// Create mock functions for HTTP methods
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockPatch = vi.fn();
const mockDelete = vi.fn();
const mockHead = vi.fn();
const mockRequestUse = vi.fn();
const mockResponseUse = vi.fn();

// Mock axios with a proper structure
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: mockGet,
      post: mockPost,
      put: mockPut,
      patch: mockPatch,
      delete: mockDelete,
      head: mockHead,
      interceptors: {
        request: { use: mockRequestUse },
        response: { use: mockResponseUse },
      },
    })),
  },
}));

describe('httpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset all mocks
    [mockGet, mockPost, mockPut, mockPatch, mockDelete, mockHead, mockRequestUse, mockResponseUse].forEach((mock) => {
      mock.mockReset();
    });
    configureHttpClient({ baseURL: 'https://api.example.com' });
  });

  it('should make a GET request', async () => {
    const mockResponse = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockGet.mockResolvedValue(mockResponse);

    const response = await httpClient.get('/posts/1');

    expect(response.data).toHaveProperty('id', 1);
    expect(response.status).toBe(200);
  });

  it('should make a POST request', async () => {
    const mockResponse = {
      data: { id: 101 },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {},
    };
    mockPost.mockResolvedValue(mockResponse);

    const response = await httpClient.post('/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });

    expect(response.data).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should make a PUT request', async () => {
    const mockResponse = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockPut.mockResolvedValue(mockResponse);

    const response = await httpClient.put('/posts/1', {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    });

    expect(response.data).toHaveProperty('id', 1);
    expect(response.status).toBe(200);
  });

  it('should make a PATCH request', async () => {
    const mockResponse = {
      data: { title: 'foo' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockPatch.mockResolvedValue(mockResponse);

    const response = await httpClient.patch('/posts/1', { title: 'foo' });

    expect(response.data).toHaveProperty('title', 'foo');
    expect(response.status).toBe(200);
  });

  it('should make a DELETE request', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockDelete.mockResolvedValue(mockResponse);

    const response = await httpClient.delete('/posts/1');

    expect(response.status).toBe(200);
  });

  it('should make a HEAD request', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockHead.mockResolvedValue(mockResponse);

    const response = await httpClient.head('/posts/1');

    expect(response.status).toBe(200);
  });
});
