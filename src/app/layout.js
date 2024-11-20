// app/layout.js
"use client"; // Ensure this is a client component
import { Provider } from 'react-redux';
import store from '../redux/store'; // Adjust the path as needed
import './globals.css'; // Import your global styles
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
