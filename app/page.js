'use client';
import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // Correct way to access router

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard'); // Use router directly
    }
  }, [isAuthenticated, router]); // Ensure this runs after authentication

  return (
    <div className="container mx-auto p-4">
      {!isAuthenticated ? (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <p>Redirecting to dashboard...</p> // Temporary message while redirecting
      )}
    </div>
  );
};

export default Page;
