
# File Service

A production-ready **File Management Service** built with **Node.js**, **TypeScript**, and **Express**.

This service is designed to work alongside other backend applications by providing secure file storage through **signed URLs**. Instead of exposing upload, download, and delete endpoints directly, the service generates short-lived signed URLs that authorize a single file operation.

The service is intended to be deployed independently from the main application, allowing file management to scale separately from business logic.

# Features

## Signed URLs

The service generates secure signed URLs for:

- File uploads
- File downloads
- File deletion

Each signed URL authorizes a single operation on a specific file.

## File Upload

Supports secure file uploads through signed URLs.

Features include:

- Single file upload
- Upload authorization using signed tokens
- Duplicate file protection
- Directory validation

## File Download

Files can only be downloaded using a valid signed URL.

Features include:

- Secure downloads
- File existence validation
- Token verification

## File Deletion

Files can be securely deleted using a signed URL.

Features include:

- Token verification
- File existence validation
- Safe file removal

## File Existence Check

The service provides an endpoint for checking whether a file already exists.

This is useful for preventing duplicate uploads before generating upload URLs.

# Security

The service protects file operations using signed tokens.

Each token:

- Is generated for a specific file
- Is tied to a single operation
- Cannot be reused for different files
- Prevents unauthorized access to stored files

All file operations require a valid signed token.

# Architecture

The application follows a layered architecture.

```text
Client
   │
   ▼
Express API
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Storage
```

Each layer has a single responsibility.

### Controllers

Receive HTTP requests and return responses.

### Services

Contain business logic, token validation, and file operation rules.

### Storage

Handles file uploads using Multer and serves stored files.

# Validation

The project uses **Zod** for request validation.

Validation is applied to:

- Signed URL generation
- File operations
- Token validation

Invalid requests are rejected before reaching business logic.

# Error Handling

Centralized error handling provides consistent API responses.

The service handles:

- Validation errors
- Invalid tokens
- Missing files
- Duplicate files
- Storage errors
- Internal server errors

# Middleware

The service uses middleware for:

- Authentication
- File authorization
- Error handling

# Technology Stack

## Backend

- Node.js
- TypeScript
- Express 5

## File Storage

- Multer
- Local File System

## Cache

- Redis

## Validation

- Zod



# Project Structure

```text
src/
├── cache/
├── config/
├── controller/
├── error/
├── middleware/
├── route/
├── service/
├── storage/
├── types/
├── validator/
├── app.ts
├── bootstrap.ts
└── index.ts

storage/
└── uploads/
    ├── assignments/
    ├── courses/
    └── submissions/
```

# API Endpoints

## Signed URLs

- Generate upload URL
- Generate download URL
- Generate delete URL

## File Operations

- Upload file
- Download file
- Delete file
- Check file existence

# Workflow

The typical upload flow is:

1. Client requests a signed upload URL.
2. The service validates the requested file path.
3. A signed token is generated and stored.
4. The client uploads the file using the signed URL.
5. The token is verified before the upload is accepted.

The same process is used for downloads and deletions.

# Learning Objectives

This project was built to gain practical experience with:

- Designing standalone microservices
- Secure file management
- Signed URL workflows
- Token-based authorization
- Express middleware
- Redis integration
- Request validation
- Error handling
- Layered architecture
- TypeScript backend development
