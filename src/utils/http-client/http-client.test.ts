import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { configureHttpClient, httpClient } from './http-client'

// Create mock functions for HTTP methods
const mockGet = vi.fn()
const mockPost = vi.fn()
const mockPut = vi.fn()
const mockPatch = vi.fn()
const mockDelete = vi.fn()
const mockHead = vi.fn()
const mockRequestUse = vi.fn()
const mockResponseUse = vi.fn()

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
}))

// vi.mock('axios');
const mockedAxios = vi.mocked(axios, true)
const mockAxiosInstance = {
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  head: vi.fn(),
}

describe('httpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset all mocks
    [mockGet, mockPost, mockPut, mockPatch, mockDelete, mockHead, mockRequestUse, mockResponseUse].forEach((mock) => {
      mock.mockReset()
    })
    configureHttpClient({ baseURL: 'https://api.example.com' })
  })

  it('should make a GET request', async () => {
    const mockResponse = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    mockGet.mockResolvedValue(mockResponse)

    const response = await httpClient.get('/posts/1')

    expect(response.data).toHaveProperty('id', 1)
    expect(response.status).toBe(200)
  })

  it('should make a POST request', async () => {
    const mockResponse = {
      data: { id: 101 },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {},
    }
    mockPost.mockResolvedValue(mockResponse)

    const response = await httpClient.post('/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    })

    expect(response.data).toHaveProperty('id')
    expect(response.status).toBe(201)
  })

  it('should make a PUT request', async () => {
    const mockResponse = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    mockPut.mockResolvedValue(mockResponse)

    const response = await httpClient.put('/posts/1', {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    })

    expect(response.data).toHaveProperty('id', 1)
    expect(response.status).toBe(200)
  })

  it('should make a PATCH request', async () => {
    const mockResponse = {
      data: { title: 'foo' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    mockPatch.mockResolvedValue(mockResponse)

    const response = await httpClient.patch('/posts/1', { title: 'foo' })

    expect(response.data).toHaveProperty('title', 'foo')
    expect(response.status).toBe(200)
  })

  it('should make a DELETE request', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    mockDelete.mockResolvedValue(mockResponse)

    const response = await httpClient.delete('/posts/1')

    expect(response.status).toBe(200)
  })

  it('should make a HEAD request', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
    mockHead.mockResolvedValue(mockResponse)

    const response = await httpClient.head('/posts/1')

    expect(response.status).toBe(200)
  })
})

describe('httpClient test', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // @ts-expect-error mockReturnValue is not defined in the type definition
    mockedAxios.create.mockReturnValue(mockAxiosInstance)
    configureHttpClient({ baseURL: 'https://api.example.com' })
  })

  describe('hTTP methods', () => {
    it('should handle POST requests', async () => {
      const mockResponse = {
        data: { id: 1 },
        status: 200,
        headers: {},
        statusText: 'OK',
      }
      mockAxiosInstance.post.mockResolvedValue(mockResponse)

      const response = await httpClient.post('/test', { name: 'test' })
      expect(response.data).toEqual({ id: 1 })
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', { name: 'test' }, expect.any(Object))
    })

    it('should handle PUT requests', async () => {
      const mockResponse = {
        data: { updated: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      }
      mockAxiosInstance.put.mockResolvedValue(mockResponse)

      const response = await httpClient.put('/test', { name: 'updated' })
      expect(response.data).toEqual({ updated: true })
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', { name: 'updated' }, expect.any(Object))
    })

    it('should handle PATCH requests', async () => {
      const mockResponse = {
        data: { patched: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      }
      mockAxiosInstance.patch.mockResolvedValue(mockResponse)

      const response = await httpClient.patch('/test', { name: 'patched' })
      expect(response.data).toEqual({ patched: true })
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', { name: 'patched' }, expect.any(Object))
    })

    it('should handle DELETE requests', async () => {
      const mockResponse = {
        data: { deleted: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      }
      mockAxiosInstance.delete.mockResolvedValue(mockResponse)

      const response = await httpClient.delete('/test')
      expect(response.data).toEqual({ deleted: true })
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test', expect.any(Object))
    })

    it('should handle HEAD requests', async () => {
      const mockResponse = {
        headers: { 'content-type': 'application/json' },
        status: 200,
        statusText: 'OK',
      }
      mockAxiosInstance.head.mockResolvedValue(mockResponse)

      const response = await httpClient.head('/test')
      expect(response.headers['content-type']).toBe('application/json')
      expect(mockAxiosInstance.head).toHaveBeenCalledWith('/test', expect.any(Object))
    })
  })
})
