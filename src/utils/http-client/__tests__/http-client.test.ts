import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { configureHttpClient, httpClient } from '../http-client';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);
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
};

describe('httpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    configureHttpClient({ baseURL: 'https://api.example.com' });
  });

  describe('HTTP methods', () => {
    it('should handle POST requests', async () => {
      const mockResponse = {
        data: { id: 1 },
        status: 200,
        headers: {},
        statusText: 'OK',
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const response = await httpClient.post('/test', { name: 'test' });
      expect(response.data).toEqual({ id: 1 });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', { name: 'test' }, expect.any(Object));
    });

    it('should handle PUT requests', async () => {
      const mockResponse = {
        data: { updated: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const response = await httpClient.put('/test', { name: 'updated' });
      expect(response.data).toEqual({ updated: true });
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', { name: 'updated' }, expect.any(Object));
    });

    it('should handle PATCH requests', async () => {
      const mockResponse = {
        data: { patched: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      };
      mockAxiosInstance.patch.mockResolvedValue(mockResponse);

      const response = await httpClient.patch('/test', { name: 'patched' });
      expect(response.data).toEqual({ patched: true });
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', { name: 'patched' }, expect.any(Object));
    });

    it('should handle DELETE requests', async () => {
      const mockResponse = {
        data: { deleted: true },
        status: 200,
        headers: {},
        statusText: 'OK',
      };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const response = await httpClient.delete('/test');
      expect(response.data).toEqual({ deleted: true });
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test', expect.any(Object));
    });

    it('should handle HEAD requests', async () => {
      const mockResponse = {
        headers: { 'content-type': 'application/json' },
        status: 200,
        statusText: 'OK',
      };
      mockAxiosInstance.head.mockResolvedValue(mockResponse);

      const response = await httpClient.head('/test');
      expect(response.headers['content-type']).toBe('application/json');
      expect(mockAxiosInstance.head).toHaveBeenCalledWith('/test', expect.any(Object));
    });
  });
});
