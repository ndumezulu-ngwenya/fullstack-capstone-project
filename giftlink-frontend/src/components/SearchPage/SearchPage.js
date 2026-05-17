import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure these imports match your actual project structure configuration
import urlConfig from '../config'; 

// Mock data arrays for dropdowns (adjust if these are passed as props or imported)
const categories = ['Toys', 'Books', 'Clothing', 'Electronics', 'Games'];
const conditions = ['New', 'Like New', 'Good', 'Fair'];

const SearchPage = () => {
    // Step 1: Initialize state variables
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6); // Initialize with minimum/default value
    const [searchResults, setSearchResults] = useState([]);
    
    const navigate = useNavigate();

    // Step 2: Fetch search results based on user inputs
    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: document.getElementById('categorySelect').value,
            condition: document.getElementById('conditionSelect').value,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    // Step 5: Navigate to the details page
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-4">
            <h2>Search for Gifts</h2>
            
            <div className="search-filters bg-light p-4 rounded shadow-sm">
                <div className="row">
                    {/* Text input field for search criteria */}
                    <div className="col-md-12 className=form-group mb-3">
                        <label htmlFor="searchQuery">Search Query</label>
                        <input
                            type="text"
                            id="searchQuery"
                            className="form-control"
                            placeholder="Enter keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Dynamic Category Dropdown */}
                    <div className="col-md-6 form-group mb-3">
                        <label htmlFor="categorySelect">Category</label>
                        <select id="categorySelect" className="form-control">
                            <option value="">All</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dynamic Condition Dropdown */}
                    <div className="col-md-6 form-group mb-3">
                        <label htmlFor="conditionSelect">Condition</label>
                        <select id="conditionSelect" className="form-control">
                            <option value="">All</option>
                            {conditions.map(condition => (
                                <option key={condition} value={condition}>{condition}</option>
                            ))}
                        </select>
                    </div>

                    {/* Age Range Slider */}
                    <div className="col-md-12 form-group mb-4">
                        <label htmlFor="ageRange">Less than <strong>{ageRange}</strong> years</label>
                        <input
                            type="range"
                            className="form-control-range w-100"
                            id="ageRange"
                            min="1"
                            max="10"
                            value={ageRange}
                            onChange={e => setAgeRange(e.target.value)}
                        />
                    </div>

                    {/* Search Button to trigger operation */}
                    <div className="col-md-12">
                        <button onClick={handleSearch} className="btn btn-primary btn-block w-100">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Step 4: Display fetched search results */}
            <div className="search-results mt-4">
                {searchResults.length > 0 ? (
                    <div className="row">
                        {searchResults.map(product => (
                            <div key={product.id} className="col-md-4 mb-3">
                                <div className="card h-100">
                                    {/* Product image handling */}
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description ? `${product.description.slice(0, 100)}...` : 'No description available.'}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent border-top-0">
                                        <button onClick={() => goToDetailsPage(product.id)} className="btn btn-outline-primary w-100">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info text-center" role="alert">
                        No products found. Please revise your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;