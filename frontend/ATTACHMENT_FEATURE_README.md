# Chat Attachment Upload Feature Implementation

## Overview

This document outlines the implementation plan for adding file upload capabilities to the chat application using React Uploady. The feature will support file attachments with preview functionality, upload progress tracking, and proper error handling.

## Reference UI Examples

See the following mockups in `public/images/` for visual guidance:
- `Added to Message.png` - Shows how files appear attached to messages
- `Attachment Pop Over.png` - File selection and upload interface
- `Attachment Side Panel Preview.png` - Resizable preview panel
- `Conversation + Attachment.png` - Complete conversation view with attachments

## Current State Analysis

### ✅ Already Implemented
- **React Uploady Dependencies**: `@rpldy/uploady`, `@rpldy/upload-button`, `@rpldy/upload-drop-zone` already installed
- **Attachment Type Definitions**: `Attachment` interface exists in `src/types/chat.ts`
- **GraphQL Schema**: Attachment fields already included in queries/mutations
- **Basic Upload Button**: Upload icon present in chat input (currently non-functional)

### 🔧 Needs Implementation
- React Uploady integration and configuration
- File upload progress tracking
- Attachment preview components
- API endpoint for file uploads
- File validation and size limits
- Resizable preview panel
- Error handling and user feedback

## Implementation Plan

### Phase 1: Backend API Enhancement

#### 1.1 File Upload Endpoint
```typescript
// Add to your backend API
POST /api/upload
Content-Type: multipart/form-data

Response:
{
  "fileUrl": "string",
  "fileName": "string", 
  "fileType": "string",
  "fileSize": number,
  "uploadId": "string"
}
```

#### 1.2 GraphQL Schema Updates
```graphql
# Add to your GraphQL schema
input AttachmentInput {
  type: String!
  name: String!
  url: String!
  size: Int
  mimeType: String
  metadata: JSON
}

input MessageInput {
  conversationId: Int!
  type: String!
  content: String!
  attachments: [AttachmentInput!]
}

# Add upload mutation
type Mutation {
  uploadFile(file: Upload!): UploadResponse!
}

type UploadResponse {
  url: String!
  fileName: String!
  fileType: String!
  fileSize: Int!
  uploadId: String!
}
```

#### 1.3 File Storage Configuration
- **Local Development**: Store files in `backend/uploads/` directory
- **Production Ready**: Configure for cloud storage (AWS S3, Google Cloud Storage, etc.)
- **File Validation**: 
  - Max size: 10MB per file
  - Allowed types: `.txt`, `.pdf`, `.jpg`, `.jpeg`, `.png`, `.webp`, `.docx`, `.doc`

### Phase 2: Frontend Upload Components

#### 2.1 Upload Configuration Hook
Create `src/hooks/useUploadConfig.ts`:
```typescript
export const useUploadConfig = () => {
  return {
    destination: {
      url: "/api/upload",
      method: "POST"
    },
    restrictions: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: [
        "text/plain",
        "application/pdf", 
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
    },
    multiple: true,
    autoUpload: false
  };
};
```

#### 2.2 Attachment Upload Component
Create `src/components/AttachmentUpload.tsx`:
- File selection with drag & drop
- Upload progress indicators
- File validation feedback
- Remove/cancel functionality
- Preview thumbnails for images

#### 2.3 Attachment Preview Panel
Create `src/components/AttachmentPreview.tsx`:
- Resizable side panel using `react-resizable-panels`
- File type specific previews:
  - Images: thumbnail view
  - PDFs: first page preview
  - Text files: content preview
  - Documents: metadata display
- Download functionality

#### 2.4 Message Attachment Display
Create `src/components/MessageAttachment.tsx`:
- Compact attachment cards within messages
- File type icons
- Click to open preview panel
- Download links

### Phase 3: Chat Component Integration

#### 3.1 Enhanced Chat Input
Update `src/components/Chat.tsx`:
```typescript
// Add to Chat component
interface ChatProps {
  isDisabled?: boolean;
  isTyping?: boolean;
  messages: Message[];
  onSendMessage: (content: string, attachments?: File[]) => void;
}

// State for managing attachments
const [pendingAttachments, setPendingAttachments] = useState<File[]>([]);
const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
```

#### 3.2 Upload Integration
- Wrap input area with `<Uploady>`
- Replace upload icon with `<UploadButton>`
- Add drag & drop zone over entire chat input
- Show pending attachments before sending

#### 3.3 Message Sending with Attachments
```typescript
const handleSendWithAttachments = async (content: string, files: File[]) => {
  // 1. Upload files first
  const uploadedAttachments = await uploadFiles(files);
  
  // 2. Send message with attachment metadata
  await onSendMessage(content, uploadedAttachments);
  
  // 3. Clear pending attachments
  setPendingAttachments([]);
};
```

### Phase 4: Advanced Features

#### 4.1 Upload Progress Tracking
```typescript
// Track upload progress for each file
const [uploadProgress, setUploadProgress] = useState<Record<string, {
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}>>({});
```

#### 4.2 Error Handling
- File size validation messages
- Unsupported file type warnings
- Network error retry mechanisms
- Upload timeout handling

#### 4.3 Optimistic UI Updates
- Show attachments immediately in pending state
- Update to final state after successful upload
- Rollback on failure with error indicators

#### 4.4 Resizable Preview Panel
```typescript
// Using react-resizable-panels
<PanelGroup direction="horizontal">
  <Panel defaultSize={70} minSize={50}>
    {/* Chat Messages */}
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize={30} minSize={20} maxSize={50}>
    {/* Attachment Preview */}
  </Panel>
</PanelGroup>
```

## File Structure

```
src/
├── components/
│   ├── Chat.tsx (✅ exists - needs enhancement)
│   ├── AttachmentUpload.tsx (🆕 create)
│   ├── AttachmentPreview.tsx (🆕 create)
│   ├── MessageAttachment.tsx (🆕 create)
│   ├── FilePreview.tsx (🆕 create)
│   └── UploadProgress.tsx (🆕 create)
├── hooks/
│   ├── useChat.ts (✅ exists - needs enhancement)
│   ├── useUploadConfig.ts (🆕 create)
│   ├── useFileUpload.ts (🆕 create)
│   └── useAttachmentPreview.ts (🆕 create)
├── types/
│   ├── chat.ts (✅ exists - minor updates needed)
│   └── upload.ts (🆕 create)
└── utils/
    ├── fileValidation.ts (🆕 create)
    ├── filePreview.ts (🆕 create)
    └── uploadHelpers.ts (🆕 create)
```

## Implementation Steps

### Step 1: Backend File Upload API (Estimated: 4-6 hours)
1. Create file upload endpoint with multipart/form-data support
2. Add file validation (size, type, security)
3. Implement local file storage with proper naming
4. Add GraphQL mutation for file uploads
5. Update message creation to handle attachments

### Step 2: Basic Upload Integration (Estimated: 6-8 hours)
1. Create upload configuration hook
2. Build basic AttachmentUpload component
3. Integrate React Uploady with chat input
4. Add pending attachment state management
5. Update message sending to include uploads

### Step 3: Preview and Display (Estimated: 8-10 hours)
1. Create AttachmentPreview component with resizable panel
2. Build MessageAttachment display components
3. Add file type specific preview logic
4. Implement click-to-preview functionality
5. Add download capabilities

### Step 4: Progress and Error Handling (Estimated: 4-6 hours)
1. Add upload progress tracking
2. Implement comprehensive error handling
3. Add file validation feedback
4. Create retry mechanisms
5. Add optimistic UI updates

### Step 5: Polish and Testing (Estimated: 4-6 hours)
1. Add loading states and animations
2. Implement drag & drop visual feedback
3. Add keyboard shortcuts for attachments
4. Comprehensive testing across file types
5. Mobile responsiveness improvements

## Configuration Options

```typescript
// File upload limits and restrictions
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_MESSAGE: 5,
  ALLOWED_TYPES: {
    'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    'application/pdf': ['.pdf'],
    'text/plain': ['.txt'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  PREVIEW_PANEL: {
    DEFAULT_WIDTH: 300,
    MIN_WIDTH: 200,
    MAX_WIDTH: 500
  }
};
```

## Testing Strategy

### Unit Tests
- File validation functions
- Upload progress calculations
- Error handling scenarios
- Component rendering with different file types

### Integration Tests  
- Complete upload flow from selection to message sending
- Preview panel interactions
- Drag & drop functionality
- Error recovery scenarios

### E2E Tests
- Full user journey: select files → upload → send message → preview
- Multiple file types and sizes
- Network failure scenarios
- Mobile/touch interactions

## Performance Considerations

1. **Lazy Loading**: Only load preview content when requested
2. **Image Optimization**: Compress images before upload
3. **Chunked Uploads**: For large files, implement chunked upload
4. **Caching**: Cache uploaded files for repeated access
5. **Memory Management**: Properly cleanup file objects and URLs

## Security Considerations

1. **File Type Validation**: Server-side validation of actual file content
2. **Size Limits**: Enforce both client and server-side limits
3. **Scan for Malware**: Integrate virus scanning for uploaded files
4. **Access Control**: Ensure only authorized users can access files
5. **Input Sanitization**: Sanitize file names and metadata

## Future Enhancements

1. **Cloud Storage Integration**: AWS S3, Google Cloud Storage
2. **Image Editing**: Basic crop/resize functionality
3. **Collaborative Features**: Real-time upload progress sharing
4. **Advanced Preview**: Document markup and annotation
5. **Compression**: Automatic file compression for large uploads

---

## Getting Started

1. **Review Current Implementation**: Familiarize yourself with existing chat structure
2. **Backend First**: Implement file upload API endpoint
3. **Frontend Integration**: Start with basic upload functionality
4. **Iterative Enhancement**: Add preview and advanced features progressively
5. **Testing**: Test thoroughly with various file types and sizes

This implementation plan provides a solid foundation for building a robust file attachment system that enhances the chat experience while maintaining performance and security standards.
