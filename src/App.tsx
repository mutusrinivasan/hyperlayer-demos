import { Route, Routes } from 'react-router-dom';
import FeedHome from '@/pages/FeedHome';
import ProductDetail from '@/pages/ProductDetail';
import ProductsHome from '@/pages/ProductsHome';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedHome />} />
      <Route path="/products" element={<ProductsHome />} />
      <Route path="/products/:productSlug" element={<ProductDetail />} />
    </Routes>
  );
}
