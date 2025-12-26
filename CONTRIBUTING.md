# Contributing to Next Zen STEM Academy

Thank you for your interest in contributing to Next Zen STEM Academy! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/next-zen-stem-academy.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Setup

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

## Project Structure

```
next-zen-stem-academy/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (pages)/           # Application pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── db/               # Database utilities
│   └── stripe/           # Payment utilities
├── models/               # Database models
├── types/                # TypeScript types
└── middleware/           # Custom middleware
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types for function parameters and return values
- Avoid `any` type when possible

### React Components
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and single-purpose

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`)

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Run `npm run lint` before committing

## Testing

Currently, the project focuses on manual testing. When adding features:

1. Test all user flows manually
2. Test responsive design on multiple screen sizes
3. Test edge cases and error scenarios
4. Verify API endpoints with tools like Postman

Future contributions for automated testing are welcome!

## API Development

When adding new API routes:

1. Place routes in appropriate directories under `app/api/`
2. Use proper HTTP methods (GET, POST, PATCH, DELETE)
3. Include error handling
4. Validate input data
5. Return consistent JSON responses
6. Add authentication where needed using `withAuth` middleware

Example API route:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';

async function handler(req: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
```

## Database Models

When adding new models:

1. Create model file in `models/` directory
2. Export CRUD functions
3. Use proper TypeScript types
4. Handle ObjectId conversions
5. Add appropriate indexes

## Component Development

Guidelines for creating components:

1. **Props**: Define clear TypeScript interfaces
2. **State**: Use useState for local state
3. **Side Effects**: Use useEffect appropriately
4. **Styling**: Use Tailwind CSS classes
5. **Accessibility**: Include proper ARIA labels

Example component:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      {label}
    </button>
  );
}
```

## Commit Messages

Use clear, descriptive commit messages:

- Start with a verb in present tense
- Keep the first line under 72 characters
- Add detailed description if needed

Examples:
- ✅ "Add user profile editing feature"
- ✅ "Fix course filtering by category"
- ✅ "Update README with deployment instructions"
- ❌ "fixes"
- ❌ "WIP"

## Pull Request Process

1. **Update Documentation**: If your changes affect user-facing features
2. **Test Thoroughly**: Ensure everything works as expected
3. **Keep PRs Focused**: One feature/fix per PR
4. **Describe Changes**: Provide clear description of what and why
5. **Link Issues**: Reference related issues if applicable

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Updated documentation
- [ ] Tested on multiple screen sizes (for UI changes)
- [ ] No console errors
```

## Feature Requests

Before starting work on a new feature:

1. Check if a similar feature is already planned
2. Create an issue describing the feature
3. Wait for discussion and approval
4. Then start development

## Bug Reports

When reporting bugs:

1. Describe the expected behavior
2. Describe the actual behavior
3. List steps to reproduce
4. Include screenshots if applicable
5. Mention your environment (browser, OS, etc.)

## Areas Open for Contribution

Here are some areas where contributions are especially welcome:

### High Priority
- [ ] Automated testing (Jest, React Testing Library)
- [ ] Email notifications (enrollment confirmations, etc.)
- [ ] Course progress tracking
- [ ] Admin dashboard for course management
- [ ] User reviews and ratings

### Medium Priority
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Advanced search and filters
- [ ] Course recommendations
- [ ] Social media integration

### Nice to Have
- [ ] Mobile app (React Native)
- [ ] Live chat support
- [ ] Video lessons integration
- [ ] Gamification features
- [ ] Parent-teacher messaging

## Questions?

If you have questions about contributing:
- Open an issue for discussion
- Check existing documentation
- Review similar features in the codebase

Thank you for contributing to Next Zen STEM Academy! 🎓✨
