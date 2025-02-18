import { useNavigate } from 'react-router-dom';

const CategoryFilter = ({ categories }) => {
    const navigate = useNavigate();

    const handleCategorySelect = (category) => {
        navigate(`/products?category=${category}`);
    };

    return (
        <div className="w-full md:w-64 space-y-6">
            <select onChange={(e) => handleCategorySelect(e.target.value)}
             className='w-full pl-10 pr-4 py-2 border rounded-lg'   
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}
                    
                    >
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
