# Portal Component

A reusable React Portal utility component that renders content at the document body level to avoid z-index and overflow issues.

## Overview

The Portal component uses React's `createPortal` to render its children outside of the normal DOM hierarchy, directly at the document body level (or any specified container). This is particularly useful for:

- Dropdowns that need to escape their parent's overflow constraints
- Modals that need to appear above all other content
- Tooltips that should not be clipped by container boundaries
- Any content that needs to break out of its parent's z-index stacking context

## Usage

### Basic Usage

```tsx
import Portal from '../common/components/Portal';

const MyComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      
      {showDropdown && (
        <Portal>
          <div className="absolute top-0 left-0 bg-white shadow-lg p-4">
            Dropdown content rendered at body level
          </div>
        </Portal>
      )}
    </div>
  );
};
```

### With Custom Container

```tsx
import Portal from '../common/components/Portal';

const MyComponent = () => {
  const customContainer = document.getElementById('custom-portal-root');
  
  return (
    <Portal container={customContainer}>
      <div>Content rendered in custom container</div>
    </Portal>
  );
};
```

### With Custom CSS Class

```tsx
import Portal from '../common/components/Portal';

const MyComponent = () => {
  return (
    <Portal className="z-50 fixed inset-0">
      <div>Content with custom portal container styling</div>
    </Portal>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to render in the portal |
| `container` | `Element \| null` | `null` | Optional container element. Defaults to `document.body` |
| `className` | `string` | `''` | Optional CSS class to apply to the portal container |

## Existing Portal Usage in Codebase

The codebase already has some portal implementations:

1. **Modal Component** (`/modules/modal/components/Modal.tsx`)
   - Uses a custom `ModalInner` component with `ReactDOM.createPortal`
   - Creates a div element and appends it to document.body
   - Includes animation and blur effects

2. **FilterableDropdown Component** (`/modules/common/components/FilterableDropdown.tsx`)
   - Uses `menuPortalTarget={document.body}` with React Select
   - Renders dropdown menu at document body level

3. **ProductAssignmentForm Component** (`/modules/product/components/ProductAssignmentForm.tsx`)
   - Uses `menuPortalTarget={document.body}` with React Select
   - Includes SSR safety check with `typeof window !== 'undefined'`

## Comparison with Existing Implementations

### vs Modal Component
- **Modal**: Specific to modal dialogs, includes animation, blur effects, and modal-specific behavior
- **Portal**: Generic utility, no built-in styling or behavior, maximum flexibility

### vs React Select's menuPortalTarget
- **React Select**: Limited to React Select dropdowns only
- **Portal**: Works with any React content, provides more control

## Best Practices

1. **SSR Safety**: The Portal component includes SSR safety checks to prevent hydration mismatches
2. **Cleanup**: Automatically cleans up portal elements when unmounted
3. **Conditional Rendering**: Only render portal content when needed to avoid unnecessary DOM manipulation
4. **Z-Index Management**: Consider using consistent z-index values across your application

## Common Use Cases

### Dropdown Menus
```tsx
{isOpen && (
  <Portal>
    <div className="absolute z-50 bg-white shadow-lg rounded-lg">
      {/* Dropdown content */}
    </div>
  </Portal>
)}
```

### Modal Dialogs
```tsx
{isModalOpen && (
  <Portal className="modal-portal">
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-lg p-6">
        {/* Modal content */}
      </div>
    </div>
  </Portal>
)}
```

### Tooltips
```tsx
{showTooltip && (
  <Portal>
    <div 
      className="absolute z-50 bg-gray-900 text-white p-2 rounded text-sm"
      style={{ top: position.y, left: position.x }}
    >
      {tooltipText}
    </div>
  </Portal>
)}
```

## Hook Alternative

For more complex use cases, you can use the `usePortal` hook:

```tsx
import usePortal from '../common/hooks/usePortal';

const MyComponent = () => {
  const { portalRef, mounted } = usePortal({ className: 'z-50' });
  
  return (
    <div>
      {mounted && createPortal(
        <div>Portal content</div>,
        portalRef.current!
      )}
    </div>
  );
};
```