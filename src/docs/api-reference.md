---
title: API Reference
order: 4
category: Developers
---

# API Reference

Complete API documentation for developers looking to integrate with the JLDB platform programmatically.

## Base URL

All API requests should be made to:

```
https://api.jldb.com/v1
```

## Authentication

API requests require authentication using an API key in the request header:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.jldb.com/v1/providers
```

> **Getting an API Key**: Contact our support team at `api@jldb.com` to obtain an API key for your application.

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Free Tier**: 100 requests per hour
- **Basic Plan**: 1,000 requests per hour  
- **Premium Plan**: 10,000 requests per hour
- **Enterprise**: Custom limits available

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Endpoints

### Get All Providers

Retrieve a list of all service providers with optional filtering.

```http
GET /providers
```

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `city` | string | Filter by city | `dubai`, `abu-dhabi` |
| `service` | string | Filter by service type | `cleaning`, `plumbing` |
| `status` | string | Filter by status | `active`, `inactive` |
| `limit` | integer | Number of results (max 100) | `20` |
| `offset` | integer | Pagination offset | `0` |

**Example Request:**

```bash
curl "https://api.jldb.com/v1/providers?city=dubai&service=cleaning&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "provider-123",
      "company_name": "ABC Cleaning Services",
      "cities": ["dubai", "sharjah"],
      "services": ["cleaning", "deep-cleaning"],
      "status": "active",
      "whatsapp": "https://wa.me/971501234567",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

### Get Provider by ID

Retrieve detailed information about a specific provider.

```http
GET /providers/{id}
```

**Example Request:**

```bash
curl "https://api.jldb.com/v1/providers/provider-123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**

```json
{
  "data": {
    "id": "provider-123",
    "company_name": "ABC Cleaning Services",
    "description": "Professional cleaning services across Dubai and Sharjah",
    "cities": ["dubai", "sharjah"],
    "services": ["cleaning", "deep-cleaning", "office-cleaning"],
    "status": "active",
    "contact": {
      "whatsapp": "https://wa.me/971501234567",
      "phone": "+971 50 123 4567",
      "email": "info@abccleaning.ae"
    },
    "coverage_areas": {
      "dubai": true,
      "abu_dhabi": false,
      "sharjah": true,
      "ajman": false,
      "al_ain": false
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z"
  }
}
```

### Get Cities

List all available cities with provider counts.

```http
GET /cities
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "dubai",
      "name": "Dubai",
      "provider_count": 85,
      "active_providers": 78
    },
    {
      "id": "abu-dhabi", 
      "name": "Abu Dhabi",
      "provider_count": 45,
      "active_providers": 42
    }
  ]
}
```

### Get Services

List all service categories with provider counts.

```http
GET /services
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "cleaning",
      "name": "Cleaning Services",
      "provider_count": 35,
      "subcategories": [
        "residential-cleaning",
        "commercial-cleaning", 
        "deep-cleaning"
      ]
    },
    {
      "id": "plumbing",
      "name": "Plumbing",
      "provider_count": 28,
      "subcategories": [
        "installation",
        "repair",
        "emergency"
      ]
    }
  ]
}
```

## Error Handling

The API uses conventional HTTP response codes:

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid API key |
| `403` | Forbidden - API key lacks permissions |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |

**Error Response Format:**

```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'city' parameter must be a valid city identifier",
    "details": {
      "parameter": "city",
      "provided": "invalid-city",
      "valid_options": ["dubai", "abu-dhabi", "sharjah", "ajman", "al-ain"]
    }
  }
}
```

## SDKs and Libraries

Official SDKs are available for popular programming languages:

### JavaScript/Node.js

```bash
npm install @jldb/api-client
```

```javascript
import { JLDBClient } from '@jldb/api-client';

const client = new JLDBClient('YOUR_API_KEY');

// Get providers
const providers = await client.providers.list({
  city: 'dubai',
  service: 'cleaning'
});

// Get specific provider
const provider = await client.providers.get('provider-123');
```

### Python

```bash
pip install jldb-api
```

```python
from jldb_api import JLDBClient

client = JLDBClient(api_key='YOUR_API_KEY')

# Get providers
providers = client.providers.list(city='dubai', service='cleaning')

# Get specific provider  
provider = client.providers.get('provider-123')
```

## Webhooks

Subscribe to real-time updates about provider changes:

### Available Events

- `provider.created` - New provider added
- `provider.updated` - Provider information changed
- `provider.status_changed` - Provider status updated

### Webhook Configuration

Contact our support team to configure webhooks for your application.

---

*Need help with the API? Contact our developer support at `api@jldb.com`*