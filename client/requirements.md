## Packages
@reduxjs/toolkit | Required for cart and wishlist state management as requested
react-redux | React bindings for Redux
framer-motion | Page transitions, hero animations, and smooth layout changes

## Notes
Using Redux Toolkit for complex client-side state (cart, wishlist) and TanStack Query for remote server state (products).
The app assumes endpoints /api/products, /api/products/:id, and /api/vendors/:name/products are available on the backend.
